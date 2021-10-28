"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.database();
exports.joinGame = functions.https.onCall(async (data) => {
    const { id } = data;
    const ref = 'games/tictactoe';
    const gameRef = db.ref(`${ref}/${id}`);
    const game = await gameRef.once('value').then(snapshot => snapshot.val());
    if (game) {
        // add player to game
        // const updates = {
        // }
        return {
            id: id,
            gameFound: true
        };
    }
    else {
        throw new functions.https.HttpsError('not-found', 'Game with that ID not found');
    }
});
//# sourceMappingURL=index.js.map