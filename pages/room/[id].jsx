import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'

export default function Room() {
  const router = useRouter()

  const [image, setImage] = useState('https://artbreeder.b-cdn.net/imgs/22af0c979142253e217599dd.jpeg')
  const [answers, setAnswers] = useState(['Monkey', 'Bottle', 'Souvenir packages'])
  const [players, setPlayers] = useState([{
      name: 'You',
      score: 99
    }
  ])

  const RenderedAnswers = () => answers.map((a, i) => <p key={i} className='answer'>{a}</p>)

  const renderedPlayers = players.map(p => <div><p className={`score ${p.color}`}>{p.score}</p><p>{p.name}</p></div>)
  const timer = `00:42`

  const answersInput = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAnswers(prev => [answersInput.current.value, ...prev]);
  }

  useEffect(() => {
    answersInput.current.value = ''
    answersInput.current.placeholder = answers.length >=5 ? "It's enough for you in this round" : 'Type your answer here'
    }
    ,[handleSubmit]
  )

  return(
    <Layout>
      <h2>You are in room #{router.query.id} now!</h2>
      <div className='roomContainer'>
        <img src={image} />
        <div className='playersZone'>
          <div className='timerAndPlayers'>
            <div className='timer'>
              <h3>{timer}</h3>
              <p>left</p>
            </div>
            <div className='playersList'>
              {renderedPlayers}
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
        <div>
          {renderedPlayers}
        </div>
      </div>
      <Link href={'/'}><a className='disconnectLink'> 
        <img className='disconnectIcon' src='https://image.flaticon.com/icons/png/128/1824/1824266.png' />
        Disconect
      </a></Link>
    </Layout>
  )
}
