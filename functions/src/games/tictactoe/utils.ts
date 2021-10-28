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