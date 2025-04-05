"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

export default function Home() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.accessToken) {
      const url = `https://localhost:3000/api/auth/github/callback?token=${session.accessToken}`
      window.location.href = url
    }
  }, [session])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8">Welcome to DevStudio</h1>
          <p className="text-xl mb-12">Your all-in-one development environment in the cloud</p>
          
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            {session ? (
              <div className="space-y-4">
                <p className="text-gray-300">Signed in as {session.user.email}</p>
                <button 
                  onClick={() => signOut()}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300 mb-4">Get started with DevStudio today</p>
                <button 
                  onClick={() => signIn("github")}
                  className="w-full bg-[#2ea44f] hover:bg-[#2c974b] text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 transition duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>Login with GitHub</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
