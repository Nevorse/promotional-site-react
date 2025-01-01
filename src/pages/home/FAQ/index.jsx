import { _FAQuestions } from "../../../utils/consts";
import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <div className="w-full pt-16 pb-20 bg-[color:var(--theme-secondary)]">
      <div className="flex flex-col items-center">
        <div className="text-[color:var(--color-primary)] text-center text-3xl font-bold tracking-wider mb-4">
          Sık Sorulan Sorular
        </div>
        <div className=" w-36 h-px bg-[color:var(--color-primary)] mb-8" />
      </div>

      <div className="flex flex-col mx-auto w-[90%] max-w-[1200px] gap-3">
        {_FAQuestions.map((data, index) => (
          <Accordion data={data} key={index} />
        ))}
      </div>
    </div>
  );
}
