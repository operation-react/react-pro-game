<<<<<<< Updated upstream
import {useState, useEffect} from 'react'
=======
import { useState, useRef, useEffect } from 'react'
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  const renderedPlayers = players.map(p => <div><p>{p.name}</p><p>{p.score}</p></div>)
=======
  const renderedPlayers = players.map(p => <div><p className={`score ${p.color}`}>{p.score}</p><p>{p.name}</p></div>)
  const timer = `00:42`
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <div className='answersContainer'>
          <h3>
            Type your answer here
          </h3>
          <form>
            <input className='input' type='text' />
            <input className='btn' type='submit' />
          </form>
          <div className='answers'> 
            <RenderedAnswers />
=======
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
>>>>>>> Stashed changes
          </div>
        </div>
        <div>
          {renderedPlayers}
        </div>
      </div>
<<<<<<< Updated upstream
      <footer>
        <Link href={'/'}><a>Disconect</a></Link>
      </footer>

      <style jsx global>{`
        h2{
          display: flex;
          align-self: auto;
          justify-content: flex-start;
          margin-top: -70px;
          margin-bottom: 100px;
          color: white;
        }

        .roomContainer{
          display: flex;
          justify-content: space-between;
        }

        .roomContainer > img{
          width: 450px;
          height: auto;
          border: 3px inset lightseagreen;
        }

        .answersContainer{
          width: 408px;
          background: lightseagreen;
          color: white;
          padding: 15px 2px;
        }

        .answersContainer > h3{
          margin: 10px 12px;
          font-size: 24px;
          line-height: 28px;
        }

        .answersContainer > form{
          margin: 12px 2px;
          width: 400px;
          height: 100px;
          padding: 4px;
        }

        .answersContainer > form > input.input{
          width: 100%;
          height: 100%;
          font-size: 32px;
          color: #045294e6;
          padding: 12px;
        }
        
        .answersContainer > form > input.btn{
          display: none
        }

        .answers{
          display: flex;
          flex-wrap: wrap;
        }

        .answer{
          margin: 7px 10px;
          width: fit-content;
          font-size: 24px;
          line-height: 28px;
          border-radius: 50px;
          padding: 12px 18px;
          border: 3px solid #FFFFFF;
        }
      
      `}</style>
=======
      <Link href={'/'}><a className='disconnectLink'> 
        <img className='disconnectIcon' src='https://image.flaticon.com/icons/png/128/1824/1824266.png' />
        Disconect
      </a></Link>
>>>>>>> Stashed changes
    </Layout>
  )
}
