import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  Globe,
  Briefcase,
  CircuitBoard,
  Film,
  Trophy,
  Microscope,
  Heart,
} from "lucide-react";
import NewsItems from "../components/NewsItems";
import { getCategoryNews } from "../services/newsApi";
import { useEffect, useState } from "react";

function Category() {
  // 需要狀態管理的部分
  // 書籤管理
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : {};
  });

  // 書籤切換函數
  const toggleBookmark = (articleId) => {
    setCheckedItems((prev) => {
      const newState = {
        ...prev,
        [articleId]: !prev[articleId],
      };
      localStorage.setItem("bookmarks", JSON.stringify(newState));
      return newState;
    });
  };
  // ----
  let { category } = useParams();

  const categories = [
    { name: "general", Icon: Globe },
    { name: "business", Icon: Briefcase },
    { name: "technology", Icon: CircuitBoard },
    { name: "entertainment", Icon: Film },
    { name: "sports", Icon: Trophy },
    { name: "science", Icon: Microscope },
    { name: "health", Icon: Heart },
  ];
  const CategoryIcon = categories.find((item) => item.name === category)?.Icon;

  const [newsData, setNewsData] = useState({
    loading: true,
    error: null,
    articles: [],
  });

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const response = await getCategoryNews(category);

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

    fetchCategoryNews();
  }, [category]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="py-6 px-8 ">
        <div className="flex items-center gap-4 border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-3">
            {CategoryIcon && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <CategoryIcon className="w-6 h-6 text-blue-600" />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </h1>
            </div>
          </div>
        </div>
        <div className=" py-6 px-8">
          {/* 新聞卡片 */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
            {newsData.articles.map((article) => {
              return (
                <NewsItems
                  key={article.url}
                  article={article}
                  isBookmarked={checkedItems[article.url]}
                  onBookmarkToggle={() => toggleBookmark(article.url)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
