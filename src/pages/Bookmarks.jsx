import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import NewsItems from "../components/NewsItems";
import { useBookmarks } from "../hooks/useBookmarks";
import { useTranslation } from "react-i18next";

const Bookmarks = () => {
  const { t } = useTranslation();

  const { checkedItems, toggleBookmark, hasBookmarks } = useBookmarks();

  const renderContent = () => {
    if (hasBookmarks) {
      return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-6">
          {Object.entries(checkedItems).map(([url, bookmarkData]) => {
            const { article } = bookmarkData;

            if (!article || !article.url) return null;

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
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          {t("noBookmarksYet")}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          {t("articlesYouBookmarkWillAppearHere")}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-sky-500 text-white
                    rounded-full hover:bg-sky-600 transition-colors duration-200"
        >
          {t("discoverArticles")}
        </Link>
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default Bookmarks;
