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

  const RenderedAnswers = () => answers.map((a, i) => <p key={i} className='answer'>{a}</p>)

  const renderedPlayers = players.map(p => <div><p className={`score ${p.color}`}>{p.score}</p><p>{p.name}</p></div>)

  const timer = `00:42`

  return(
    <Layout>
      <h2>Room #{router.query.id}</h2>
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
            <form>
              <input className='input' type='text' placeholder='Type your answear here' />
              <input className='btn' type='submit' />
            </form>
            <div className='answers'> 
              <RenderedAnswers />
            </div>
          </div>
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
          width: 520px;
          min-height: 520px;
          max-height: 560px;
          border: 3px inset lightseagreen;
          margin-right: 40px;
        }

        .playersZone{
          display: flex;
          flex-direction: column;
        }

        .answersContainer{
          margin-top: 60px;
          min-height: 260px;
          width: 800px;
          background: lightseagreen;
          color: #FFFFFF;
          border-radius: 10px;
          padding: 0px 2px;
          flex: 1;
        }

        .answersContainer > form{
          margin: 12px 0px;
          width: 798px;
          height: 60px;
        }

        .answersContainer > form > input.input{
          width: 100%;
          height: 100%;
          font-size: 32px;
          color: #045294e6;
          padding: 12px;
          border-radius: 16px;
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

        .timerAndPlayers{
          display: flex;
          margin-top: 60px
        }

        .timer{
          flex: 1;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: linear-gradient(180deg, white 0% , #0BC5B9 60%);
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .timer > h3{
          font-size: 64px;
          line-height: 75px;
          margin: 20px 0 2px;
        }

        .timer > p{
          font-size: 36px;
          line-height: 42px;
          margin: 0;
        }

        .playersList{
          height: 260px;
          display: flex;
          flex-wrap: wrap;
          min-width: 150px;
          margin-left: 50px;
          flex: 2;
        }

        .playersList > div {
          flex: 50%;
          display: flex;
          color: #333;
          height: auto;
          border-radius: 10px;
          border-bottom: 1px solid #ffffff59;
          padding: 4px 10px;
          align-items: center;
        }

        .score{
          width: 50px;
          height: 50px;
          line-height: 50px;
          border-radius: 50%;
          text-align: center;
          color: #FFFFFF;
          margin-right: 20px;
        }

        .score.blue{
          background: #00A2E2
        }
        .score.green{
          background: #00E283
        }
        .score.brown{
          background: #E26C00
        }
        .score.pink{
          background: #F982FC
        }
      `}</style>
    </Layout>
  )
}
