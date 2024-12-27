import { Search } from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";

function Navbar() {
  const categoryTypes = [
    "general",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-3 bg-blue-400 shadow-sm rounded-lg mx-4 my-2">
        {/* 類別選單區域 */}
        <div className="flex space-x-6 overflow-x-auto">
          {categoryTypes.map((type) => (
            <NavLink
              key={type}
              to={`/${type}`}
              className={({ isActive }) => `
        px-4 py-2 text-white rounded-md transition-all duration-200 
        whitespace-nowrap font-medium text-base 
        hover:underline underline-offset-8 decoration-2 decoration-gray-100
        ${isActive ? "underline" : ""}
      `}
            >
              {type.toUpperCase()}
            </NavLink>
          ))}
        </div>

        {/* 搜尋區域 */}
        <div className="flex items-center bg-gray-100 rounded-full px-5 py-2 ml-4">
          <input
            className="bg-transparent outline-none placeholder-gray-400 w-48 text-sm"
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
          />
          <button
            onClick={() => console.log(inputValue)}
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

// {nations.map(({ id, nation }) => (
//   <div className="py-4 px-6" key={id}>
//     <div className="flex items-center gap-3">
//       <div className="h-6 w-1 bg-gradient-to-b from-pink-200 to-pink-600 rounded-full" />
//       {/* 國旗icon 國家標題 */}
//       <div className="flex items-center gap-2">
//         <div className="w-5">
//           <img className="w-full" src={id} alt="us" />
//         </div>
//         <h1 className="text-lg font-bold tracking-wide">
//           {nation} Headlines
//         </h1>
//       </div>
//     </div>
//     {/* 新聞小卡 */}

//     <div className="grid gap-x-8 gap-y-8 grid-cols-4 py-4 px-6 ">
//       {newsData.articles.map(
//         ({ urlToImage, title, publishedAt }, index) => (
//           <div className="relative bg-gray-100 " key={index}>
//             {/* 收藏 分享 icon */}
//             <div className="absolute top-0 right-0 flex justify-end space-x-3 px-3 py-2">
//               <div
//                 className="bg-[#F5F5F5] rounded-full p-1 hover:bg-[#8E8E93]"
//                 onClick={() => toggleBookmark(index)}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30"
//                   height="30"
//                   viewBox="0 0 24 24"
//                   fill={checkedItems[index] ? "#FF4D4F" : "none"}
//                   stroke={
//                     checkedItems[index] ? "#FF4D4F" : "currentColor"
//                   }
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-bookmark"
//                 >
//                   <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
//                 </svg>
//               </div>

//               <div className="bg-[#F5F5F5] rounded-full p-1 hover:bg-[#8E8E93]">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30"
//                   height="30"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-share-2"
//                 >
//                   <circle cx="18" cy="5" r="3" />
//                   <circle cx="6" cy="12" r="3" />
//                   <circle cx="18" cy="19" r="3" />
//                   <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
//                   <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
//                 </svg>
//               </div>
//             </div>
//             <div className="h-60">
//               <img
//                 className="w-full h-full object-cover object-left-bottom"
//                 src={urlToImage}
//                 alt="urlToImage"
//               />
//             </div>
//             <div className="px-4 space-y-2 py-3">
//               <h1 className="text-2xl truncate">{title}</h1>
//               <p className="text-base text-gray-500 ">
//                 {formatDate(publishedAt)}
//               </p>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   </div>
// ))}
