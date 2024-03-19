import { useState, useRef } from "react";
import ResultModal from "./ResultModal";


export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();

    // --------------------------- OLD --------------------------------------
    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    // function handleStart(){
    //     timer.current = setTimeout(() => {
    //         setTimerExpired(true);
    //         dialog.current.open();
    //     }, targetTime * 1000);
    //     setTimerStarted(true);
    // }

    // function handleStop(){
    //     clearTimeout(timer.current);
    // }

    // ----------------------------- NEW ------------------------------------

    const [timeRemain, setTimeRemain] = useState(targetTime * 1000);
    const timerIsActive = timeRemain > 0 && timeRemain < targetTime * 1000;
    
    if (timeRemain <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemain(targetTime * 1000);
    }
    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemain(prevTimeRemain =>  prevTimeRemain - 10);
        }, targetTime * 10);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }

    // -------------------------------------------------------------------

    return <> 
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemain} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? 'Stop': 'Start'} Challenge
            </button>
            <p className={timerIsActive ? 'active': undefined}>
                {timerIsActive? 'Timer is running' : 'Timer is inactive'}
            </p>
        </section>
    </>
}
