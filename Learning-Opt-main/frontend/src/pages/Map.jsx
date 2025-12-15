import { useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useState } from "react";

function Map() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const goToHistory = (roomId) => {
    navigate("/history", { state: { roomId } });
  };

  const confirmLogout = () => {
    // Optional: clear auth/session
    // localStorage.clear();
    // sessionStorage.clear();

    navigate("/login");
  };

  const floors = [
    { name: "Floor 1", rooms: ["S-101", "S-102", "S-103", "S-104"] },
    { name: "Floor 2", rooms: ["S-201", "S-202", "S-203", "S-204"] },
    { name: "Floor 3", rooms: ["S-301", "S-302", "S-303", "S-304"] }
  ];

  return (
    <div className="relative min-h-screen w-full flex justify-center items-start p-5">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/CvSU.jpg')", opacity: 0.6 }}
      />

      {/* LOGOUT BUTTON */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow
                     hover:bg-red-700 transition font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* MAP CONTENT */}
      <div className="relative z-10 flex flex-col pt-32 w-full max-w-4xl">
        {floors.map((floor, idx) => (
          <div
            key={idx}
            className={`bg-white border-l-4 border-r-4 border-black ${
              idx === 0 ? "border-t-4 rounded-t-md" : ""
            } ${idx === floors.length - 1 ? "border-b-4 rounded-b-md" : ""}`}
          >
            <div className="text-center font-bold text-lg border-b-2 border-black py-2">
              {floor.name}
            </div>
            <div className="flex border-t-2 border-black">
              {floor.rooms.map((room, i) => (
                <Room
                  key={i}
                  label={room}
                  onClick={() => goToHistory(`room${room}`)}
                  isLast={i === floor.rooms.length - 1}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 text-center font-bold text-lg border-2 border-black py-2 rounded-md bg-white">
          CvSU – Carmona
        </div>
      </div>

      {/* 🔴 LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 text-red-600 p-3 rounded-full mb-4">
                <LogOut size={28} />
              </div>

              <h2 className="text-xl font-bold mb-2 text-red-600">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out?
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmLogout}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md
                             hover:bg-red-700 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Room({ label, onClick, isLast }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 h-28 bg-white border-r-2 border-black ${
        isLast ? "border-r-0" : ""
      } hover:bg-gray-100 font-semibold transition`}
    >
      {label}
    </button>
  );
}

export default Map;
