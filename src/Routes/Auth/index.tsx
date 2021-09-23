import React from 'react';
import { useHistory } from 'react-router';

import styles from './Auth.module.scss'

import TextField from '../../components/atoms/TextField';
import Button from '../../components/atoms/Button';
import Window from '../../components/organisms/Window';
import ErrorPopup from '../../components/organisms/Popups/Error';

import KeyIcon from '../../assets/icons/key_win_alt-2.png';

function Auth() {

    const history = useHistory()

    const username = React.useRef('')
    const password = React.useRef('')

    const [error, setError] = React.useState('')

    const LogIn = (e: React.FormEvent) => {
        // prevent refresh
        e.preventDefault();

        if (username.current !== 'admin') {
            setError('User not found')
            return
        }

        if (password.current !== 'admin') {
            setError('Invalid password! Please try again')
            return
        }

        history.push('/home')
    }

    return (
        <div className={styles.Container}>
            <Window id='welcome' name={'Welcome to Windows'} zIndex={1}>
                <form style={{ display: 'flex', overflow: 'hidden', margin: 10 }} onSubmit={LogIn}>
                    <div className={styles.SideContainer}>
                        <img src={KeyIcon} className={styles.Icon} alt='key' />
                    </div>

                    <div style={{ paddingLeft: 10, paddingRight: 20 }}>
                        Type a user name and password to log on to Windows.

                        <div style={{ paddingTop: 25 }}>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor='username'>User name: </label>
                                <TextField id='username' onChangeText={(text: string) => username.current = text} />
                            </div>

                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor='password'>Password: </label>
                                <TextField id='password' onChangeText={(text: string) => password.current = text} type='password' />
                            </div>

                        </div>

                        <span className={styles.small}>Hint: Username: admin, Password: admin</span>
                    </div>

                    <div className={styles.SideContainer}>
                        <Button onClick={LogIn} type='submit'>OK</Button>
                        <Button onClick={() => { }} type='button'>Cancel</Button>
                    </div>
                </form>
            </Window>

            {error ? <ErrorPopup dismiss={() => setError('')} text={error} /> : null}
        </div>
    )
}

export default Auth;