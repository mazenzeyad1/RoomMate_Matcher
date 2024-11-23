import React, { useState, useEffect } from "react";
import checkmark from "../../assets/checkmark.svg";
import close from "../../assets/close.svg";

export const Tag = ({
  text,
  onClick,
  value,
  state,
}: {
  text: string;
  value?: string;
  state?: boolean;
  onClick: (state: boolean, value?: string) => void;
}) => {
  const [clicked, setClicked] = useState(state ?? false);

  useEffect(() => {
    setClicked(state ?? false);
  }, [state]);

  return (
    <span
      className={`py-1 px-3 h-full gap-1 inline-flex justify-center rounded-full ${
        clicked
          ? "bg-primary text-white cursor-pointer transition duration-300 ease-in-out"
          : "bg-gray-200 text-gray-700 cursor-pointer transition duration-300 ease-in-out"
      } hover:bg-opacity-75`}
      onClick={() => {
        onClick?.(!clicked, value);
        setClicked((prev) => !prev);
      }}
    >
      {text}
      <img width="10" src={!clicked ? "" : close} />
    </span>
  );
};
