import React from 'react'

function Toast({ message, isOpen = true, type = 'success' }) {
  const toastClasses = `
    fixed top-0 right-0 z-50 px-4 py-3 rounded-full shadow-md 
    transition duration-300 ease-in-out transform translate-x-full
    ${isOpen ? 'translate-x-0' : ''}
    bg-${type === 'success' ? 'green-500' : type === 'error' ? 'red-500' : 'white'}
    text-white bg-red
  `;

  return (
    <div className={toastClasses} >
      {message}
    </div>
  );
}

export default Toast;
