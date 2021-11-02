import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.database();

type TGrid = (0 | string | number)[][]

interface IGame {
    id: string,
    player_started: string
    player_turn: string
    grid: TGrid
    status_message: string
    players: {
        [name: string]: 'X' | 'O'
    }
    status: 'in-progress' | 'end' | 'waiting'
}

exports.joinGame = functions.https.onCall(async (data: { id: string, player_name: string }) => {
    const { id, player_name } = data;

    const ref = 'games/tictactoe'

    const gameRef = db.ref(`${ref}/${id}`)

    const game: IGame = await gameRef.once('value').then(snapshot => snapshot.val());

    if (game) {
        if (game.players[player_name]) {
            // name taken
            throw new functions.https.HttpsError('failed-precondition', 'Name is already taken. Please use a different one')
        }
        if (Object.keys(game.players).length > 1) {
            // already 2 players in-game
            throw new functions.https.HttpsError('failed-precondition', 'Game is full')
        }

        await gameRef.child('players').update({
            [player_name]: "X"
        })

        await gameRef.update({
            status: "in-progress"
        })

        return {
            gameID: id,
            gameData: game
        }
    } else {
        throw new functions.https.HttpsError('not-found', 'Game with that ID not found')
    }
});

exports.createGame = functions.https.onCall(async (data: { player_name: string }) => {
    const { create2DArray, makeRandomID } = await import('./utils');

    const grid = create2DArray(3, 3);

    const newID = makeRandomID(5);

    const new_game: IGame = {
        id: newID,
        player_started: data.player_name,
        players: {
            [data.player_name]: "O"
        },
        player_turn: data.player_name,
        grid: grid,
        status_message: '',
        status: 'waiting',
    }

    const newGameRef = db.ref(`games/tictactoe/${newID}`)

    await newGameRef.set(new_game)

    return {
        gameID: newID,
        gameData: new_game,
    }
})

exports.restart = functions.https.onCall(async (data: { id: string }) => {
    const { create2DArray } = await import('./utils');

    const grid = create2DArray(3, 3)

    const gameRef = db.ref(`games/tictactoe/${data.id}`)

    const game: IGame = await gameRef.once('value').then(snapshot => snapshot.val())

    const updates = {
        grid: grid,
        player_turn: game.player_started,
        status_message: '',
        status: 'in-progress'
    }

    await gameRef.update(updates)

    return 'success'
})

exports.markGrid = functions.https.onCall(async (data: { gameID: string, player_name: string, x: number, y: number }) => {
    const { gameID, player_name, x, y } = data

    const gameRef = db.ref(`games/tictactoe/${gameID}`)
    const game: IGame = await gameRef.once('value').then((snapshot) => snapshot.val());

    game.grid[x][y] = player_name

    const updates: any = {
        grid: game.grid
    }

    const won = checkIfWon(game.grid, player_name)

    const player_keys = Object.keys(game.players)
    const isGridFilled = checkIfGridFilled(game.grid)

    if (won || isGridFilled) {
        // end game
        updates.status = 'end'
        updates.player_started = player_keys[0] === game.player_started ? player_keys[1] : player_keys[0]
    }

    if (won) {
        // announce win
        updates.status_message = `${player_name} won!`
    } else if (isGridFilled) {
        updates.status_message = `It's a tie.`
    } else {
        updates.player_turn = player_keys[0] === game.player_turn ? player_keys[1] : player_keys[0]
    }

    await gameRef.update(updates);

    return 'success'
})

function checkIfGridFilled(grid: TGrid) {
    let filled = true

    for (let i = 0; i < grid.length; i++) {
        for (let y = 0; y < grid[i].length; y++) {
            if (grid[i][y] === 0) {
                filled = false;
                break
            }
        }
    }

    return filled;
}

function checkIfWon(grid: TGrid, player_name: string) {
    let won = true
    const n = grid.length

    console.log(JSON.stringify(grid))

    // horizontal

    for (let i = 0; i < n; i++) {
        won = true
        for (let y = 0; y < n; y++) {
            if (grid[i][y] !== player_name) {
                won = false;
                break
            }
        }

        if (won) {
            return true
        }
    }

    console.log('passed1')

    // vertical

    for (let i = 0; i < n; i++) {
        won = true
        for (let y = 0; y < n; y++) {
            if (grid[y][i] !== player_name) {
                won = false;
                break
            }
        }

        if (won) {
            return true
        }
    }

    console.log('passed2')

    // diagonal
    won = true

    for (let i = 0; i < n; i++) {
        if (grid[i][i] !== player_name) {
            won = false;
            break
        }
    }

    if (won) {
        return true
    }

    won = true

    for (let i = 0; i < n; i++) {
        if (grid[i][n - 1 - i] !== player_name) {
            won = false;
            break
        }
    }

    if (won) {
        return true
    }

    return false
}