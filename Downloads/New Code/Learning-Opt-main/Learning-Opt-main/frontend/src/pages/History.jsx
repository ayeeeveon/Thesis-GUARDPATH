import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function History() {
  const location = useLocation();

  // ✅ Map passes: navigate("/history", { state: { room: "S-101" } })
  const preselectedRoom = location.state?.room || "";

  const [building, setBuilding] = useState("Star Building");
  const [room, setRoom] = useState(preselectedRoom);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roomOptions = useMemo(
    () => [
      "",
      "S-101",
      "S-102",
      "S-103",
      "S-104",
      "S-201",
      "S-202",
      "S-203",
      "S-204",
      "S-301",
      "S-302",
      "S-303",
      "S-304",
    ],
    []
  );

  const formatDate = (dt) => {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
  };

  const formatTime = (dt) => {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? "" : d.toLocaleTimeString();
  };

  const loadHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.set("building", building);
      if (room) params.set("room", room);

      const res = await fetch(`/api/history?${params.toString()}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const json = await res.json();
      setRows(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      setError(String(e.message || e));
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-load on open + whenever building/room changes
  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building, room]);

  return (
    <div className="relative min-h-screen w-full p-6">
      {/* ✅ BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/CvSU.jpg')", opacity: 0.6 }}
      />

      {/* ✅ PAGE CONTENT ABOVE BACKGROUND */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-green-700 mb-4">History</h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Select Building:</span>
            <select
              className="border border-black px-3 py-1 bg-white"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            >
              <option value="Star Building">Star Building</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Select Room:</span>
            <select
              className="border border-black px-3 py-1 bg-white"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              {roomOptions.map((r) => (
                <option key={r} value={r}>
                  {r === "" ? "---------" : r}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={loadHistory}
            className="bg-green-700 text-white px-6 py-2 font-semibold"
          >
            Load
          </button>

          {loading && <span className="text-gray-700 font-semibold">Loading...</span>}
          {error && <span className="text-red-600 font-semibold">{error}</span>}
        </div>

        {/* ✅ TABLE */}
        <div className="bg-white border-2 border-black rounded-md overflow-hidden shadow">
          <div className="font-bold text-lg px-4 py-3 border-b-2 border-black">
            Scan History (Latest)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black">
                  <th className="text-left px-3 py-2">Building</th>
                  <th className="text-left px-3 py-2">Room</th>
                  <th className="text-left px-3 py-2">Date</th>
                  <th className="text-left px-3 py-2">Time</th>
                  <th className="text-left px-3 py-2">UID</th>
                  <th className="text-left px-3 py-2">Issue</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3" colSpan={6}>
                      No records found.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, idx) => (
                    <tr key={idx} className="border-t border-black/40">
                      <td className="px-3 py-2">{r.building}</td>
                      <td className="px-3 py-2 font-semibold">{r.room}</td>
                      <td className="px-3 py-2">{formatDate(r.created_at)}</td>
                      <td className="px-3 py-2">{formatTime(r.created_at)}</td>
                      <td className="px-3 py-2">{r.uid}</td>
                      <td className="px-3 py-2">{r.issue_reported || ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
