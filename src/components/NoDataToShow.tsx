interface NoDataToShowProps {
  message?: string;
  className?: string;
}

export function NoDataToShow({
  message = "No data to show",
  className = ""
}: NoDataToShowProps) {
  return (
    <div className={`flex justify-center items-center p-8 ${className}`}>
      <div className="text-center space-y-4 animate-fade-in relative">
        <div className="absolute -top-8 -left-8 text-4xl opacity-20 rotate-45">
          🌿
        </div>
        <div className="absolute -bottom-8 -right-8 text-4xl opacity-20 -rotate-45">
          🌱
        </div>

        <div className="bg-glass backdrop-blur-lg rounded-xl p-6 shadow-lg border border-glass-border">
          <p
            className="text-xl text-foreground font-medium"
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <span className="text-xl animate-bounce delay-100">🏺</span>
            <span className="text-xl animate-bounce delay-200">🌱</span>
            <span className="text-xl animate-bounce delay-300">🌿</span>
          </div>
        </div>
      </div>
    </div>
  );
}
