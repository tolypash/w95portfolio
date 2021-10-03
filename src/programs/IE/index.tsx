import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import useIsMobile from '../../hooks/useIsMobile';

import Window from '../../components/organisms/Window';

import { Window as WindowProps } from '../../Redux/reducers/windows';

import Divider from '../../components/ions/Divider';
import TextField from '../../components/atoms/TextField';

import IEIcon from '../../assets/icons/msie1-1.png';
import RefreshIcon from '../../assets/icons/refresh.png';
import HomeIcon from '../../assets/icons/homepage-0.png';
import SearchIcon from '../../assets/icons/search_web.png';

import styles from './IE.module.scss';

const InternetExplorerProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch();

    const [history, setHistory] = React.useState<string[]>([]);

    const currentHistoryIndex = React.useRef(-1);
    const ignoreNextLoad = React.useRef(false);

    const [url, setUrl] = React.useState('https://bing.com/')

    const [addressInput, setAddressInput] = React.useState('');

    const [randomKey, setRandomKey] = React.useState(1);

    const isMobile = useIsMobile()

    let iframeRef = React.useRef<any>(null);

    const onLoad = () => {
        if (ignoreNextLoad.current) {
            ignoreNextLoad.current = false;
            return;
        }

        const addressUrl = iframeRef.current.src
        console.log(iframeRef.current.src)

        setAddressInput(addressUrl)
        setUrl(addressUrl)

        currentHistoryIndex.current = history.length

        setHistory(prevState => [...prevState, addressUrl])
    }

    const go = (type: 'back' | 'forward') => {
        let newIndex = currentHistoryIndex.current + ((type === 'back') ? -1 : 1)

        if (newIndex >= history.length || newIndex < 0 || !history.length) {
            return;
        }

        currentHistoryIndex.current = newIndex
        ignoreNextLoad.current = true
        iframeRef.current.src = history[currentHistoryIndex.current]
    }

    const search = () => {
        if (!addressInput) {
            return;
        }

        if (isValidHttpUrl(addressInput)) {
            iframeRef.current.src = addressInput
        } else {
            iframeRef.current.src = `https://www.bing.com/search?q=${addressInput}`
        }
    }

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
            style={{
                minWidth: !isMobile ? 700 : undefined,
                minHeight: 500,
                paddingBottom: 12
            }}
        >
            <div className={styles.TopBar}>
                <div className={styles.left}>
                    {/* <div className={'clickable'}>
                        File
                    </div> */}
                </div>

                <div className={styles.right}>
                    <img src={IEIcon} />
                </div>
            </div>

            <Divider />

            <div className={styles.ActionBar}>
                <IconButton label='Back' onClick={() => go('back')}>
                    {'<'}
                </IconButton>

                <IconButton label='Forward' onClick={() => go('forward')}>
                    {'>'}
                </IconButton>

                {/* <IconButton label='Stop' onClick={() => {

                }}>
                    <img src={StopIcon} alt='icon' />
                </IconButton> */}

                <IconButton label='Refresh' onClick={() => {
                    ignoreNextLoad.current = true
                    setRandomKey(prevState => prevState + 1)
                }}>
                    <img src={RefreshIcon} alt='icon' />
                </IconButton>

                <IconButton label='Home' onClick={() => {
                    iframeRef.current.src = `https://www.bing.com/`
                }}>
                    <img src={HomeIcon} alt='icon' />
                </IconButton>

                <IconButton label='Search' onClick={search}>
                    <img src={SearchIcon} alt='icon' />
                </IconButton>
            </div>

            <Divider />

            <div className={styles.AddressBar}>
                Address
                <TextField
                    id=''
                    onChangeText={(text: string) => setAddressInput(text)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search()
                        }
                    }}
                    style={{ flex: 1 }}
                    value={addressInput}
                />
            </div>

            <Divider />

            <iframe key={randomKey} ref={iframeRef} src={url} onLoad={onLoad} />
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

function isValidHttpUrl(string: string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default InternetExplorerProgram