import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">Privacy Policy</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Information We Collect</h4>
            <p className="text-gray-600 text-sm">We collect information that you provide directly to us, including email address and payment information.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">2. How We Use Your Information</h4>
            <ul className="text-gray-600 text-sm list-disc pl-4">
              <li>Process your orders and transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">3. Contact Us</h4>
            <p className="text-gray-600 text-sm">Email: support@ytstack.net</p>
          </div>
        </div>
      </div>
    </div>
  );
}