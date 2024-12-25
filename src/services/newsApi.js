import axios from "axios";

const API_KEY = "9d1276ca6b2d415e98f754e7b3f3ec31";
// "4b20f9e738f5452a99c1710935e7b294";
const BASE_URL = "https://newsapi.org/v2";

const newsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
  },
});

//取得us頭條
export const getTopHeadlines = async () => {
  try {
    const response = await newsApi.get("/top-headlines", {
      params: {
        country: "us", // 預設使用美國新聞
        pageSize: 1, // 限制回傳數量
      },
    });
    return response.data;
  } catch (error) {
    console.error("取得頭條新聞時發生錯誤:", error);
    throw error;
  }
};

// 取得各國新聞
export const getCountryNews = async (countryName) => {
  try {
    const response = await newsApi.get(`/everything`, {
      params: {
        q: countryName,
        language: "en",
        sortBy: "publishedAt", // 依發布時間排序
        pageSize: 8,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error(`無法取得 ${countryName} 的新聞:`, error);
    return [];
  }
};

export default newsApi;