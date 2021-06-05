import Link from 'next/link'

export default function ErrorPage() {
  return (
    <main className='root'>
      <div className='errorContainer'>
        <h1>Error 404</h1>
        <p>Please <Link href={'/'}><a>go back</a></Link> to home page</p>
      </div>
    </main>
  )
}