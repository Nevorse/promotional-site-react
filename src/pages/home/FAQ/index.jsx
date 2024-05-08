import { _FAQuestions } from "../../../utils/consts";
import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <div className="w-full pt-16 pb-20 bg-black/5">
      <div className="flex flex-col items-center">
        <div className="text-gray-800 text-center text-3xl font-bold tracking-wider mb-4">
          FAQ
        </div>
        <div className=" w-36 h-px bg-slate-500 mb-8" />
      </div>

      <div className="flex flex-col mx-auto w-[90%] max-w-[1200px] gap-3">
        {_FAQuestions.map((data, index) => (
          <Accordion data={data} key={index} />
        ))}
      </div>
    </div>
  );
}
