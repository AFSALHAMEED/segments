import { useState } from "react";
import { SegmentPopup } from "@/components";

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-teal-600 text-white px-4 py-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>

        <span className="text-lg">View Audience</span>
      </div>
      <div className="flex-1 bg-gray-400 px-6 py-8 backdrop-blur-lg">
        <button
          className="border-2 border-white text-white px-8 py-3 font-medium hover:bg-gray-500 transition-colors !z-50"
          onClick={() => setShowPopup(true)}
        >
          Save segment
        </button>
        <SegmentPopup
          onClose={() => setShowPopup(false)}
          showPopup={showPopup}
        />
      </div>
    </div>
  );
}

export default App;
