import classNames from "classnames";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function Accordion({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col bg-white border border-neutral-300">
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="font-semibold tracking-wide w-full flex p-6 justify-between items-center">
        {data.title}

        <FaChevronDown className={classNames("transition-all duration-300", {
          "rotate-180" : open
        })} />
      </button>
      <div
        className={classNames(
          "text-zinc-700 text-sm max-h-0 px-6 overflow-hidden transition-all duration-300",
          {
            "px-6 pb-6 max-h-[300px]": open,
          }
        )}>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
