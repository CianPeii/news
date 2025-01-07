import { useEffect, useState } from "react";
import { getTopHeadlines, searchNews } from "../services/newsApi";
import Loading from "../components/Loading";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";

// 導入國家圖標
import us from "../assets/images/nation/us.png";
import ch from "../assets/images/nation/ch.png";
import de from "../assets/images/nation/de.png";
import tw from "../assets/images/nation/tw.png";
import jp from "../assets/images/nation/jp.png";

// 國家設定
const nations = [
  { id: "us", nation: "USA", flagUrl: us },
  { id: "ch", nation: "Switzerland", flagUrl: ch },
  { id: "de", nation: "Germany", flagUrl: de },
  { id: "tw", nation: "Taiwan", flagUrl: tw },
  { id: "jp", nation: "Japan", flagUrl: jp },
];

function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [countryLoading, setCountryLoading] = useState(true);

  const [newsData, setNewsData] = useState({
    loading: true,
    error: null,
    articles: [],
  });
  const [countryNewsData, setCountryNewsData] = useState({});

  // 取得頭條新聞
  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        const response = await getTopHeadlines();
        setNewsData({
          loading: false,
          error: null,
          articles: response.articles,
        });
      } catch (error) {
        setNewsData({
          loading: false,
          error: error.message,
          articles: [],
        });
      }
    };

    fetchTopHeadlines();
  }, []);

  // 點擊頭條新聞 進入單一新聞頁面
  const navigate = useNavigate();
  const handleCardClick = () => {
    const { articles } = newsData;
    navigate(`/article/${encodeURIComponent(articles[0].title)}`, {
      state: { article: articles[0] },
    });
  };

  // 取得各國新聞
  useEffect(() => {
    const fetchAllCountryNews = async () => {
      setCountryLoading(true);
      try {
        const newsPromises = nations.map(async ({ nation }) => {
          const articles = await searchNews(nation);
          return { nation, articles };
        });

        const results = await Promise.all(newsPromises);
        const newsObject = results.reduce((acc, { nation, articles }) => {
          acc[nation] = articles;
          return acc;
        }, {});
        setCountryNewsData(newsObject);
      } catch (error) {
        console.error("取得各國新聞時發生錯誤:", error);
      } finally {
        setCountryLoading(false);
      }
    };

    fetchAllCountryNews();
  }, []);

  // 書籤功能
  const { checkedItems, toggleBookmark } = useBookmarks();

  // 載入中狀態處理
  if (newsData.loading || countryLoading) {
    return <Loading />;
  }

  // 錯誤狀態處理
  if (newsData.error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {newsData.error}
      </div>
    );
  }

  // 確保有資料才渲染
  if (!newsData.articles?.length) {
    return <div>No news available</div>;
  }

  return (
    <>
      {/* 主要頭條區 */}
      <div>
        <div className="flex items-center gap-3 py-4 px-6">
          <div className="h-6 w-1 bg-gradient-to-b from-red-400 to-red-600 rounded-full" />
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative group-hover:scale-110 transition-transform duration-300"
            >
              <path
                d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
                fill="red"
              />
            </svg>
            <h1 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white">
              TOP HEADLINES
            </h1>
          </div>
        </div>

        {/* 頭條新聞展示 */}
        <div className="flex justify-center ">
          <div
            className="relative w-5/6 sm:w-3/5  h-[300px] md:h-[450px] 2xl:h-[600px] overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
          >
            <img
              src={newsData.articles[0].urlToImage}
              alt="urlToImage"
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl font-bold text-white truncate">
                  {newsData.articles[0].title}
                </h1>
                <div>
                  <h2
                    className={`text-xl text-gray-400 line-clamp-2 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {newsData.articles[0].description}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 各國新聞區域 */}
      {nations.map(({ id, nation, flagUrl }) => (
        <NewsCard
          key={id}
          nation={nation}
          flagUrl={flagUrl}
          articles={countryNewsData[nation]}
          checkedItems={checkedItems}
          onBookmarkToggle={toggleBookmark}
        />
      ))}
    </>
  );
}

export default Home;
