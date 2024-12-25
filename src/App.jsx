import Home from "./pages/Home";
import NewsCategory from "./pages/NewsCategory";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  const root = document.getElementById("root");
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<NewsCategory />} />
      </Routes>
    </BrowserRouter>
  );
  <Route></Route>;
  return;
}

export default App;
