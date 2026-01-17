import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.68.117:5000"); // later change localhost -> your PC IP

export default function LiveScans() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    socket.on("scan", (data) => {
      setScans((prev) => [data, ...prev]);
    });

    return () => socket.off("scan");
  }, []);

  return (
    <div>
      <h2>Live RFID Scans</h2>
      {scans.map((s, i) => (
        <div key={i}>
          {s.room} | {s.uid} | {s.device_id} | {s.ts}
        </div>
      ))}
    </div>
  );
}
