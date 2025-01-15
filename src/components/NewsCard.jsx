import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function NewsCard({
  nation,
  flagUrl,
  articles = [],
  checkedItems,
  onBookmarkToggle,
}) {
  const { t } = useTranslation();
  // 檢查是否有新聞數據
  const hasNews = articles.length > 0;
  return (
    <div className="py-4 px-6">
      {/* 國家標題區塊 */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 bg-gradient-to-b from-pink-200 to-pink-600 rounded-full" />
        <div className="flex items-center gap-2">
          <div className="w-5">
            <img
              className="w-full"
              src={flagUrl}
              alt={`${nation} flag`}
              loading="lazy"
            />
          </div>
          <h2 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white">
            {t(nation)} {t("news")}
          </h2>
        </div>
      </div>

      {/* 新聞網格 */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
        {hasNews ? (
          articles.map(
            (article) =>
              article.author && (
                <NewsItems
                  key={article.url}
                  article={article}
                  isBookmarked={checkedItems[article.url]?.isBookmarked}
                  onBookmarkToggle={() =>
                    onBookmarkToggle(article.url, article)
                  }
                />
              )
          )
        ) : (
          <p className="text-gray-500">No news available for {nation}</p>
        )}
      </div>
    </div>
  );
}

// 定義 PropTypes
NewsCard.propTypes = {
  nation: PropTypes.string.isRequired,
  flagUrl: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
    })
  ),
  checkedItems: PropTypes.object.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
};

export default NewsCard;
