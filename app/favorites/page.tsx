import Link from "next/link"

export default function Favorites() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy-blue text-gold">
      <h1 className="text-4xl font-bold mb-8">Your Favorites</h1>
      <p className="mb-8">No favorites right now.</p>
      <Link
        href="/"
        className="px-6 py-2 bg-gold text-navy-blue rounded-full hover:bg-yellow-400 transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  )
}

