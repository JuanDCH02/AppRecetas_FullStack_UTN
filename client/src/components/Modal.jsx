import { useRef, useEffect } from 'react';

export const Modal = ({ children, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Cierra si se hace clic afuera
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-4 animate-fade-in relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-600 font-extrabold text-xl hover:scale-110 transition-transform"
        >✕
        </button>
        {children}
      </div>
    </div>
  );
};
