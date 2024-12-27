import formatDate from "../utils/helpers";
import PropTypes from "prop-types";
import placeholderImg from "../assets/images/placeholder.jpg";
import { useNavigate } from "react-router-dom";

function NewsItems({ article, isBookmarked, onBookmarkToggle }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${encodeURIComponent(article.title)}`, {
      state: { article },
    });
  };

  return (
    <div className="relative bg-gray-100">
      {/* 書籤和分享按鈕 */}
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

        <button className="bg-[#F5F5F5] rounded-full p-1 hover:bg-[#8E8E93]">
          {/* 分享圖標 */}
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
          <h3 className="text-xl font-semibold truncate">{article.title}</h3>
          <p className="text-base text-gray-500">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
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

  isBookmarked: PropTypes.bool.isRequired,

  onBookmarkToggle: PropTypes.func.isRequired,
};

export default NewsItems;
