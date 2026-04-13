import type { FC } from "react";
import { useTranslations } from 'next-intl';

const Loading: FC = () => {
  const t = useTranslations('loading');

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-floating-leaf-${i % 3} text-accent/20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 100 100">
              <path
                d="M 50 20 C 50 20 20 40 50 80 C 80 40 50 20 50 20"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="text-accent relative z-10"
        aria-label={t('ariaLabel')}
        role="status"
      >
        <path
          d="M 50 90 Q 50 50 50 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="animate-grow-stem"
        />

        <path
          d="M 50 60 C 50 60 30 50 20 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="animate-grow-leaf-left"
        />
        <path
          d="M 50 60 C 50 60 70 50 80 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="animate-grow-leaf-right"
        />

        <path
          d="M 50 40 C 50 40 35 30 30 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="animate-grow-leaf-top-left"
        />
        <path
          d="M 50 40 C 50 40 65 30 70 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="animate-grow-leaf-top-right"
        />
      </svg>
    </div>
  );
};

export default Loading;
