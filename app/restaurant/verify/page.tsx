"use client"

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function VerifyOrderPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const response = await fetch('/api/orders/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode: code }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Order verified successfully!');
        setCode('');
      } else {
        setStatus('error');
        setMessage('Invalid verification code');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to verify order');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Verify Order</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 text-lg tracking-wider border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={code.length !== 6}
            className="w-full bg-primary text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify Order
          </button>
        </div>

        {status !== 'idle' && (
          <div className={`mt-4 p-4 rounded-lg flex items-center gap-2
            ${status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
          >
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 