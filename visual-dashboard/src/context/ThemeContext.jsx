import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // choose initial theme:
  // 1) localStorage
  // 2) prefers-color-scheme media query
  // 3) default to 'light'
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) { /* ignore */ }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply the theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    // keep in sync with system changes (optional)
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      // if user hasn't manually set theme, follow system
      try {
        const stored = localStorage.getItem('theme');
        if (!stored) setTheme(e.matches ? 'dark' : 'light');
      } catch (err) {}
    };
    if (mq && mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq && mq.addListener) mq.addListener(handler);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener('change', handler);
      else if (mq && mq.removeListener) mq.removeListener(handler);
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
