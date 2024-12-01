import React from 'react';

interface DisclaimerPopupProps {
  onDismiss: () => void;
}

export const DisclaimerPopup: React.FC<DisclaimerPopupProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
        <p className="mb-4">
          The information provided on this platform is for general informational purposes only. 
          All information on the platform is provided in good faith, however we make no representation 
          or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, 
          reliability, availability, or completeness of any information on the platform.
        </p>
        <p className="mb-4">
          It is important to note that the information available on this platform is primarily sourced 
          from open channels such as LinkedIn and other publicly accessible resources. We are not affiliated 
          with any organization, and the data presented here is not endorsed or verified by any corporate entity. 
          Users should exercise their own judgment and discretion when interpreting the information provided.
        </p>
        <p className="mb-4">
          Under no circumstance shall we have any liability to you for any loss or damage of any kind 
          incurred as a result of the use of the platform or reliance on any information provided on the platform. 
          Your use of the platform and your reliance on any information on the platform is solely at your own risk. 
          We encourage users to cross-verify the information with official sources and remain informed about any updates 
          or changes that may occur.
        </p>
        <button
          onClick={onDismiss}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};
