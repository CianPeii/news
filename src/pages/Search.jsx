import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { searchNews } from "../services/newsApi";
import { useEffect, useState } from "react";
import NewsItems from "../components/NewsItems";
import { useBookmarks } from "../hooks/useBookmarks";

function Search() {
  const { checkedItems, toggleBookmark } = useBookmarks();

  const location = useLocation();
  const keyword = location.state?.keyword || "";
  const [newsData, setNewsData] = useState({
    loading: true,
    error: null,
    articles: [],
  });

  useEffect(() => {
    const fetchSearchNews = async () => {
      try {
        const response = await searchNews(keyword);
        setNewsData({
          loading: false,
          error: null,
          articles: response,
        });
      } catch (error) {
        setNewsData({
          loading: false,
          error: error.message,
          articles: [],
        });
      }
    };
    fetchSearchNews();
  }, [keyword]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="py-6 px-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-4">
          <div className="flex items-center space-x-1 ">
            <span>Search Results for</span>
            <span className="text-blue-600 italic bg-blue-100 px-2 py-1 rounded-md">
              {`"${keyword} "`}
            </span>
            <span className="text-gray-500 text-base">
              {newsData.articles.length === 0
                ? "No matching"
                : `${newsData.articles.length} matching`}
              entries
            </span>
          </div>
        </h1>
      </div>
      {/* 新聞卡片 */}
      <div className="py-6 px-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
        {newsData.articles.map((article) => {
          return (
            <NewsItems
              key={article.url}
              article={article}
              isBookmarked={checkedItems[article.url]?.isBookmarked}
              onBookmarkToggle={() => toggleBookmark(article.url, article)}
            />
          );
        })}
      </div>
    </>
  );
}
export default Search;
