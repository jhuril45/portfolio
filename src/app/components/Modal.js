'use client';

import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  // Close modal on "Escape" key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus trap inside the modal
  useEffect(() => {
    if (isOpen) {
      const firstFocusableElement = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusableElement?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
    >
      <div
        ref={modalRef}
        className={`bg-white p-6 rounded shadow-lg max-w-lg w-full transform transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        role="document"
      >
        <h2 id="modal-title" className="text-xl font-bold">
          Accessible Modal
        </h2>
        <p>This is an accessible modal using ARIA attributes.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close Modal
        </button>
      </div>
    </div>
  );
};

export default Modal;
