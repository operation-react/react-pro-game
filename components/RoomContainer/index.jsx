import Link from "next/link";


export default ({roomNumber, numberOfPlayers}) => 
  <div className='roomBox'>
    <div className='roomInfo'>
      <div>
        Room #{roomNumber}
      </div>
      <div>
        {numberOfPlayers}/12 users
      </div>
    </div>
    <Link href={`/room/${roomNumber}`}>
      <button className='connectBtn'>
        Join room
      </button>
    </Link>
  </div>
