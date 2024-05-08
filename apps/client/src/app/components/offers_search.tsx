"use client";
import { HTMLProps, useState } from "react";
import { FaSearch } from "react-icons/fa";

export interface OffersSearchProps extends HTMLProps<HTMLDivElement> {}
export default function OffersSearch({ ...props }: OffersSearchProps) {
  const [query, setQuery] = useState("");
  return (
    <div
      {...props}
      className={`${props.className} w-full flex items-center overflow-hidden rounded-md`}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none text-lg grow px-2 py-1 placeholder:max-ml:text-sm text-black"
        placeholder="Search for any product or service"
      ></input>
      <button className=" px-7 py-2.5 flex  shrink-0 justify-center items-center  text-white bg-black">
        <span className="sr-only">search</span>
        <FaSearch className="text-base"></FaSearch>
      </button>
    </div>
  );
}
