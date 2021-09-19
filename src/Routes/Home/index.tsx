import React from 'react';

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
        <div>

        </div>
    )
}

export default Home;