import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/Layout'
import VotingPage from '../../components/VotingPage'
import RoomPage from '../../components/Room'
import PageLoader from '../../components/PageLoader'

export default function Room() {
    const [ isValidRoom, setIsValidRoom ] = useState(false);
    const [ roomData, setRoomData ] = useState(null);
    const [ gameStatus, setGameStatus ] = useState(true);
    const router = useRouter();

    useEffect(async () => {
        const { id } = router.query;

        const response = await fetch("/api/rooms/" + id);
        const json = await response.json();

        if (json.ok) {
            setIsValidRoom(true);
            setRoomData(json.room);
        }
        else {
            router.push("/rooms");
        }
    }, []);

    let pageContent = (
        <PageLoader />
    );

    if (isValidRoom && gameStatus) {
        pageContent = (
            <RoomPage room={ roomData }
                changeStatus={(status) => setGameStatus(status)} />
        );
    }
    else if (isValidRoom && !gameStatus) {
        pageContent = (
            <VotingPage room={ roomData }
                changeStatus={(status) => setGameStatus(status)} />
        );
    }

    return (
        <Layout>
            { pageContent }
        </Layout>
    );
}
