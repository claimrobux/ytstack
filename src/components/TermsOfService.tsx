import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  onClose: () => void;
}

export default function TermsOfService({ onClose }: TermsOfServiceProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">Terms of Service</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Service Description</h4>
            <p className="text-gray-600 text-sm">YTStack provides pre-monetized YouTube channels that meet YouTube's Partner Program requirements.</p>
            <ul className="text-gray-600 text-sm list-disc pl-4 mt-2">
              <li>Channel ownership transfer</li>
              <li>Monetization status verification</li>
              <li>Technical support during transfer</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">2. User Responsibilities</h4>
            <ul className="text-gray-600 text-sm list-disc pl-4">
              <li>Provide accurate information</li>
              <li>Maintain YouTube policy compliance</li>
              <li>Keep account credentials secure</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">3. Contact Information</h4>
            <p className="text-gray-600 text-sm">Email: support@ytstack.net</p>
          </div>
        </div>
      </div>
    </div>
  );
}