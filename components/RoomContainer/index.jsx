import Link from "next/link";

const MAX_ROOM_CAPACITY = 12;

export default function RoomContainer(props) {
    return (
        <div className='roomBox'>
            <div className='roomInfo'>
                <div>
                    Room #{ props.id.substring(0, 8) }
                </div>
                <div>
                    { props.users.length }/{ MAX_ROOM_CAPACITY } users
            </div>
            </div>
            <Link href={`/room/${ props.id }`}>
                <button className='connectBtn'>
                    Join room
            </button>
            </Link>
        </div>
    );
}
