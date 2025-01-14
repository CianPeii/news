import formatDate from "../utils/formatDate";
import PropTypes from "prop-types";
import placeholderImg from "../assets/images/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

function NewsItems({ article, isBookmarked, onBookmarkToggle }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCardClick = () => {
    navigate(`/article/${encodeURIComponent(article.title)}`, {
      state: { article },
    });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="relative bg-gray-100 dark:bg-slate-900 cursor-pointer">
      {/* 書籤按鈕 */}

      <div className="absolute top-0 right-0 flex justify-end space-x-3 px-3 py-2 ">
        <button
          className="bg-[#F5F5F5] rounded-full p-1 hover:bg-[#8E8E93]"
          onClick={() => onBookmarkToggle(article.url)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill={isBookmarked ? "#FF4D4F" : "none"}
            stroke={isBookmarked ? "#FF4D4F" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>

        {/* 分享按鈕 */}
        <CopyToClipboard text={article.url} onCopy={handleCopy}>
          <button
            className="bg-[#F5F5F5] rounded-full p-1 hover:bg-[#8E8E93]"
            onClick={() => {
              handleCopy();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
          </button>
        </CopyToClipboard>
      </div>

      <div onClick={handleCardClick}>
        {/* 新聞圖片 */}
        <div className="h-60">
          <img
            className="w-full h-full object-cover object-center"
            src={article.urlToImage || placeholderImg}
            alt={article.title}
            onError={(e) => {
              e.target.src = placeholderImg;
            }}
          />
        </div>

        {/* 新聞標題和日期 */}
        <div className="px-4 space-y-2 py-3">
          <h3 className="text-xl font-semibold truncate text-slate-900 dark:text-white">
            {article.title}
          </h3>
          <p className="text-base text-slate-500 dark:text-slate-400">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
      {copied && (
        <p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
     bg-black/60 text-white px-3 py-1 rounded text-sm"
        >
          {t("linkHasBeenCopied!")}
        </p>
      )}
    </div>
  );
}

NewsItems.propTypes = {
  article: PropTypes.shape({
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
  }).isRequired,

  isBookmarked: PropTypes.bool,

  onBookmarkToggle: PropTypes.func.isRequired,
};

export default NewsItems;
