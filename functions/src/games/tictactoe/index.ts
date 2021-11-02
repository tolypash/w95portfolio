import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.database();

interface IGame {
    id: string,
    player_started: string
    player_turn: string
    grid: (0 | string | number)[][]
    status_message: string
    players: {
        [name: string]: 'X' | 'O'
    }
    status: 'in-progress' | 'end' | 'waiting'
}

exports.joinGame = functions.https.onCall(async (data: { id: string, name: string }) => {
    const { id } = data;

    const ref = 'games/tictactoe'

    const gameRef = db.ref(`${ref}/${id}`)

    const game = await gameRef.once('value').then(snapshot => snapshot.val());

    if (game) {
        return {
            id: id,
            gameFound: true,
            game: game
        }
    } else {
        throw new functions.https.HttpsError('not-found', 'Game with that ID not found')
    }
});

exports.createGame = functions.https.onCall(async (data: { name: string }) => {
    const { create2DArray, makeRandomID } = await import('./utils');

    const grid = create2DArray(3, 3);

    const newID = makeRandomID(5);

    const new_game: IGame = {
        id: newID,
        player_started: data.name,
        players: {
            [data.name]: "O"
        },
        player_turn: data.name,
        grid: grid,
        status_message: '',
        status: 'waiting',
    }

    const newGameRef = db.ref(`games/tictactoe/${newID}`)

    await newGameRef.set(new_game)

    return {
        data: new_game,
        gameID: newID
    }
})

exports.markGrid = functions.https.onCall(async (data: { gameID: string, player_name: string, x: number, y: number }) => {
    const { gameID, player_name, x, y } = data

    const gameRef = db.ref(`games/tictactoe/${gameID}`)
    const game: IGame = await gameRef.once('value').then((snapshot) => snapshot.val());

    game.grid[x][y] = player_name

    let won = true

    // horizontal

    for (let i = 0; i < game.grid.length; i++) {
        for (let y = 0; y < game.grid[i].length; y++) {
            if (game.grid[i][y] !== player_name) {
                won = false;
                break
            }
        }
    }

    won = true

    // vertical

    for (let i = 0; i < game.grid.length; i++) {
        for (let y = 0; y < game.grid[i].length; y++) {
            if (game.grid[y][i] !== player_name) {
                won = false;
                break
            }
        }
    }

    // diagonal

    for (let i = 0; i < game.grid.length; i++) {
        if (game.grid[i][i] !== player_name) {
            won = false;
            break
        }
    }

    for (let i = 0; i < game.grid.length; i++) {
        if (game.grid[i][game.grid.length - 1 - i] !== player_name) {
            won = false;
            break
        }
    }

    if (won) {
        const player_keys = Object.keys(game.players)

        // declare win
        await gameRef.update({
            status: 'end',
            status_message: `${player_name} won.`,
            player_started: player_keys[0] === player_name ? player_keys[1] : player_keys[0]
        })
    }

    return 'success'
})