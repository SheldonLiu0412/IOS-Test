'use client';

import { useState } from 'react';

export default function StatusChecker() {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<{
    status: 'ok' | 'error' | 'warning' | null;
    message: string;
    details?: any;
  }>({ status: null, message: '' });
  const [showMessage, setShowMessage] = useState(false);

  const checkStatus = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setStatus(data);
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setStatus({ status: null, message: '' });
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      setStatus({
        status: 'error',
        message: 'Check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setStatus({ status: null, message: '' });
      }, 1000);

      return () => clearTimeout(timer);
    } finally {
      setChecking(false);
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'ok':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={checkStatus}
        disabled={checking}
        className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        {checking ? 'Checking...' : 'Check Status'}
      </button>
      
      {showMessage && (
        <div className="absolute top-full mt-2 right-0 w-64 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 text-sm">
          <div className="font-medium mb-1">{status.message}</div>
          {status.details && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {typeof status.details === 'string' 
                ? status.details 
                : JSON.stringify(status.details, null, 2)}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 