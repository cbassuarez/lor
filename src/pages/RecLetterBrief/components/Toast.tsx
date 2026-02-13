export function Toast({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-none border border-neutral-600 bg-neutral-900 px-3 py-2 text-xs text-neutral-100">
      {message}
    </div>
  );
}
