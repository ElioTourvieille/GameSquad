import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page not found</h2>
      <p className="text-gray-400 text-center mb-8 max-w-md">
        Sorry, the page you are looking for seems to have disappeared in cyberspace.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300 text-white font-medium"
      >
        Back to home
      </Link>
    </div>
  )
} 