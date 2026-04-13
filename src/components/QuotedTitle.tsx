interface QuotedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const QuotedTitle = ({ children, className = '' }: QuotedTitleProps) => {
  return (
    <div className="relative py-8 px-4">
      <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-accent" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-accent" />

      <h2 className={`text-4xl font-bold text-center ${className}`}>
        {children}
      </h2>
    </div>
  );
};
