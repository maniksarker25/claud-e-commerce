export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
        <p className="text-stone-400 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
