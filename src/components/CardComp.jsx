import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export default function CardComp({ type = 1, doc, folder }) {
  const navigate = useNavigate();

  const getNavi = () => {
    if (folder) navigate(`/projects/${doc?.id}`);
    else navigate(`${doc?.index + "_" + doc?.title}`);
  };

  return (
    <div className="flex flex-col gap-3 2xl:w-[450px] w-[350px]">
      <div
        onClick={getNavi}
        style={{ backgroundImage: `url(${doc?.data && doc?.data[0]})` }}
        className="bg-no-repeat bg-center bg-cover cursor-pointer
         2xl:h-[380px] h-[300px]"
      />
      <div className="text-2xl my-l overflow-hidden text-[color:var(--color-primary)]">
        <h1 className="truncate cursor-pointer underline underline-offset-4 decoration-[color:var(--theme-tertiary)] decoration-1" onClick={getNavi}>{doc?.title}</h1>
      </div>
    </div>
  );
}

// xl:w-[500px] xl:h-[350px] lg:w-[380px] lg:h-[290px] w-[350px] h-[240px]

//  <div>
//   <div
//     className={classNames(
//       "flex flex-col shadow-md transition-all hover:scale-110 hover:z-10 hover:shadow-xl",
//       {
//         "w-[350px] gap-1 bg-black/5 rounded-md overflow-hidden": type === 1,
//         "w-[350px] gap-2": type === 2,
//       }
//     )}
//   >
//     <div
//       style={{ backgroundImage: `url(${doc.data && doc.data[0]})` }}
//       className={classNames("w-full bg-no-repeat bg-center bg-cover", {
//         "h-[240px]": type === 1,
//         "h-[220px]": type === 2,
//       })}
//     />
//     <h5 className="font-bold text-lg text-center text-[color:var(--color-primary)] mt-2">
//       {doc?.title}
//     </h5>

//     <p className="text-[15px] px-4 text-center py-1 text-[color:var(--color-primary)] truncate">
//       {/* {doc?.content && doc?.content} */}
//     </p>
//   </div>
// </div>
