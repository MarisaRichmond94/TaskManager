declare global {
  interface BaseProps {
    className?: string,
    [key: string]: unknown,
  };

  type OrNull<T> = T | null;
};

export {};
