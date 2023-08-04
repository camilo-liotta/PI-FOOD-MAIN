import React, { useEffect, useState } from 'react'

const Modal = ({ isOpen, onClose, content }) => {
    return isOpen ? (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content">{content}</div>
        </div>
      </div>
    ) : null;
};

export default Modal