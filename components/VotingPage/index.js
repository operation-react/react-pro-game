import { useCallback, useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Timer from '../../components/Timer'

const VotingPage = () => {
  const [image, setImage] = useState('https://artbreeder.b-cdn.net/imgs/22af0c979142253e217599dd.jpeg')
  const [answers, setAnswers] = useState(['Monkey', 'Bottle', 'Souvenir packages'])
  const [chosenAnswers, setChosenAnswers] = useState([])

  const chooseAnswer = useCallback((a) => {
    chosenAnswers.includes(a) ? 
    setChosenAnswers(prev => prev.filter(i => i!==a)) : 
    setChosenAnswers(prev => [...prev, a])
    console.log(chosenAnswers.includes(a))
  }, [])
  const RenderedAnswers = () => answers.map((a, i) => 
    <p  key={i} 
        className={`answersForVoting ${chosenAnswers.includes(a) ? 'active' : ''}`} 
        onClick={() => chooseAnswer(a)}
    >
        {a}
    </p>)
  const router = useRouter()

  const [fullTime, setFullTime] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentPercentage, setCurrentPercentage] = useState(0)
  const [isTimerStarted, setIsTimerStarted] = useState(false)

  const startTimer = useCallback(() => {
    if(!isTimerStarted) {
      setIsTimerStarted(true)
      let startTime = Math.round(Date.now() / 1000) - currentTime;
      // The subtraction is needed for implementing pausing for the timer
      // because it prevents skipping time that elapsed after pause after resume

      let secondTicker = setInterval(() => {
        let updatedCurrentTime = Math.round(Date.now() / 1000) - startTime;
        setCurrentTime(updatedCurrentTime);
        setCurrentPercentage((updatedCurrentTime / fullTime) * 100)

        if(updatedCurrentTime === fullTime) {
          clearInterval(secondTicker);
        }
      }, 1 * 100); // 100 because it allows to include ms differences between pauses
    }
  })
  startTimer()

  return(
    <main className='voting'>
      <h2 className='voting'>Room #{router.query.id}</h2>
      <div className='infoContainer'>
        <h3 className='voting-tips'>
          Choose 3 best answers!
        </h3>
        <img src={image} />
        <Timer
          fullTime={fullTime}
          currentTime={currentTime}
          currentPercentage={currentPercentage}
          start={startTimer}
        />
      </div>
      <div className='answers-block'>
        <div className='answers-box'>
          <RenderedAnswers />
        </div>
      </div>

      <Link href={'/'}>
        <a className='disconnectLink voting'> 
          <img className='disconnectIcon' src='https://image.flaticon.com/icons/png/128/1824/1824266.png' />
          Disconnect
        </a>
      </Link>
    </main>
  )
}


export default VotingPage;