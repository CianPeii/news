import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import NewsItems from "../components/NewsItems";
import { useBookmarks } from "../hooks/useBookmarks";

const Bookmarks = () => {
  const { checkedItems, toggleBookmark, hasBookmarks } = useBookmarks();

  const renderContent = () => {
    if (hasBookmarks) {
      return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
          {Object.entries(checkedItems).map(([url, bookmarkData]) => {
            const { article } = bookmarkData;

            if (!article || !article.url) return null; // 確保數據完整性

            return (
              <NewsItems
                key={url}
                article={article}
                isBookmarked={!!checkedItems[url]?.isBookmarked}
                onBookmarkToggle={() => toggleBookmark(url, article)}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-gray-500 mb-6">
          Articles you bookmark will appear here
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-sky-500 text-white
                    rounded-full hover:bg-sky-600 transition-colors duration-200"
        >
          Discover Articles
        </Link>
      </div>
    );
  };

  // 3. 主要的渲染結構
  return (
    <>
      <Header />
      <Navbar />
      {renderContent()}
    </>
  );
};

export default Bookmarks;
