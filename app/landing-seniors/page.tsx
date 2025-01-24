import Link from 'next/link'

export default function LandingSeniors() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">Welcome to Seniors Landing Page</h1>
      <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
        Back to Dial
      </Link>
    </div>
  )
}

