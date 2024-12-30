import NewsItems from "./NewsItems";
import PropTypes from "prop-types";

function NewsCard({
  nation,
  flagUrl,
  articles,
  checkedItems,
  onBookmarkToggle,
}) {
  // 檢查是否有新聞數據
  const hasNews = articles?.length > 0;

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
          <h2 className="text-lg font-bold tracking-wide">{nation} News</h2>
        </div>
      </div>

      {/* 新聞網格 */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
        {hasNews ? (
          articles.map((article) =>
            article.author !== null ? (
              <NewsItems
                key={article.url}
                article={article}
                isBookmarked={checkedItems[article.url]}
                onBookmarkToggle={onBookmarkToggle}
              />
            ) : null
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
  // 國家名稱
  nation: PropTypes.string.isRequired,

  // 國旗圖片的 URL
  flagUrl: PropTypes.string.isRequired,

  // 新聞文章陣列
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
    })
  ),

  // 已加入書籤的項目物件
  checkedItems: PropTypes.objectOf(PropTypes.bool).isRequired,

  // 切換書籤的回調函數
  onBookmarkToggle: PropTypes.func.isRequired,
};

// 設定預設值
NewsCard.defaultProps = {
  articles: [], // 如果沒有傳入文章，預設為空陣列
};
export default NewsCard;
