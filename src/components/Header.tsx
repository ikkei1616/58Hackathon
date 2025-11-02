import React from "react";
import BackButton from "./BackButton";

type Props = {
  title: string;
}

const Header = ({title}:Props) => {
  return (
    <div className="fixed left-0 right-0 grid items-center grid-cols-[1fr_auto_1fr] pt-4 px-4">
      <BackButton />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
