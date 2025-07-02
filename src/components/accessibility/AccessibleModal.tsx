import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import useKeyboardNavigation from '../../hooks/useKeyboardNavigation';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeButtonLabel?: string;
  initialFocusRef?: React.RefObject<HTMLElement>;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animationDuration?: number;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full w-full h-full',
};

const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeButtonLabel = 'Close',
  initialFocusRef,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  ariaLabelledby,
  ariaDescribedby,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  showCloseButton = true,
  showFooter = false,
  footerContent,
  size = 'md',
  animationDuration = 0.2,
}) => {
  const modalRef = useKeyboardNavigation<HTMLDivElement>(isOpen, {
    trapFocus: true,
    restoreFocus: true,
  });

  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEsc, onClose]);

  // Set initial focus when modal opens
  useEffect(() => {
    if (isOpen) {
      // Add class to body to prevent scrolling
      document.body.style.overflow = 'hidden';
      
      // Set focus to initial focus ref or close button
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
      
      return () => {
        // Reset body overflow when modal closes
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, initialFocusRef]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render anything if we're not in the browser
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className={`fixed inset-0 z-50 bg-black/50 ${overlayClassName}`}
            onClick={handleOverlayClick}
            role="presentation"
            aria-hidden={!isOpen}
          />
          
          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            aria-modal="true"
            role="dialog"
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: animationDuration, ease: 'easeOut' }}
              className={`relative w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl ${sizeClasses[size]} ${className}`}
              tabIndex={-1}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
                <h2 
                  id={ariaLabelledby || 'modal-title'}
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                >
                  {title}
                </h2>
                
                {showCloseButton && (
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label={closeButtonLabel}
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                )}
              </div>
              
              {/* Body */}
              <div 
                id={ariaDescribedby || 'modal-description'}
                className={`p-6 overflow-y-auto max-h-[calc(100vh-12rem)] ${bodyClassName}`}
              >
                {children}
              </div>
              
              {/* Footer */}
              {showFooter && (
                <div className={`p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3 ${footerClassName}`}>
                  {footerContent || (
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      {closeButtonLabel}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AccessibleModal;
