import Home from "./pages/Home";
import NewsCategory from "./pages/NewsCategory";
import ArticleDetail from "./pages/ArticleDetail";
import Search from "./pages/Search";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const root = document.getElementById("root");
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<NewsCategory />} />
        <Route path="/article/:title" element={<ArticleDetail />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
  <Route></Route>;
  return;
}

export default App;
