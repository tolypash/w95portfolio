import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.database();

exports.joinGame = functions.https.onCall(async (data: { id: string, name: string }) => {
    const { id } = data;

    const ref = 'games/tictactoe'

    const gameRef = db.ref(`${ref}/${id}`)

    const game = await gameRef.once('value').then(snapshot => snapshot.val());

    if (game) {
        // add player to game
        // const updates = {

        // }

        return {
            id: id,
            gameFound: true
        }
    } else {
        throw new functions.https.HttpsError('not-found', 'Game with that ID not found')
    }
});

exports.createGame = functions.https.onCall(async (data: { id: string, name: string }) => {
    const { create2DArray } = await import('./utils');

    const grid = create2DArray(3, 3);

    console.log(JSON.stringify(grid))
})
