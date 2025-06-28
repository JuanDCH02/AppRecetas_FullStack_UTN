import { useRef, useEffect } from 'react';

export const Modal = ({ children, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // 👉 Cierra si se hace clic afuera
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold text-lg"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
