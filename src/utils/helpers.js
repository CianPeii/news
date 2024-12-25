// 時間轉換
export default function formatDate(dateString) {
  const date = new Date(dateString);
  const userLocale = navigator.language || "en-US";
  return date.toLocaleDateString(userLocale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
