import React, { useState } from 'react'
import "./style.scss"
import GaugeChart from "react-gauge-chart";
import { useEffect } from 'react';
import API from "../../utills/API";
function ScoreCard({speed, accuracy, totalTime, seconds, minutes, paragraph,heading, userID, freqOfWrongChars}) {
  let token = localStorage.getItem("token");
  if(!token)
    window.location.reload();

  var words = paragraph.join("").split(" ").length;
  var characters = paragraph.length;
    var mistakes = [];
    var typos=0
    for(var key in freqOfWrongChars)
    {
      typos+=freqOfWrongChars[key];
      mistakes.push([key==" "?"space":key, freqOfWrongChars[key]]);
    }
    mistakes.sort((a,b)=>b[1]-a[1])

    var [feedback, setFeedback] = useState("");
    var [feedbackTheme, setFeedbackTheme] = useState("");



    useEffect(()=>{
      if(speed>=40)
      {
        if(accuracy == 100)
        {
          setFeedback("Woah!!! you have 0 typos and its really amazing, keep going");
          setFeedbackTheme("1");
        }
        else if(accuracy>=95)
        {
          setFeedback("Your typing speed and accuracy both are good, but you can practice for better typing speed.")
          setFeedbackTheme("1")
        }
        else if(accuracy>=88)
        {
          setFeedback("Your typing speed is good but accuracy rate is falling below 95%, so need to work on accuracy.")
          setFeedbackTheme("1")
        }
        else
        {
          setFeedback("No doubt your typing speed is good but unfortunately accuracy is too low, so ultimately you will take enough time to correct typos. So better maintain accuracy while typing.")
          setFeedbackTheme("2")
        }
      }
      else if(speed>=30)
      {
        if(accuracy>=95)
        {
          setFeedback("You are doing great in accuracy but need to improve typing speed as well")
          setFeedbackTheme("1")
        }
        else if(accuracy>=88)
        {
          setFeedback("You are doing good, but your typing speed and accuracy can be improved by a bit practice")
          setFeedbackTheme("2")
        }
        else
        {
          setFeedback("Unfortunately your accuracy is very low, hence need to focus more on accuracy and speed as well.")
          setFeedbackTheme("3")
        }
      }
      else if(speed>=20)
      {
        if(accuracy>=95)
        {
          setFeedback("No doubt your accuracy rate is really good, but need to work on typing speed, it is below average but can be improved with some more practice.")
          setFeedbackTheme("2")
        }
        else if(accuracy>=88)
        {
          setFeedback("I must say that you need to work on both, speed and accuracy, because both are below than average but not worst and can be improved with some more practice.")
          setFeedbackTheme("2")
        }
        else
        {
          setFeedback("At this speed, this much low accuracy speed in not expected. Please work on typing speed with maintaining more than 95% accuracy rate.")
          setFeedbackTheme("3")
        }
      }
      else 
      {
        if(accuracy>=95)
        {
          setFeedback("I must say you are maintaining the accuracy rate, but typing speed is very low, so try to practice more and improve the typing speed.")
          setFeedbackTheme("2")
        }
        else
        {
          setFeedback("Buddy don't feel bad, but I must say you really need to improve your typing speed with maintaining more than 95% accuracy.")
          setFeedbackTheme("3")
        }
      }
    }, [])


    useEffect(()=>{
      if(feedback=="")
      return
      var obj = {
        speed: +speed,
        accuracy:accuracy,
        totalSeconds:(minutes*60)+seconds,
        totalWords:words,
        totalChars: characters,
        totalWrongChars : typos,
        freqOfWrongChars: mistakes,
        feedback:feedback,
        paragraphTitle : heading,
        user:userID
      }
      fetch(`${API}/score/${token}`, {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body : JSON.stringify(obj)
    }).then(resp=>resp.json()).then(resp=>{
      console.log(resp)

    }, [])
    
  }, [feedback])
    var style1 = {
      color:"#3B763D",
      backgroundColor:"#DFEFD8"
    } 
    var style2 = {
      color:"#999900",
      backgroundColor:"#ffffcc"
    }
    var style3 = {
      color:"#833534",
      backgroundColor:"#F2DEDD"
    }

  return (
    
    <div id='ScoreCard'>
      <div className='top-cont'>
      <h3 style={feedbackTheme == 1?style1:feedbackTheme==2?style2:style3}>{feedback}</h3>
      </div>
        <div className='middle-cont'>
            <div>
              <GaugeChart style={{width:"100%"}}
                    id="gauge-chart"
                    textColor="black"
                    nrOfLevels={4}
                    arcsLength={[0.4, 0.4, 0.5, 0.7]}
                    colors={["#EA4228", "#F5CD19","#5BE12C", "#2d6e16"]}
                    percent={speed/100}
                    arcPadding={0.02}
                    needleColor={"grey"}
                    formatTextValue	={(speed)=>speed+" w/pm"}
                    needleBaseColor={"black"}
                    animate={true}
                    text
                />
            </div>
            <div className='card-cont'>
              <div className='card'>
                <div>Time</div>
                <div>
                  <div className='time'></div>
                  <div>{minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}</div>
                </div>
              </div>
              <div className='card'>
                <div>Accuracy</div>
                  <div>
                    <div className='accuracy'></div>
                    <div>{accuracy}<span style={{fontSize:"20px"}}>(%)</span></div>
                  </div>
              </div>
              <div className='card'>
                <div>Speed</div>
                  <div>
                    <div className='speed'></div>
                    <div>{speed}<span style={{fontSize:"20px"}}>(wpm)</span></div>
                  </div>
              </div>
              <div className='card'>
                <div>Words</div>
                  <div>
                    <div className='words'></div>
                    <div>{words}</div>
                  </div>
              </div>
              <div className='card'>
                <div>Characters</div>
                  <div>
                    <div className='chars'></div>
                    <div>{characters}</div>
                  </div>
              </div>
              <div className='card'>
                <div>Mistakes</div>
                  <div>
                    <div className='wrong-entries'></div>
                    <div>{typos}</div>
                  </div>
              </div>
            </div>
        </div>
        <div className='bottom-cont'>
          <div><button onClick={()=>window.location.reload()}>Retake Test</button></div>
          <div>
            {mistakes.length == 0?
            <h2>No typos</h2>
            :
            <><h2>Most Wrong typed characters</h2>
            
            <div className='tags'>
            {
              mistakes.map((el, i)=>{
                return <div key={i} className='chip'>{el[0]} : {el[1]}</div>
              })
            }
            </div>
            </>
            }
          </div>
        </div>
    </div>
  )
}

export default ScoreCard