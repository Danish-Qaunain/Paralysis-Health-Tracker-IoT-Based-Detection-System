import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  autoClose = false,
  duration = 5000,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />
  };

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={`flex items-center p-4 mb-4 rounded-lg border ${typeStyles[type]} animate-fade-in`}>
      <div className="mr-3">{iconMap[type]}</div>
      <div className="flex-grow text-sm">{message}</div>
      {onClose && (
        <button
          onClick={handleClose}
          className="ml-auto focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5 opacity-60 hover:opacity-100" />
        </button>
      )}
    </div>
  );
};

export default Alert;