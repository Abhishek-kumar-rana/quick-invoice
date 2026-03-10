import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react';

const MenuBar = () => {

   const {openSignIn} = useClerk();
    const openLogin = () => {
      openSignIn({});
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-1">
      {/* container gives left-right spacing */}
      <div className="container d-flex align-items-center">

        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo x={50} y={50} />
          <span
            className="fw-bolder fs-3 ms-3"
            style={{ letterSpacing: "1.5px", color: "#0d6efd" }}
          >
            QuickInvoice
          </span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">

            <li className="nav-item">
              <Link className="nav-link fs-6 fw-semibold" to="/">
                Home
              </Link>
            </li>

            <SignedIn>
              <li className="nav-item">
              <Link className="nav-link fs-6 fw-semibold" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-6 fw-semibold" to="/generate">
                Generate
              </Link>
            </li>
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
            </SignedIn>

            <SignedOut>
              <li className="nav-item">
              <button
                className="btn btn-primary rounded-pill px-4 py-2 fs-6 fw-semibold"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={openLogin}
              >
                Login / Sign Up
              </button>
            </li>
            </SignedOut>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MenuBar