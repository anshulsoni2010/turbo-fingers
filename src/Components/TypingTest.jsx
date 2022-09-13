import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import { useEffect } from 'react'
// import GaugeChart from "react-gauge-chart";

import "./TypingTestStyle.css"
var x = 0;
var wrongChars = {};
function TypingTest() {
    var content = useRef([]);
    var [timerFlag, setTimerFlag] = useState(false);
    var [timer, setTimer] = useState(0);
    var [minutes, setMinutes] = useState(0);
    var [seconds, setSeconds] = useState(0);
    var [speed, setSpeed] = useState(0);
    var [accuracy, setAccuracy] = useState(0);
    // var [wrongChars, setWrongChars] = useState({});
    var para = "Used for React and React Native, Victory is another popular react chart library that has a set of charting components and uses the same API for all applications. The identical API allows the users to generate data in the form of charts for both Android and iOS applications. The library provides for easy cross-platform charting and is very simple to learn and use."
        para = para.split("");

        var wrongSumbissions = 0;
    useEffect(()=>{
        var currentIndex = 0;
        content.current[0].classList.add("current");
        window.addEventListener("keypress", (e)=>{ 
            if(currentIndex == para.length)
            return
            if(!timerFlag)
            {
                setTimerFlag(true);
            }
            if(currentIndex == 0)
            {
                setAccuracy(100);
            }
            if(para[currentIndex] == e.key)
            {
                content.current[currentIndex].classList.remove("error");
                content.current[currentIndex].classList.remove("current");
                content.current[currentIndex].classList.add("correct");
                // console.log(currentIndex, para[currentIndex], e.key, wrongSumbissions)
                currentIndex++;
                x++;
                content.current[currentIndex].classList.add("current");
            }
            else
            {
                wrongChars[para[currentIndex]] = wrongChars[para[currentIndex]]? wrongChars[para[currentIndex]]+1 : 1;
                content.current[currentIndex].classList.remove("current");
                content.current[currentIndex].classList.add("error");
                wrongSumbissions++;
                let first = para.length-wrongSumbissions;
                let second = para.length;
                setAccuracy(((first/second)*100).toFixed(2))
                // console.log(currentIndex, para[currentIndex], e.key, wrongSumbissions)
            }
            console.log(timer, currentIndex)
        })
    }, [])
    var timerInterval;
    useEffect(()=>{
        
        console.log(x/2, para.length)
        if(timerFlag)
        {
            timerInterval = setInterval(()=>{
                // console.log(timer)'
                // console.log(timerInterval, x)
                if(x/2 >= para.length)
                {
                    clearInterval(timerInterval)
                    console.log(wrongChars)
                }
                setTimer(pre=>pre+1)
                setSeconds(pre=>pre+1)
                // var WPM = ((current/timer)*(60/5)).toFixed(0);
                // setSpeed(WPM);
            },1000)
        }
    }, [timerFlag])
    useEffect(()=>{
        var WPM = ((Math.floor(x/2)/Math.floor(timer))*(60/5)).toFixed(0);
        setSpeed(WPM);
        // console.log(Math.floor(x/2), timer)
    }, [timer])
    useEffect(()=>{
        if(seconds == 60)
        {
            setSeconds(0);
            setMinutes(pre=>pre+1)
        }
    }, [seconds])
  return (
    <div id='main-container'>
        <div id="content">
            {para.map((el, i)=>{
                return <span ref={(el)=>{content.current[i]=el}} key={i}>{el}</span>
            })}
        </div>
        <div id="data">
            <div>timer : <span  id="timer">{minutes<10 ?"0"+minutes:minutes}:{seconds<10 ? "0"+seconds :seconds}</span></div>
            <div>Speed : <span  id="speed">{isNaN(speed)?0:speed}</span></div>
            <div>Accuracy : <span  id="accuracy">{accuracy}</span></div>
        </div>
        <div>
        {/* <GaugeChart style={{ height: "150px"}}
        id="gauge-chart"
        textColor="#333"
        nrOfLevels={3}
        arcsLength={[0.4, 0.6, 1]}
        colors={["#EA4228", "#F5CD19","#5BE12C" ]}
        percent={speed/100}
        arcPadding={0.02}
        animate={false}
        text
      /> */}
        </div>
    </div>
  )
}

export default TypingTest