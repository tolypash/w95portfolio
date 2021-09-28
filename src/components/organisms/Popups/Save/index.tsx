import React, { MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../Redux/hooks';
import { getDirectory } from '../../../../utils/storage';

import Window from '../../Window';
import Button from '../../../atoms/Button';
import TextField from '../../../atoms/TextField';

import styles from './SavePopup.module.scss';

import { Directory, isDirectory } from '../../../../Redux/reducers/storage';

import DirectoryIcon from '../../../../assets/icons/directory.png'

interface IProps {
    data?: any;
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SavePopup: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const storage = useAppSelector(state => state.storage);

    const [ref, setRef] = React.useState('')
    const [data, setData] = React.useState<Directory | null>(null)

    const [filename, setFilename] = React.useState('Untitled')

    React.useEffect(() => {
        const storageData = getDirectory(storage, ref)
        setData(storageData)
    }, [ref, storage])

    const goUp = () => {
        const dirs = ref.split('/')

        dirs.pop()

        const newRef = dirs.join('/')

        setRef(newRef)
    }

    const goTo = (dirName: string) => {
        const dirs = ref.split('/')

        dirs.push(dirName)

        setRef(dirs.join('/'))
    }

    const save = () => dispatch({ type: 'storage/create', payload: { dir: false, name: filename, ref: ref, slug: 'notepad', sdata: props.data } })

    return (
        <Window id='save' name='Save As' dismiss={props.dismiss} draggable zIndex={999}>
            <div className={styles.Container}>
                <div className={styles.TopContainer}>
                    Save in:
                    <TextField id='save_location' onChangeText={() => { }} value={'C:' + (ref || '/')} />
                    <Button
                        style={{ minWidth: 25, marginRight: 5, marginBottom: 0, marginTop: 0 }}
                        onClick={() => goUp()}
                    >
                        ..
                    </Button>
                    <Button
                        style={{ marginBottom: 0, marginTop: 0 }}
                        onClick={() => dispatch({ type: 'storage/create', payload: { dir: true, name: 'New Folder', ref: ref } })}
                    >
                        New Folder
                    </Button>
                </div>
                <div className={styles.MainContainer}>
                    <div className={styles.Directories}>
                        {data && data.children.map((child, index) => {
                            if (isDirectory(child)) {
                                return <div key={'dir' + index + child.name} className={styles.DirectoryRow} onClick={() => goTo(child.name)}>
                                    <img src={DirectoryIcon} alt='icon' />
                                    {child.name}
                                </div>
                            }
                        })}
                    </div>
                    <div className={styles.SideContainer}>
                        <Button onClick={() => save()}>Save</Button>
                        <Button onClick={props.dismiss}>Cancel</Button>
                    </div>
                </div>
                <div className={styles.BottomContainer}>
                    Name:
                    <TextField id='filename' onChangeText={(text: string) => setFilename(text)} value={filename} />
                </div>
            </div>
        </Window>
    )
}

export default SavePopup