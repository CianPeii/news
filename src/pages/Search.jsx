import { useLocation } from "react-router-dom";
import { searchNews } from "../services/newsApi";
import { useEffect, useState } from "react";
import NewsItems from "../components/NewsItems";
import { useBookmarks } from "../hooks/useBookmarks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useTranslation } from "react-i18next";

function Search() {
  const { t } = useTranslation();
  const location = useLocation();
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { checkedItems, toggleBookmark } = useBookmarks();

  const keyword = location.state?.keyword || "";

  useEffect(() => {
    const fetchSearchNews = async () => {
      try {
        const response = await searchNews(keyword);
        setNewsData(response);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchNews();
  }, [keyword]);

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <>
      <div className="py-6 px-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-4">
          <div className="flex items-center space-x-1 ">
            <span className="text-slate-900 dark:text-white">
              {t("searchResults")}
            </span>
            <span className="text-blue-600 italic bg-blue-100 px-2 py-1 rounded-md">
              {`"${keyword} "`}
            </span>
            <span className="text-gray-500 text-base">
              {`${newsData.length || t("no")} ${t("matching")}`}
              {t("entries")}
            </span>
          </div>
        </h1>
      </div>
      {/* 新聞卡片 */}
      <div className="py-6 px-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
        {newsData.map((article) => {
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
