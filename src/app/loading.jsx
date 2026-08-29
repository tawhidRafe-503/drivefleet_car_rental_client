export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-400" />
        <p className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Loading DriveFleet...</p>
      </div>
    </div>
  );
}
