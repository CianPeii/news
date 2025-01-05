import { useState } from "react";

export function useBookmarks() {
  // 初始化書籤狀態
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem("bookmarks");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage:", error);
      return {};
    }
  });

  // 切換書籤狀態
  const toggleBookmark = (articleUrl, article) => {
    setCheckedItems((prev) => {
      const newState = { ...prev };

      if (prev[articleUrl]) {
        // 如果已收藏，刪除該屬性
        delete newState[articleUrl];
      } else {
        // 添加到書籤
        newState[articleUrl] = {
          article,
          isBookmarked: true,
        };
      }

      try {
        localStorage.setItem("bookmarks", JSON.stringify(newState));
      } catch (error) {
        console.error("Failed to save bookmarks to localStorage:", error);
      }

      return newState;
    });
  };

  // 判斷是否有書籤
  const hasBookmarks = Object.keys(checkedItems).length > 0;

  return { checkedItems, toggleBookmark, hasBookmarks };
}
