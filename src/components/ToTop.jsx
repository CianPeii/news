import { ArrowUpToLine } from "lucide-react";
import { useState, useEffect } from "react";

function ToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg
                   hover:bg-blue-600 hover:shadow-xl
                   active:bg-blue-700 active:scale-95
                   transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="go to top"
      >
        <ArrowUpToLine className="w-6 h-6" />
      </button>
    </div>
  );
}

export default ToTop;
