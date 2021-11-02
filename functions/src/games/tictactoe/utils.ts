export function create2DArray(x: number, y: number) {
    const column = []

    for (let i = 0; i < y; i++) {
        column.push(0)
    }

    const result = []

    for (let j = 0; j < x; j++) {
        result.push(column)
    }

    return result;
}

export function makeRandomID(length: number) {
    const result = [];
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}