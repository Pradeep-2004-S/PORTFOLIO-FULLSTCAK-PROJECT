import { useState } from 'react';

const navItems = ['Home', 'Service', 'Resume', 'Portfolio', 'Contact'];

export default function Header({ activeSection, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section) => {
    onNavClick(section);
    setMenuOpen(false);
  };

  return (
    <header className="active">
      <span className="logo" onClick={() => handleNav('Home')}>
        Pradeep
      </span>

      <i
        id="menu-icon"
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      <nav className={menuOpen ? 'active' : ''}>
        {navItems.map((item) => (
          <a
            key={item}
            className={activeSection === item ? 'active' : ''}
            onClick={() => handleNav(item)}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
