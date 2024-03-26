// hook personalizado para detectar click fuera de un elemento
import { useEffect } from 'react';

export function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback]);
}