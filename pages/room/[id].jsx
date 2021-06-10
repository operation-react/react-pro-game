import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import io from "socket.io-client";

import Layout from '../../components/Layout'
import VotingPage from '../../components/VotingPage'
import RoomPage from '../../components/Room'

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
