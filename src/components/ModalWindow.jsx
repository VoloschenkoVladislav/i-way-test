import React from 'react';
import './modalWindow.scss';

export const ModalWindow = ({ children, onClose }) => {
  return (
    <div className='modal-window__blur' onClick={onClose}>
      <div className='modal-window' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
