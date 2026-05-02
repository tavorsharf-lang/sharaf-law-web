import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2826] px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-[#A68D4F] mb-4">404</h1>
        <p className="text-2xl text-white mb-2">העמוד לא נמצא</p>
        <p className="text-gray-300 mb-8">ייתכן שהקישור שגוי או שהעמוד הוסר.</p>
        <a
          href="/"
          className="inline-block bg-[#A68D4F] hover:bg-[#8A7340] text-[#2A2826] px-8 py-3 rounded-lg font-bold transition-colors"
        >
          חזרה לעמוד הבית
        </a>
      </div>
    </div>
  );
};

export default NotFound;
