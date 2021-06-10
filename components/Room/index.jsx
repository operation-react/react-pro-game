import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import Timer from '../Timer';
import PageLoader from '../PageLoader';

const PLAYERS_COLORS = ["blue", "brown", "pink", "green"];
const SESSION_STATES = {
    WAITING_FOR_PLAYERS: 0,
    IN_PROGRESS: 1
};

export default function Room({ changeStatus }) {
    const router = useRouter();
    const [ fullTime, setFullTime ] = useState(100);
    const [ currentTime, setCurrentTime ] = useState(1);
    const [ currentPercentage, setCurrentPercentage ] = useState(0);
    const [ isTimerStarted, setIsTimerStarted ] = useState(false);
    const [ image, setImage ] = useState('https://artbreeder.b-cdn.net/imgs/22af0c979142253e217599dd.jpeg')
    const [ answers, setAnswers ] = useState(['Monkey', 'Bottle', 'Souvenir packages'])
    const [ players, setPlayers ] = useState([]);
    const [ sessionState, setSessionState ] = useState(SESSION_STATES.WAITING_FOR_PLAYERS);
    const [ roomData, setRoomData ] = useState(null);
    const answersInput = useRef(null);

    useEffect(() => currentTime === fullTime ? changeStatus(false) : false, [currentTime]);

    useEffect(async () => {
        const response = await fetch("/api/user");
        const json = await response.json();

        console.log(json);

        const myId = uuidv4();
        const { id } = router.query;
        const socket = io("/room/" + id);

        socket.on("init", (message) => {
            setRoomData(message.room);

            socket.emit("user-connected", {
                id: myId,
                name: json.login
            });
        });

        socket.on("user-connected", (message) => {
            const newRoomData = {
                users: [],
                ...roomData
            };
            newRoomData.users.push(message.user);
            setRoomData(newRoomData);
        });

        socket.on("start-play", (message) => {
            setSessionState(SESSION_STATES.IN_PROGRESS);
            setImage(message.image);
        });
    }, []);

    const startTimer = () => {
        if (isTimerStarted) {
            return;
        }

        setIsTimerStarted(true);

        const startTime = Math.round(Date.now() / 1000) - currentTime;
        const secondTicker = setInterval(() => {
            const updatedCurrentTime = Math.round(Date.now() / 1000) - startTime;

            setCurrentTime(updatedCurrentTime);
            setCurrentPercentage((updatedCurrentTime / fullTime) * 100)

            if (updatedCurrentTime === fullTime) {
                clearInterval(secondTicker);
            }
        }, 100);
    };

    const RenderedAnswers = () => answers.map((a, i) => <p key={i} className='answer'>{a}</p>);
    const RenderedPlayers = () => roomData.users.map((p, i) => (
        <div key={ i }>
            <p className={ `score ${ PLAYERS_COLORS[i % PLAYERS_COLORS.length] }` }>{ p.score }</p>
            <p>{ p.name }</p>
        </div>
    ));
    const handleSubmit = (e) => {
        e.preventDefault();
        setAnswers(prev => [answersInput.current.value, ...prev]);
    }

    useEffect(() => {
        // answersInput.current.value = '';
        // answersInput.current.placeholder = answers.length >= 5 ? "It's enough for you in this round" : 'Type your answer here';
    }, [answers]);

    // startTimer();

    let content = null;

    if (sessionState === SESSION_STATES.WAITING_FOR_PLAYERS) {
        console.log(roomData);
        content = (
            <PageLoader>
                <h2 className="mt-5">Waiting for players</h2>
                <h4 className="mt-2">{ (roomData?.users?.length) || 1 } / 12</h4>
            </PageLoader>
        );
    }
    else {
        content = (
            <>
                <h2>Room #{router.query.id?.substring(0, 8)}</h2>
                <div className='roomContainer'>
                    <div>
                        <img src={image} />
                        <Link href="/">
                            <a className='disconnectLink'>
                                <img className='disconnectIcon' src='https://image.flaticon.com/icons/png/128/1824/1824266.png' />
                            Disconnect
                        </a>
                        </Link>
                    </div>
                    <div className='playersZone'>
                        <div className='timerAndPlayers'>
                            <Timer fullTime={fullTime}
                                currentTime={currentTime}
                                currentPercentage={currentPercentage} />
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
            </>
        );
    }

    return (
        content
    );
}
