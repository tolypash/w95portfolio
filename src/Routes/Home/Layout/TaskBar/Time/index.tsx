import React from 'react';

const Time = () => {
    const [time, setTime] = React.useState('');

    let stop = React.useRef(false)

    const update = () => {

        const date = new Date()

        setTime(date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

        if (!stop.current) {
            setTimeout(() => update(), 1500)
        }
    }

    React.useEffect(() => {
        update()
    }, [])

    return (<span>{time}</span>)
}

export default Time;