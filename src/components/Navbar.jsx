import { Search } from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  // 搜尋事件
  const handleSearch = () => {
    if (inputValue.trim() === "") {
      return;
    }

    navigate("/search", {
      state: {
        keyword: inputValue,
      },
    });
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="flex flex-col sm:flex-row justify-between items-center px-6 py-3 bg-blue-400 shadow-sm rounded-lg mx-4 my-2 ">
        {/* 類別選單區域 */}
        <div className="xl:flex grid-cols-1 grid gap-3  lg:grid-cols-3 sm:grid-cols-2  ">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/category/${category}`}
              className={({ isActive }) => `
        px-4 py-2 text-white rounded-md transition-all duration-200 
        whitespace-nowrap font-medium text-base 
        hover:underline underline-offset-8 decoration-2 decoration-gray-100
        ${isActive ? "underline" : ""}
      `}
            >
              {category.toUpperCase()}
            </NavLink>
          ))}
        </div>

        {/* 搜尋區域 */}
        <div className="flex items-center bg-gray-100 rounded-full px-5 py-2 ml-4">
          <input
            className="bg-transparent outline-none placeholder-gray-400 w-48 text-sm"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <Search size={20} className="text-gray-500" />
          </button>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
