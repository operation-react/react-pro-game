import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import io from "socket.io-client";

import Layout from '../../components/Layout'
import Timer from '../../components/Timer'

export default function Room() {
    const router = useRouter()

    // The time that the timer has to count towards
    // by incrementing currentTime
    const [fullTime, setFullTime] = useState(100)
    const [currentTime, setCurrentTime] = useState(0)
    const [currentPercentage, setCurrentPercentage] = useState(0)
    const [isTimerStarted, setIsTimerStarted] = useState(false)


    useEffect(() => {
        let startTime = Math.round(Date.now() / 1000) - currentTime;
        // The subtraction is needed for implementing pausing for the timer
        // because it prevents skipping time that elapsed after pause after resume
    
        let secondTicker = setInterval(() => {
            let updatedCurrentTime = Math.round(Date.now() / 1000) - startTime;
            setCurrentTime(updatedCurrentTime);
            setCurrentPercentage((updatedCurrentTime / fullTime) * 100)
    
            if (updatedCurrentTime === fullTime) {
                clearInterval(secondTicker);
            }
        }, 1 * 100); // 100 because it allows to include ms differences between pauses
    }, []);

    const [image, setImage] = useState('https://artbreeder.b-cdn.net/imgs/22af0c979142253e217599dd.jpeg')
    const [answers, setAnswers] = useState(['Monkey', 'Bottle', 'Souvenir packages'])
    const [players, setPlayers] = useState([{
        name: 'You',
        score: 99,
        color: 'blue'
    },
    {
        name: 'Volandemort',
        score: 22,
        color: 'brown'
    },
    {
        name: 'Harry',
        score: 34,
        color: 'pink'
    },
    {
        name: 'Hermiona',
        score: 199,
        color: 'green'
    }
    ])

    useEffect(() => {
        const socket = io("/room/" + router.query.id);

        console.log(socket);

        socket.on("hello", response => {
            console.log(response);
        });
    }, []);

    const RenderedAnswers = () => answers.map((a, i) => <p key={i} className='answer'>{a}</p>)

    const RenderedPlayers = () => players.map((p, i) => <div key={i}><p className={`score ${p.color}`}>{p.score}</p><p>{p.name}</p></div>)

    const answersInput = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        setAnswers(prev => [answersInput.current.value, ...prev]);
    }

    useEffect(() => {
        answersInput.current.value = ''
        answersInput.current.placeholder = answers.length >= 5 ? "It's enough for you in this round" : 'Type your answer here'
    }
        , [answers]
    )

    return (
        <Layout>
            <h2>Room #{ router.query.id?.substring(0, 8) }</h2>
            <div className='roomContainer'>
                <div>
                    <img src={image} />
                    <Link href={'/'}><a className='disconnectLink'>
                        <img className='disconnectIcon' src='https://image.flaticon.com/icons/png/128/1824/1824266.png' />
            Disconnect
          </a></Link>
                </div>
                <div className='playersZone'>
                    <div className='timerAndPlayers'>
                        <Timer
                            fullTime={fullTime}
                            currentTime={currentTime}
                            currentPercentage={currentPercentage}
                        />
                        <div className='playersList'>
                            <RenderedPlayers />
                        </div>
                    </div>
                    <div className='answersContainer'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input ref={answersInput}
                                className='input'
                                type='text'
                                required
                                maxLength='15'
                                minLength='3'
                                disabled={answers.length >= 5}
                            />
                            <input className='btn' type='submit' />
                        </form>
                        <div className='answers'>
                            <RenderedAnswers />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
