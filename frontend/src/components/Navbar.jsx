import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaBars, FaTimes } from "react-icons/fa";
import { getUser, logout } from "../services/api.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = getUser();
  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo"><FaStethoscope /> CareLink</Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          <Link to="/doctors" onClick={close}>Find a doctor</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={close}>My dashboard</Link>
              <Link to="/admin" onClick={close}>Admin</Link>
              <button className="btn outline" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={close}>Log in</Link>
              <Link to="/register" className="btn" onClick={close}>Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
