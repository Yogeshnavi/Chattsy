import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-12 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Chattsy</h1>
          <p className="text-gray-600 text-sm md:text-base">Real-time chat using Next.js and Node.js</p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Link href="/register" className="block">
            <button className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base">
              Register
            </button>
          </Link>

          <Link href="/login" className="block">
            <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base">
              Login
            </button>
          </Link>
        </div>

        <p className="mt-6 text-xs md:text-sm text-gray-500">
          Connect with friends in real-time
        </p>
      </div>
    </main>
  );
}
