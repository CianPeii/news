import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import formatDate from "../utils/formatDate";
import { Clock2, UserPen } from "lucide-react";

function ArticleDetail() {
  const { state } = useLocation();
  const { title } = useParams();
  const article = state?.article;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <>
      <Header />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 文章圖片 */}
        <div className="aspect-video mb-8">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* 文章內容 */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          <div className="flex   flex-col space-y-3 text-gray-600">
            <div className="flex space-x-1 items-center">
              <Clock2 />
              <time>{formatDate(article.publishedAt)}</time>
            </div>

            {article.author && (
              <div className="flex space-x-1 items-center text-gray-600">
                <UserPen />
                <span>{article.author}</span>
              </div>
            )}
          </div>

          <p className="text-xl text-gray-700 leading-relaxed">
            {article.description}
          </p>

          <div className="prose prose-lg max-w-none">{article.content}</div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 mt-8 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>Read full article on </span>
            <span className="font-bold">{article.source.name}</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

export default ArticleDetail;
