import React from 'react';

const Modal = ({ show, onClose, district, block, village }) => {
  if (!show) return null; 
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Status-Checking</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <p><strong>District:</strong> {district}</p>
          <p><strong>Block:</strong> {block}</p>
          <p><strong>Village:</strong> {village}</p>
          {/* <p><strong>Quality Level:</strong> {level}</p> */}

        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
