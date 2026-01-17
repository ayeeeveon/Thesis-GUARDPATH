import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Building2 } from "lucide-react";

const BUILDINGS = {
  "Star Building": [
    "S-101", "S-102", "S-103", "S-104",
    "S-201", "S-202", "S-203", "S-204",
    "S-301", "S-302", "S-303", "S-304",
  ],
  "Main Building": ["101", "102", "103", "104"],
};

function History() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Get roomId from Map.jsx
  const rawRoomId = location.state?.roomId || "";

  // 🔹 Extract actual room (remove "room" prefix)
  const parsedRoom = rawRoomId.startsWith("room")
    ? rawRoomId.replace("room", "")
    : "";

  // 🔹 Detect building based on room format
  const detectedBuilding = parsedRoom.startsWith("S-")
    ? "Star Building"
    : parsedRoom
    ? "Main Building"
    : "Star Building";

  const [selectedBuilding, setSelectedBuilding] = useState(detectedBuilding);
  const [selectedRoom, setSelectedRoom] = useState(parsedRoom);

  // 🔹 Available rooms based on building
  const roomsForBuilding = useMemo(
    () => BUILDINGS[selectedBuilding],
    [selectedBuilding]
  );

  return (
    <div className="min-h-screen bg-white px-10 py-6">
      {/* Top Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/map")}>
          <ArrowLeft size={24} />
        </button>
        <button onClick={() => navigate("/map")}>
          <Home size={24} />
        </button>
      </div>

      <h1 className="text-4xl font-bold text-green-700 mb-8">History</h1>

      {/* Filters */}
      <div className="flex items-center gap-6 mb-6">
        {/* Building */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Select Building:</span>
          <select
            className="border px-4 py-2 font-semibold"
            value={selectedBuilding}
            onChange={(e) => {
              setSelectedBuilding(e.target.value);
              setSelectedRoom("");
            }}
          >
            {Object.keys(BUILDINGS).map((building) => (
              <option key={building} value={building}>
                {building}
              </option>
            ))}
          </select>
        </div>

        {/* Room */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Select Room:</span>
          <select
            className="border px-4 py-2 w-40"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">---------</option>
            {roomsForBuilding.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>

        <button className="ml-auto bg-green-700 text-white px-6 py-2 font-semibold hover:bg-green-800">
          Load
        </button>
      </div>

      {/* Table */}
      <div className="relative border overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-center font-semibold border-r">Building</th>
              <th className="py-3 text-center font-semibold border-r">Room #</th>
              <th className="py-3 text-center font-semibold border-r">Date</th>
              <th className="py-3 text-center font-semibold">
                Issues<br />Reported
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-96">
              <td className="border-r text-center font-semibold align-top pt-4">
                {selectedBuilding}
              </td>
              <td className="border-r text-center align-top pt-4">
                {selectedRoom}
              </td>
              <td className="border-r"></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Square Building Icon */}
        <div className="absolute bottom-4 left-4 w-24 h-20 bg-green-700 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="text-white mx-auto" size={22} />
            <span className="text-white text-xs font-semibold block mt-1">
              {selectedBuilding}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
