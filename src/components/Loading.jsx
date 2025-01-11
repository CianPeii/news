import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-sky-400" />
      <p className="mt-4 text-lg text-gray-600 dark:text-white animate-pulse">
        {t("loading")}{" "}
      </p>
    </div>
  );
}
export default Loading;
