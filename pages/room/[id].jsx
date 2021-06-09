import { useState, useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import VotingPage from '../../components/VotingPage'
import RoomPage from '../../components/Room'
import Timer from '../../components/Timer'

export default function Room() {
  const [gameStatus, setGameStatus] = useState(true)
  const changeStatus = (status) => setGameStatus(status)

  const CurrentPage = () => gameStatus ? 
    <RoomPage changeStatus={(status) => changeStatus(status)}/> : 
    <VotingPage changeStatus={(status) => changeStatus(status)}/>
    
  return(
    <Layout>
      <CurrentPage />
    </Layout>
  )
}
