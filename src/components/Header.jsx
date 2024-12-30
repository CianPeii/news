import logo from "../assets/images/logo.png";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Globe, Bookmark, X, Moon, Sun, Palette } from "lucide-react";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <>
      <header className="flex relative justify-between items-center px-6 py-4  shadow-md rounded-lg m-3">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img
              className="w-12 hover:scale-105 transition-transform duration-200"
              src={logo}
              alt="logo"
            />
            <h1 className="font-sans text-2xl font-semibold text-blue-400">
              World News
            </h1>
          </div>
        </Link>
        <Menu
          onClick={() => setIsSidebarOpen(true)}
          size={30}
          className="text-gray-400 hover:text-sky-500 transition-colors duration-200 cursor-pointer"
        />
      </header>
      {isSidebarOpen ? (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSidebarOpen(false);
            }
          }}
        >
          <div className="absolute inset-y-0 right-0 w-80 flex">
            {/* 側邊欄主體 */}
            <div className="w-full bg-white shadow-2xl">
              {/*Menu */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h1 className="text-2xl font-semibold text-gray-800">Menu</h1>
                <button
                  className="p-2 rounded-full 
                     bg-gray-50 hover:bg-sky-500 group
                     transform transition-all duration-300 ease-in-out
                     hover:rotate-90 hover:scale-110
                     active:scale-95
                     shadow-sm hover:shadow-md"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X
                    className="w-5 h-5 text-gray-600 group-hover:text-white
                       transition-colors duration-300"
                  />
                </button>
              </div>

              {/* 選項列表區域 */}
              <div className="flex flex-col">
                {/* 語言選擇 */}
                <button
                  className="flex items-center space-x-3 px-6 py-4 hover:bg-sky-50 
                           transition-colors duration-200 border-b border-gray-100 group"
                >
                  <Globe
                    className="w-5 h-5 text-gray-500 group-hover:text-sky-500 
                          transition-colors duration-200"
                  />
                  <span
                    className="text-lg text-gray-700 group-hover:text-gray-900
                          transition-colors duration-200"
                  >
                    Language
                  </span>
                </button>

                {/* 儲存新聞 */}
                <button
                  className="flex items-center space-x-3 px-6 py-4 hover:bg-sky-50 
                           transition-colors duration-200 border-b border-gray-100 group"
                >
                  <Bookmark
                    className="w-5 h-5 text-gray-500 group-hover:text-sky-500
                             transition-colors duration-200"
                  />
                  <span
                    className="text-lg text-gray-700 group-hover:text-gray-900
                          transition-colors duration-200"
                  >
                    Saved News
                  </span>
                </button>

                {/* 視覺偏好設置 */}
                <div
                  className="flex items-center space-x-3 px-6 py-4 border-b border-gray-100
                        hover:bg-sky-50 transition-colors duration-200 group"
                >
                  <Palette
                    className="w-5 h-5 text-gray-500 group-hover:text-sky-500 
                          transition-colors duration-200"
                  />
                  <span className="text-lg text-gray-700">
                    Visual Preferences
                  </span>
                  <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full 
                       transition-colors duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
                       ${isEnabled ? "bg-gray-700" : "bg-gray-200"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white 
                         shadow-md transition-transform duration-300 ease-in-out
                         ${isEnabled ? "translate-x-6" : "translate-x-1"}`}
                    >
                      <span className="flex h-full w-full items-center justify-center">
                        {isEnabled ? (
                          <Moon className="h-3 w-3 text-gray-600" />
                        ) : (
                          <Sun className="h-3 w-3 text-gray-600" />
                        )}
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default Header;
