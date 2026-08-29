export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-1">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
    </div>
  );
}