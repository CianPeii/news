function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-sky-400" />
      <p className="mt-4 text-lg text-gray-600 dark:text-white animate-pulse">
        Loading...
      </p>
    </div>
  );
}
export default Loading;
