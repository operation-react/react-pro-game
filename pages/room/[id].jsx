import {useState, useEffect} from 'react'
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
      <h2>You are in room #{router.query.id} now!</h2>
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
        <div>
          {renderedPlayers}
        </div>
      </div>
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
    </Layout>
  )
}
