import Home from "./pages/Home";
import Category from "./pages/Category";
import ArticleDetail from "./pages/ArticleDetail";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";
import {} from "react-router";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router";
import PropTypes from "prop-types";

const validCategories = [
  "general",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];
function App() {
  const root = document.getElementById("root");

  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:category"
            element={<CategoryRoute validCategories={validCategories} />}
          />
          <Route path="/article/:title" element={<ArticleDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          {/* 未定義路由，導向首頁 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  // 檢查新聞類別
  function CategoryRoute({ validCategories }) {
    const { category } = useParams();

    CategoryRoute.propTypes = {
      validCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    // 檢查類別是否在有效列表中
    if (!validCategories.includes(category)) {
      return <Navigate to="/" replace />;
    }

    return <Category />;
  }
  return;
}

export default App;
