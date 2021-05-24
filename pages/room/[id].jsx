import { useState } from 'react'
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

  const renderedPlayers = players.map(p => <div><p>{p.name}</p><p>{p.score}</p></div>)

  return(
    <Layout>
      <h2>You are in room #{router.query.id}  now!</h2>
      <div className='roomContainer'>
        <img src={image} />
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
          </div>
        </div>
        <div className='playersList'>
          {renderedPlayers}
        </div>
      </div>
      <Link href={'/'}><a className='disconnectLink'> 
        <img className='disconnectIcon' src='https://image.flaticon.com/icons/png/128/1824/1824266.png' />
        Disconect
      </a></Link>

      <style jsx global>{`
        *{
          font-family: roboto;
        }

        h2{
          display: flex;
          align-self: auto;
          justify-content: center;
          margin-top: -70px;
          margin-bottom: 100px;
          color: white;
          white-space: break-spaces;
        }

        .roomContainer{
          display: flex;
          justify-content: space-between;
        }

        .roomContainer > img{
          width: 360px;
          height: 360px;
          border: 3px inset lightseagreen;
        }

        .answersContainer{
          min-height: 500px;
          width: 403px;
          background: lightseagreen;
          color: #FFFFFF;
          border-radius: 10px;
          padding: 0px 2px;
        }

        .answersContainer > h3{
          margin: 10px 12px;
          font-size: 24px;
          line-height: 28px;
        }

        .answersContainer > form{
          margin: 12px 0px;
          width: 400px;
          height: 100px;
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

        .disconnectLink{
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: absolute;
          bottom: 30px;
          left: 60px;
          text-align: end;
          padding-right: 30px;
          background: lightseagreen;
          border-radius: 29px;
          width: 337px;
          height: 68px;
          font-size: 36px;
          text-decoration: none;
          color: #FFFFFF;
          cursor: pointer;
        }

        .disconnectIcon{
          width: 47px;
          height: 47px;
        }

        .playersList{
          display: flex;
          flex-direction: column;
          background: lightseagreen;
          min-width: 150px;
          margin-left: 50px;
        }

        .playersList > div {
          display: flex;
          justify-content: space-between;
          color: #FFFFFF;
          height: auto;
          color: #FFFFFF;
          border-radius: 10px;
          border-bottom: 1px solid #ffffff59;
          padding: 4px 10px;
        }

        .playersList > div > * {
          margin: 4px;
        }
      
      `}</style>
    </Layout>
  )
}
