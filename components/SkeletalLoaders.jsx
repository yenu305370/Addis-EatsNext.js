export function DishCardSkeleton() {
  return (
    <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white p-5 animate-pulse">
      <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
      <div className="h-10 bg-slate-200 rounded-xl w-full" />
    </div>
  );
}

export function EmptyState({ title, description, actionText, onAction }) {
  return (
    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{description}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}