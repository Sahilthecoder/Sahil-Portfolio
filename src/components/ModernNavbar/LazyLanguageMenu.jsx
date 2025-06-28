import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const LazyLanguageMenu = ({ isOpen, onToggle, currentLanguage, changeLanguage, languages }) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
        aria-label={t('selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FiGlobe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50"
            onClick={(e) => e.stopPropagation()}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu-button"
          >
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('selectLanguage')}
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  currentLanguage.code === lang.code
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
                aria-current={currentLanguage.code === lang.code ? 'true' : undefined}
              >
                <span className="mr-2 text-lg" aria-hidden="true">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLanguage.code === lang.code && (
                  <span className="ml-auto text-blue-500" aria-hidden="true">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(LazyLanguageMenu);
