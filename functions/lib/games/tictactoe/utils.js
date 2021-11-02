"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRandomID = exports.create2DArray = void 0;
function create2DArray(x, y) {
    const column = [];
    for (let i = 0; i < y; i++) {
        column.push(0);
    }
    const result = [];
    for (let j = 0; j < x; j++) {
        result.push(column);
    }
    return result;
}
exports.create2DArray = create2DArray;
function makeRandomID(length) {
    const result = [];
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}
exports.makeRandomID = makeRandomID;
//# sourceMappingURL=utils.js.map