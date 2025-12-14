import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function Map() {
  const navigate = useNavigate();

  const goToHistory = (roomId) => {
    navigate("/history", { state: { roomId } });
  };

  // Array of floors and rooms
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
        style={{ backgroundImage: "url('/CvSU.jpg')", opacity: 0.6, zIndex: 0 }}
      ></div>

      {/* TOP LEFT BUTTONS */}
      <div className="absolute top-4 left-4 z-10 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-2 rounded-full shadow"
        >
          <ArrowLeft size={22} />
        </button>

        <button
          onClick={() => navigate("/map")}
          className="bg-white p-2 rounded-full shadow"
        >
          <Home size={22} />
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
