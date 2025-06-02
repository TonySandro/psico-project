import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './languageSwitcher.module.scss';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button className={styles.toggle} onClick={() => setOpen(!open)}>
        🌐 {i18n.language.toUpperCase()}
      </button>
      {open && (
        <div className={styles.dropdown}>
          <button onClick={() => handleLanguageChange('pt')}>🇧🇷 Português</button>
          <button onClick={() => handleLanguageChange('en')}>🇺🇸 English</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
