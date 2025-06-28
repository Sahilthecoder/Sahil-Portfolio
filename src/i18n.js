import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  en: {
    translation: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      selectLanguage: 'Select Language',
      autoTheme: 'Auto Theme',
      toggleTheme: 'Toggle theme',
      menu: 'Menu',
      closeMenu: 'Close menu',
    },
  },
  es: {
    translation: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      experience: 'Experiencia',
      contact: 'Contacto',
      selectLanguage: 'Seleccionar idioma',
      autoTheme: 'Tema automático',
      toggleTheme: 'Cambiar tema',
      menu: 'Menú',
      closeMenu: 'Cerrar menú',
    },
  },
  fr: {
    translation: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      experience: 'Expérience',
      contact: 'Contact',
      selectLanguage: 'Choisir la langue',
      autoTheme: 'Thème automatique',
      toggleTheme: 'Changer de thème',
      menu: 'Menu',
      closeMenu: 'Fermer le menu',
    },
  },
  de: {
    translation: {
      home: 'Startseite',
      about: 'Über mich',
      projects: 'Projekte',
      experience: 'Erfahrung',
      contact: 'Kontakt',
      selectLanguage: 'Sprache wählen',
      autoTheme: 'Automatisches Design',
      toggleTheme: 'Design wechseln',
      menu: 'Menü',
      closeMenu: 'Menü schließen',
    },
  },
  hi: {
    translation: {
      home: 'होम',
      about: 'मेरे बारे में',
      projects: 'प्रोजेक्ट्स',
      experience: 'अनुभव',
      contact: 'संपर्क',
      selectLanguage: 'भाषा चुनें',
      autoTheme: 'स्वचालित थीम',
      toggleTheme: 'थीम बदलें',
      menu: 'मेन्यू',
      closeMenu: 'मेन्यू बंद करें',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
