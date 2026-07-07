interface BoardPreviewProps {
  columns: [string, string, string];
  className?: string;
}

function BoardPreview({ columns, className }: BoardPreviewProps) {
  const cards = [
    [2, 1],
    [1, 2],
    [3, 0],
  ] as const;

  return (
    <div
      className={`bg-card ring-foreground/10 grid grid-cols-3 gap-2 rounded-xl p-3 ring-1 sm:gap-3 sm:p-4 ${className ?? ''}`}
      aria-hidden
    >
      {columns.map((title, columnIndex) => (
        <div
          key={title}
          className="bg-muted/60 flex min-w-0 flex-col gap-2 rounded-lg p-2 sm:p-2.5"
        >
          <p className="truncate text-[10px] font-medium sm:text-xs">{title}</p>
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: cards[columnIndex][0] }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-background ring-foreground/8 rounded-md p-2 ring-1"
              >
                <div className="bg-muted mb-1.5 h-1.5 w-3/4 rounded-full" />
                <div className="bg-muted/70 h-1 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { BoardPreview };
