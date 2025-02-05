"use client";

import React from "react";
import { FaTimes, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSignIn = async () => {
    await signIn("github");
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes style={styles.closeIcon} />
        </button>
        <div style={styles.content}>
          <FaGithub style={styles.githubIcon} />
          <h2 style={styles.title}>Sign in to GitHub</h2>
          <p style={styles.text}>Join millions of developers collaborating on GitHub.</p>
          <button style={styles.signInButton} onClick={handleSignIn}>
            <FaGithub style={styles.buttonIcon} />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    width: "320px",
    position: "relative",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
  content: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    transition: "background 0.2s ease",
  },
  closeIcon: {
    fontSize: "20px",
    color: "#666666",
  },
  githubIcon: {
    fontSize: "48px",
    color: "#24292e",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#24292e",
    margin: "0 0 12px 0",
  },
  text: {
    fontSize: "14px",
    color: "#666666",
    textAlign: "center",
    margin: "0 0 24px 0",
    lineHeight: 1.5,
  },
  signInButton: {
    backgroundColor: "#24292e",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    width: "100%",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 0.2s ease, transform 0.1s ease",
  },
  buttonIcon: {
    fontSize: "20px",
  },
};

// Add hover effects
styles.closeButton.hover = {
  background: "#f0f0f0",
};

styles.signInButton.hover = {
  background: "#181b1f",
  transform: "scale(0.98)",
};

export default Modal;