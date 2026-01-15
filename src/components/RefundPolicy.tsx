import React from 'react';
import { X } from 'lucide-react';

interface RefundPolicyProps {
  onClose: () => void;
}

export default function RefundPolicy({ onClose }: RefundPolicyProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">Refund Policy</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Refund Eligibility</h4>
            <ul className="text-gray-600 text-sm list-disc pl-4">
              <li>Channel transfer not completed within 48 hours</li>
              <li>Channel doesn't meet monetization requirements</li>
              <li>Technical issues prevent channel access</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">2. Refund Process</h4>
            <ol className="text-gray-600 text-sm list-decimal pl-4">
              <li>Contact support@ytstack.net</li>
              <li>Provide order number and reason</li>
              <li>Allow up to 48 hours for review</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium mb-2">3. Processing Time</h4>
            <ul className="text-gray-600 text-sm list-disc pl-4">
              <li>Credit/Debit Cards: 5-7 business days</li>
              <li>Cryptocurrency: 1-3 business days</li>
              <li>Bank Transfer: 7-10 business days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}