import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Globe,
  Bookmark,
  X,
  Moon,
  Sun,
  Palette,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import us from "../assets/images/nation/us.png";
import tw from "../assets/images/nation/tw.png";

function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  // 切換深色模式
  const handleThemeToggle = () => {
    setIsDark(!isDark);
    if (!isDark) {
      // 切換到深色模式
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // 切換到淺色模式
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-slate-900 flex relative justify-between items-center px-6 py-4  shadow-md rounded-lg m-3 ">
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
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out
  ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsSidebarOpen(false);
          }
        }}
      >
        <div className="absolute inset-y-0 right-0 w-80 flex">
          {/* 側邊欄主體 */}
          <div
            className={`w-full bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {" "}
            {/*Menu */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {t("menu")}
              </h1>
              <button
                className="p-2 rounded-full 
                     bg-gray-50   dark:bg-slate-900  hover:bg-sky-500 group
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
                onClick={() => {
                  toggleLanguageMenu();
                }}
              >
                <Globe
                  className="w-5 h-5 text-gray-500 group-hover:text-sky-500 
                          transition-colors duration-200"
                />
                <span
                  className="text-lg text-gray-700 dark:text-white group-hover:text-gray-900
                          transition-colors duration-200"
                >
                  {t("language")}
                  {isLanguageMenuOpen ? (
                    <ChevronUp className="inline" size={18} />
                  ) : (
                    <ChevronDown className="inline" size={18} />
                  )}
                </span>
              </button>
              {/* 語言選單 */}
              {isLanguageMenuOpen && (
                <>
                  <button
                    className="flex items-center space-x-3 px-6 py-4 hover:bg-sky-50 
                  transition-colors duration-200 border-b border-gray-100 group"
                    onClick={() => changeLanguage("en")}
                  >
                    <div className="w-5">
                      <img className="w-full" src={us} alt="us" />
                    </div>
                    <span
                      className="text-lg text-gray-700 dark:text-white group-hover:text-gray-900
                          transition-colors duration-200"
                    >
                      English
                    </span>
                  </button>
                  <button
                    className="flex items-center space-x-3 px-6 py-4 hover:bg-sky-50 
                     transition-colors duration-200 border-b border-gray-100 group"
                    onClick={() => changeLanguage("zh")}
                  >
                    <div className="w-5">
                      <img className="w-full" src={tw} alt="tw" />
                    </div>
                    <span
                      className="text-lg text-gray-700 dark:text-white group-hover:text-gray-900
                          transition-colors duration-200"
                    >
                      繁體中文
                    </span>
                  </button>
                </>
              )}

              {/* 儲存新聞 */}
              <button
                className="flex items-center space-x-3 px-6 py-4 hover:bg-sky-50 
                           transition-colors duration-200 border-b border-gray-100 group"
                onClick={() => {
                  navigate("/bookmarks");
                }}
              >
                <Bookmark
                  className="w-5 h-5 text-gray-500 group-hover:text-sky-500
                             transition-colors duration-200"
                />
                <span
                  className="text-lg text-gray-700 dark:text-white group-hover:text-gray-900
                          transition-colors duration-200"
                >
                  {t("savedNews")}
                </span>
              </button>
              {/* 黑暗模式設置 */}
              <div
                className="flex items-center space-x-3 px-6 py-4 border-b border-gray-100
                        hover:bg-sky-50 transition-colors duration-200 group"
              >
                <Palette
                  className="w-5 h-5 text-gray-500 group-hover:text-sky-500 
                          transition-colors duration-200"
                />
                <span className="text-lg text-gray-700 dark:text-white  group-hover:text-gray-900">
                  {t("darkMode")}
                </span>
                <button
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full 
                       transition-colors duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
                       ${isDark ? "bg-gray-700 " : "bg-gray-200 "}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white 
                         shadow-md transition-transform duration-300 ease-in-out
                         ${isDark ? "translate-x-6" : "translate-x-1"}`}
                  >
                    <span className="flex h-full w-full items-center justify-center">
                      {isDark ? (
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
    </>
  );
}
export default Header;
