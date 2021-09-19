import React from 'react';

import Layout from './Layout';

const StartupSound = require('../../assets/sounds/startup.mp3');

function Home() {

    let audio = new Audio(StartupSound.default)

    const playStartupSound = () => {
        audio.play().catch(err => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        playStartupSound()
        
        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, [])

    return (
        <Layout />
    )
}

export default Home;