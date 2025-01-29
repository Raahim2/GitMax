import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    // Sign in with GitHub
    await signIn("github"); // No callbackUrl here
  };

  useEffect(() => {
    if (session && session.user) {
      router.push(`/${session.user.username}`); // Redirect to username page
    }
  }, [session, router]);

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <a href="/" className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </a>
        
        <div className="navbar-actions">
          {session ? (
            <>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleSignIn} className="btn btn-secondary">
              Login With GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
