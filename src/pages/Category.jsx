import NewsItems from "../components/NewsItems";
import Loading from "../components/Loading";
import { getCategoryNews } from "../services/newsApi";
import { useBookmarks } from "../hooks/useBookmarks";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Globe,
  Briefcase,
  CircuitBoard,
  Film,
  Trophy,
  Microscope,
  Heart,
} from "lucide-react";

function Category() {
  let { category } = useParams();
  const { checkedItems, toggleBookmark } = useBookmarks();
  const { t } = useTranslation();

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

  // 載入中狀態處理
  if (newsData.loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="py-6 px-8 ">
        <div className="flex items-center gap-4 border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-3 ">
            {CategoryIcon && (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
                <CategoryIcon className="w-6 h-6 text-blue-600" />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold  dark:text-white  text-slate-900 dark:text-white ">
                {t(category)}
              </h1>
            </div>
          </div>
        </div>
        <div className=" py-6 px-8">
          {/* 新聞卡片 */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
            {newsData.articles.map((article) =>
              article.author !== null ? (
                <NewsItems
                  key={article.url}
                  article={article}
                  isBookmarked={checkedItems[article.url]?.isBookmarked}
                  onBookmarkToggle={() => toggleBookmark(article.url, article)}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
