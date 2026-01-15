import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PurchaseNotificationProps {
  name: string;
  timeAgo: string;
  onClose: () => void;
}

export default function PurchaseNotification({ name, timeAgo, onClose }: PurchaseNotificationProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex items-start space-x-3 animate-slide-in">
      <div className="flex-shrink-0">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          {name} purchased a channel
        </p>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>
    </div>
  );
}