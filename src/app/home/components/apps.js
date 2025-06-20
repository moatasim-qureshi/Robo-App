// pages/index.js
import Link from 'next/link'
import './app.css'

export default function Drawing() {
  return (
    <main className='main'>
      <Link href="/welcome-page" className="icon">
        <span className='emoji'>✏️</span>
        <span className='label'>Drawing</span>
      </Link>
    </main>
  )
}
