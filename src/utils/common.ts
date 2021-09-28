export function makeRandomID(length: number) {
    const result = [];
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

export function reconstructObject(obj: { [x: string]: any }) {
    const newObj: { [x: string]: any } = {}

    Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
            newObj[key] = reconstructArray(obj[key])
        }
        else if (typeof obj[key] === 'object') {
            newObj[key] = reconstructObject(obj[key])
        } else {
            newObj[key] = obj[key]
        }
    })

    return { ...newObj }
}

export function reconstructArray(arr: { [x: string]: any }) {
    const newArray: any[] = arr.map((el: any) => {
        if (typeof el === 'object') {
            return reconstructObject(el)
        } else if (Array.isArray(el)) {
            return reconstructArray(el)
        } else {
            return el
        }
    })

    return [...newArray]
}