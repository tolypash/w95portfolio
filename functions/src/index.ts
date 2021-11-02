import * as admin from 'firebase-admin';
admin.initializeApp();

exports.games = require('./games');