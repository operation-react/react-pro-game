import Link from "next/link";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import Header from '../components/Header';
import RoomContainer from '../components/RoomContainer';

const defaultRoomsInfo = [
    {
        roomNumber: 1,
        numberOfPlayers: 2,
    },
    {
        roomNumber: 2,
        numberOfPlayers: 4,
    },
    {
        roomNumber: 3,
        numberOfPlayers: 5,
    },
    {
        roomNumber: 4,
        numberOfPlayers: 3,
    },
    {
        roomNumber: 5,
        numberOfPlayers: 9,
    },
    {
        roomNumber: 6,
        numberOfPlayers: 12,
    },
    {
        roomNumber: 7,
        numberOfPlayers: 4,
    },
    {
        roomNumber: 121261616,
        numberOfPlayers: 7,
    }
]

export default function Rooms() {
    const newRoom = Math.ceil(Math.random() * 999999)
    const [rooms, setRooms] = useState(defaultRoomsInfo)

    useEffect(() => {
        const socket = io();

        socket.on("ping", response => console.log(response));
    }, []);

    return (
        <div>
            <Header />
            <div className='rooms'>
                <div className='roomsListSection'>
                    <h3 className='subheader'>
                        <span>
                            Explore
                        </span>
                        <span>
                            &nbsp;available rooms or create your own one
                        </span>
                    </h3>
                    <div className='roomsArea'>
                        {rooms.map(r =>
                            <RoomContainer
                                roomNumber={r.roomNumber}
                                numberOfPlayers={r.numberOfPlayers}
                            />
                        )}
                    </div>
                </div>
                <div className='imgsSection'>
                    <Link href={`/room/${newRoom}`}>
                        <a className='createRoomBtn'>
                            Create room
                        </a>
                    </Link>
                    <div className='roomsOnImgs'>
                        <div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}