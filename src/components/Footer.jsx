import React from "react";

/**
 * Footer — ultra minimal
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <p className="footer-copy">
          © {new Date().getFullYear()} HAMRO LIBRARY
        </p>
      </div>
    </footer>
  );
}

export default Footer;
