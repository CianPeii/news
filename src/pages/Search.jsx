import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { searchNews } from "../services/newsApi";

function Search() {
  const location = useLocation();
  const keyword = location.state?.keyword || "";

  return (
    <>
      <Header />
      <Navbar />
      <div className="py-6 px-8">
        <h1 className="flex items-center gap-2">
          CopySearch Results for
          <span className="text-blue-500 italic">{keyword}</span>
          {"這裡放共幾筆變數"} matching entries
        </h1>
      </div>
      {/* 新聞卡片 */}
      <div className="py-6 px-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
        新聞卡片
      </div>
    </>
  );
}
export default Search;
