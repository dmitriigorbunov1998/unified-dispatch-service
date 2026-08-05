import { useEffect, useRef } from 'react';

export function useLogAutoScroll(logsCount: number) {
  const logsContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logsCount === 0) return;

    const logsContent = logsContentRef.current;
    if (!logsContent) return;

    if (typeof logsContent.scrollTo === 'function') {
      logsContent.scrollTo({
        top: logsContent.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }

    logsContent.scrollTop = logsContent.scrollHeight;
  }, [logsCount]);

  return logsContentRef;
}
