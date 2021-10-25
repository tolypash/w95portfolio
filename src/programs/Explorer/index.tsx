import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { getDirectory } from '../../utils/storage';
import useIsMobile from '../../hooks/useIsMobile';

import Window from '../../components/organisms/Window';
import Divider from '../../components/ions/Divider';
import TextField from '../../components/atoms/TextField';
import FolderIcon from '../../components/atoms/FolderIcon';
import ProgramIcon from '../../components/atoms/ProgramIcon';

import DirectoryIcon from '../../assets/icons/directory.png';

import defaultPrograms from '../default';

import styles from './Explorer.module.scss';

import { Window as WindowProps } from '../../Redux/reducers/windows';
import { File, Directory, isFile, isDirectory } from '../../Redux/reducers/storage';

const Explorer = (props: WindowProps) => {
    const dispatch = useAppDispatch()
    const storage = useAppSelector(state => state.storage)
    const isMobile = useIsMobile()

    const [ref, setRef] = React.useState(props.sdata.ref)
    const [children, setChildren] = React.useState<(Directory | File)[]>([])

    console.log(props.sdata.ref)

    React.useEffect(() => {
        const directory = getDirectory(storage, ref)
        console.log(directory)
        if (directory?.children) {
            setChildren(directory.children)
        }
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

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
            style={{
                minWidth: !isMobile ? 700 : undefined,
                height: 500
            }}
        >
            <div className={styles.TopBar}>
                <div className={styles.left}>
                    {/* <div className={'clickable'}>
                        File
                    </div> */}
                </div>
            </div>

            <Divider />

            <div className={styles.ActionBar}>
                {/* <IconButton label='Stop' onClick={() => {

                }}>
                    <img src={StopIcon} alt='icon' />
                </IconButton> */}

                <IconButton label='Up...' onClick={() => goUp()}>
                    <img src={DirectoryIcon} alt='directory up icon' />
                </IconButton>
            </div>

            <Divider />

            <div className={styles.AddressBar}>
                <TextField id='save_location' onChangeText={() => { }} value={'C:' + (ref || '/')} />
            </div>

            <Divider />

            <div className={styles.MainContainer}>
                {children.map((file, index: number) => {
                    if (!isDirectory(file)) {
                        return <ProgramIcon
                            key={`di_${file.slug}_${index}`}
                            tabIndex={index}
                            {...file}
                            sdata={{ ...defaultPrograms[file.slug], ...file.sdata, ref: '/Desktop' }}
                            style={{ color: '#000' }}
                        />
                    } else {
                        return <FolderIcon
                            key={`di_explorer_${index}`}
                            tabIndex={index}
                            {...file}
                            sdata={{ name: file.name, slug: 'explorer', ...file.sdata, ref: '/Desktop' }}
                            style={{ color: '#000' }}
                            onClick={() => { goTo(file.name) }}
                        />
                    }
                })}
            </div>

        </Window>
    )
}

const IconButton = (props: {
    label: string
} & React.HTMLProps<HTMLDivElement>) => {
    return (<div className={styles.IconButton + ' clickable'} {...props}>
        <div className={styles.Icon}>
            {props.children}
        </div>
        <div className={styles.Label}>
            {props.label}
        </div>
    </div >)
}

export default Explorer