'use client';

export function ScreenshotPlaceholder() {
  return (
    <>
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400 mt-8">
        Скриншот интерфейса
      </div>
      <p className="text-gray-500 text-sm mt-4">© {new Date().getFullYear()} TaskTracker Lab.</p>
    </>
  );
}
