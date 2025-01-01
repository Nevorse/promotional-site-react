import classNames from "classnames";
import { useState } from "react";

export default function CardComp({ type = 1, doc }) {

  return (
    <div>
      <div
        className={classNames(
          "flex flex-col shadow-md transition-all hover:scale-110 hover:z-10 hover:shadow-xl",
          {
            "w-[350px] gap-1 bg-black/5 rounded-md overflow-hidden": type === 1,
            "w-[350px] gap-2": type === 2,
          }
        )}
      >
        <div
          style={{ backgroundImage: `url(${doc.data && doc.data[0]})` }}
          className={classNames("w-full bg-no-repeat bg-center bg-cover", {
            "h-[240px]": type === 1,
            "h-[220px]": type === 2,
          })}
        />
        <h5 className="font-bold text-lg text-center text-[color:var(--color-primary)] mt-2">
          {doc?.title}
        </h5>

        {/* ?????????? */}
        <p className="text-[15px] px-4 text-center py-1 text-[color:var(--color-primary)] truncate">
          {doc?.content && doc?.content}
        </p>
      </div>
    </div>
  );
}
