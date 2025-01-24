import Link from 'next/link'

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy-blue text-gold">
      <h1 className="text-4xl font-bold mb-8">About BigBurgh</h1>
      <p className="mb-8">This is the About page for BigBurgh.</p>
      <Link href="/" className="px-6 py-2 bg-gold text-navy-blue rounded-full hover:bg-yellow-400">
        Back to Home
      </Link>
    </div>
  )
}

