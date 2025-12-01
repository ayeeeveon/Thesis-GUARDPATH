import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleTap = () => {
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center p-5"
      onClick={handleTap}
    >

      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/CvSU.jpg')",
          opacity: 0.6, 
          zIndex: 0, 
        }}
      ></div>

      <div
        className="relative z-10 flex items-center justify-center w-full bg-opacity-0.5"
        style={{ pointerEvents: "none" }} 
      >
      <div
        className="rounded-2xl p-6 w-full max-w-2xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.70)",
        }}
      >
          <div className="flex flex-col items-center justify-center">
            <img
              src="/log.png"
              alt="Log Icon"
              className="w-24 mb-6 opacity-90"
              style={{ pointerEvents: "auto" }}
            />

              <div
                className="px-8 py-10 rounded-xl shadow-xl text-center cursor-pointer w-full max-w-xl"
                style={{ backgroundColor: "rgba(32,125,22,0.85)", pointerEvents: "auto" }}
              >
              <p className="text-white text-6xl font-extrabold tracking-wide">
                TAP
              </p>
              <p className="text-white text-6xl font-extrabold tracking-wide mt-2">
                ANYWHERE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
