"use client";

import Link from "next/link";
import { FaHome, FaProjectDiagram, FaUser, FaCog, FaSignOutAlt, FaSignInAlt, FaSearch } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/dashboard/signinModal';

export default function Sidebar({ highlight, username, className }) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const links = [
    { name: "Dashboard", icon: <FaHome size={24} style={{ marginRight: 20 }} /> },
    { name: "Projects", icon: <FaProjectDiagram size={24} style={{ marginRight: 20 }} /> },
    { name: "Profile", icon: <FaUser size={24} style={{ marginRight: 20 }} /> },
    { name: "Automation", icon: <FaCog size={24} style={{ marginRight: 20 }} />, requiresAuth: true },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <div className={className}>
      <div className="sidebar-logo-wrapper">
        <Link href="#">
          <img src="/logo.png" loading="lazy" alt="Logo" className="sidebar-logo" />
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', marginBottom: '20px'  , margin:'auto' , width:'90%'}}>
  <input 
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search username..."
    style={{
      width:'100%',
      padding: '10px',
      paddingLeft: '35px', // Add padding for the icon
      borderRadius: '4px',
      border: '1px solid #ccc',
      outline: 'none',
      fontSize: '16px',
    }}
  />
  <FaSearch
    size={20}
    style={{
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
      color: '#aaa',
    }}
  />
</div>


      </form>

      {links.map((link) => (
        <div key={link.name}>
          <Link
            href={link.requiresAuth && !session ? "#" : (link.name === "Dashboard" ? `/${username}` : `/${username}/${link.name.toLowerCase()}`)}
            className="nav-link w-inline-block"
            onClick={() => {
              if (link.requiresAuth && !session) {
                setIsModalOpen(true);
              }
            }}
            style={{
              color: link.name === highlight ? "#763FF9" : "inherit",
              backgroundColor: link.name === highlight ? "rgba(118, 63, 249, 0.2)" : "inherit",
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {link.icon}
            </span>
            <div style={{ color: link.name === highlight ? "#763FF9" : "inherit" }}>{link.name}</div>
          </Link>
        </div>
      ))}

      {session ? (
        <Link
          href="#"
          onClick={handleLogout}
          className="nav-link w-inline-block"
          style={{
            color: "inherit",
            backgroundColor: "inherit",
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FaSignOutAlt size={24} style={{ marginRight: 20 }} />
          </span>
          <div>Sign Out</div>
        </Link>
      ) : (
        <Link
          href="#"
          onClick={() => setIsModalOpen(true)}
          className="nav-link w-inline-block"
          style={{
            color: "inherit",
            backgroundColor: "inherit",
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FaSignInAlt size={24} style={{ marginRight: 20 }} />
          </span>
          <div>Sign In</div>
        </Link>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
