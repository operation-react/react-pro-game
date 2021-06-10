import Link from "next/link";
import { useEffect, useState } from "react";

import Header from '../components/Header';
import RoomContainer from '../components/RoomContainer';

export default function Rooms() {
    const [ rooms, setRooms ] = useState([])

    useEffect(() => {
        const controller = new AbortController();

        fetch("/api/rooms", { signal: controller.signal })
            .then(res => res.json())
            .then(json => setRooms(json));

        return () => controller.abort();
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
                        { rooms.map(room => (
                            <RoomContainer key={ room.id } { ...room } />
                        )) }
                    </div>
                </div>
                <div className='imgsSection'>
                    <Link href="/api/rooms/new">
                        <a className='createRoomBtn'>
                            Create room
                        </a>
                    </Link>
                    <div className='roomsOnImgs'>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}