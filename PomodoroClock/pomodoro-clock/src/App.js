import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.css';

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [minutes, setMinutes] = useState(sessionLength);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);
    const alarm = new Audio("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav")

    const reset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setMinutes(25);
        setSeconds(0);
        setIsRunning(false);
        setIsSession(true);
    }

    useEffect(() => {
        if (isRunning) {
            const timerInterval = setInterval(() => {
                setSeconds(seconds - 1);
                if (!seconds && !minutes) {
                    alarm.play();
                    setIsSession(!isSession);
                    setMinutes(!isSession ? sessionLength : breakLength);
                    setSeconds(0);
                } else if (seconds <= 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }, 1000);
            return () => { clearInterval(timerInterval) };
        }
    });

    const changeBreakLength = (newLength) => {
        if (!isRunning) {
            setBreakLength(Math.max(newLength, 1));
            if (!isSession) {
                setMinutes(Math.max(newLength, 1));
                setSeconds(0);
            }
        }
    }

    const changeSessionLength = (newLength) => {
        if (!isRunning) {
            setSessionLength(Math.max(newLength, 1));
            if (isSession) {
                setMinutes(Math.max(newLength, 1));
                setSeconds(0);
            }
        }
    }

    return (
    <div className={ styles.App }>
        <span>
            <h1>Pomodoro Clock</h1>
        </span>
        <span className={styles.settings}>
            <div className={ styles.timeSetterContainer }>
                <h2>Break Length</h2>
                <div className={ styles.timeSetter }>
                    <button className={ styles.button } onClick={ () => { changeBreakLength(breakLength+1) } }>
                        <FontAwesomeIcon icon={faArrowUp} size={"xl"}/>
                    </button>
                    <div>{ breakLength }</div>
                    <button className={ styles.button } onClick={ () => { changeBreakLength(breakLength-1) } }>
                        <FontAwesomeIcon icon={faArrowDown} size={"xl"} />
                    </button>
                </div>
            </div>
            <div className={ styles.timeSetterContainer }>
                <h2>Session Length</h2>
                <div className={ styles.timeSetter }>
                    <button className={ styles.button } onClick={ () => { changeSessionLength(sessionLength+1) } }>
                        <FontAwesomeIcon icon={faArrowUp} size={"xl"} />
                    </button>
                    <div>{ sessionLength }</div>
                    <button className={ styles.button } onClick={ () => { changeSessionLength(sessionLength-1) } }>
                        <FontAwesomeIcon icon={faArrowDown} size={"xl"} />
                    </button>
                </div>
            </div>
        </span>
        <div className={ styles.clockContainer }>
            <h2>Session</h2>
            <h3 style={ minutes<1?{color: "red"}:{} }>{ (minutes<10?"0":"") + minutes }:{ (seconds<10?"0":"") + seconds }</h3>
        </div>
        <div className={ styles.controllerContainer }>
            <button onClick={ () => { setIsRunning(!isRunning) }}>
                <FontAwesomeIcon icon={ faPlay } size={"xl"} />
                <FontAwesomeIcon icon={ faPause } size={"xl"} />
            </button>
            <button onClick={ reset }>
                <FontAwesomeIcon icon={ faArrowsRotate } size={"xl"} />
            </button>
        </div>
        <div className={ styles.signature }>
            <div>Designed and Coded by</div>
            <div>sultanyaril</div>
        </div>
    </div>
    );
}

export default App;
