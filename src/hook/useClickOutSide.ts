import React, { useState, useEffect } from "react";

interface Props {
  innerRef: React.RefObject<HTMLElement>;
}

export const useClickOutSide = ({ innerRef }: Props) => {
  const [isShow, setIsShow] = useState<Boolean>(false);

  useEffect(() => {
    document.addEventListener("click", ({ target }) => {
      if (!innerRef.current?.contains(target as Node)) {
        setIsShow(false);
      }
    });
    return () => {
      document.removeEventListener("click", ({ target }) => {
        if (!innerRef.current?.contains(target as Node)) {
          setIsShow(false);
        }
      });
    };
  }, []);

  return { isShow, setIsShow };
};
