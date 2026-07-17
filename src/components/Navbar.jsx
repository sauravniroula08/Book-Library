import React, { useState, useEffect, useRef } from "react";

function Navbar({ 
  totalBooks, 
  favCount, 
  onAddBook, 
  isLoggedIn,
  onLogin,
  onLogout,
  onShowProfile,
  onShowSettings
}) {
  const userName = "Saurav Niroula";
  const avatarUrl = "https://api.dicebear.com/7.x/initials/svg?seed=SN&backgroundColor=6366f1&textColor=ffffff&fontSize=40";
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        
        {/* Logo */}
        <div className="nav-logo">
          <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="44" rx="8" fill="#FFF3E0"/>
            <path d="M22 10 C22 10 14 14 14 22 C14 30 22 34 22 34 C22 34 30 30 30 22 C30 14 22 10 22 10Z" fill="#FF6B35" opacity="0.15"/>
            <path d="M14 14 Q22 8 30 14 L30 30 Q22 36 14 30 Z" fill="none" stroke="#E65100" strokeWidth="1.5"/>
            <path d="M22 10 L22 34" stroke="#E65100" strokeWidth="1.5"/>
            <path d="M14 17 Q18 19 22 17 Q26 19 30 17" stroke="#E65100" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M14 22 Q18 24 22 22 Q26 24 30 22" stroke="#E65100" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M14 27 Q18 29 22 27 Q26 29 30 27" stroke="#E65100" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '1px', color: '#E65100' }}>HAMRO LIBRARY</span>
        </div>



        {/* Right Side */}
        <div className="nav-user">
          {isLoggedIn ? (
            <>
              {/* Counters */}
              <div className="nav-counters-pill">
                <div className="nav-counter-side">
                  <div className="nav-counter-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div className="nav-counter-text">
                    <strong>{totalBooks}</strong>
                    <span>Books</span>
                  </div>
                </div>
                <div className="nav-counter-divider"></div>
                <div className="nav-counter-side">
                  <div className="nav-counter-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div className="nav-counter-text">
                    <strong>{favCount}</strong>
                    <span>Favorites</span>
                  </div>
                </div>
              </div>

              {/* Add Book Button */}
              <button className="btn-add-book" onClick={onAddBook}>
                + Add Book
              </button>

              {/* Profile Dropdown */}
              <div style={{ position: 'relative' }} ref={profileRef}>
                <div 
                  className="nav-profile-trigger"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="nav-avatar">
                    <img src={avatarUrl} alt={userName} />
                  </div>
                  <span className="nav-username">{userName}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isProfileOpen && (
                  <div className="admin-dropdown" style={{ right: 0, left: 'auto', marginTop: '12px' }}>
                    <div className="admin-dropdown-item" onClick={() => { setIsProfileOpen(false); onShowProfile(); }}>Profile</div>
                    <div className="admin-dropdown-item" onClick={() => { setIsProfileOpen(false); onShowSettings(); }}>Settings</div>
                    <div className="admin-dropdown-divider"></div>
                    <div className="admin-dropdown-item" onClick={() => { setIsProfileOpen(false); onLogout(); }} style={{ color: 'var(--red)' }}>Logout</div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button className="btn-add-book" onClick={onLogin} style={{ background: 'var(--text)', color: 'white' }}>
              Login
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
