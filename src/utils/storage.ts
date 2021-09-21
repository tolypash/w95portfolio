import { Directory, File, isDirectory } from "../Redux/reducers/storage";

export function getFile(storage: Directory, ref?: string):File | null {
    const paths = ref?.split('/');

    if (paths && paths.length > 0) {
        let file = null;
        let temp = storage;
        let exit = false;
        let pathIndex = 0;

        do {
            let found = false
            for (let i = 0; i < temp.children.length; i++) {
                const child = temp.children[i];
                if (isDirectory(child)) {
                    pathIndex++
                    temp = child
                    found = true
                } else if (child.name === paths[pathIndex]) {
                    file = child
                }
            }

            if (!found) {
                exit = true
            }
        } while (!exit)

        return file;
    }

    return null
}

export function getDirectory(storage: Directory, ref: string): Directory | null {
    const paths = ref?.split('/');

    if (paths && paths.length > 0) {
        let temp = storage;
        let exit = false;
        let pathIndex = 0;

        do {
            let found = false
            for (let i = 0; i < temp.children.length; i++) {
                const child = temp.children[i];
                if (isDirectory(child) && child.name === paths[pathIndex]) {
                    pathIndex++
                    temp = child
                    found = true
                }
            }

            if (!found) {
                exit = true
            }
        } while (!exit)

        return temp;
    }

    return null
}