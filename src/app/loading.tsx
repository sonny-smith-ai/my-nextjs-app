export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 animate-pulse">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 gap-5">
        <div className="h-7 w-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-14 w-72 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-6 w-96 max-w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex gap-3 mt-2">
          <div className="h-10 w-32 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-10 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="mx-auto max-w-3xl px-6 pb-24 space-y-12">
        <div className="space-y-3">
          <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-5 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
