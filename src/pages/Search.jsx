import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function Search() {
  let { keyword } = useParams();

  return (
    <>
      <Header />
      <Navbar />
      <div>
        <h1 className="flex items-center gap-2">
          Search
          <span className="text-blue-500 italic">{keyword}</span>
          results:
        </h1>
        <div className="bg-gray-200 w-20 h-20">新聞卡</div>
      </div>
    </>
  );
}
export default Search;
