import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './header.module.css';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const previousScrollY = lastScrollY.current;

      if (menuOpenRef.current || currentScrollY <= 20) {
        setHidden(false);
      } else if (currentScrollY > previousScrollY) {
        setHidden(true);
      } else if (currentScrollY < previousScrollY) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
    setHidden(false);
  };

  return (
    <Fragment>
      <header
        className={styles.header}
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className={styles.inner}>
          <nav
            id="main-navigation"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ''
              }`}
            aria-label="Main navigation"
          >
            <a href="#about" onClick={closeMenu}>
              About me
            </a>

            <a href="#skills" onClick={closeMenu}>
              My skills
            </a>

            <a href="#projects" onClick={closeMenu}>
              My projects
            </a>

            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <button
            type="button"
            className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ''
              }`}
            onClick={toggleMenu}
            aria-label={
              menuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={styles.headerSpacer} aria-hidden="true" />
    </Fragment>
  );
}