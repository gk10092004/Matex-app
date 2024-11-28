import { useState } from 'react';

function CustomAlertBox() {
  const [showAlert, setShowAlert] = useState(false);
  const message = "This is an important alert message!";

  // Show the alert box
  const showAlertBox = () => {
    setShowAlert(true);
  };

  // Close the alert box
  const closeAlertBox = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {/* <h1 onClick={showAlertBox} style={{ cursor: 'pointer' }}>Click here to show alert</h1> */}
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full text-center">
            <p className="text-lg font-bold">{message}</p>
            <button
              onClick={closeAlertBox}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
    </div>
  );
}

export default CustomAlertBox;
