export function DotGrid() {
  const rows = 6;
  const cols = 10;

  return (
    <div
      className="grid gap-2 opacity-70"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {Array.from({ length: rows * cols }).map((_, index) => (
        <span key={index} className="h-1.5 w-1.5 rounded-full bg-gold" />
      ))}
    </div>
  );
}
