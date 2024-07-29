import { useSelector } from "react-redux";
import CardComp from "../../../components/CardComp";
import { Link } from "react-router-dom";

export default function HomeProjects() {
  const { projects } = useSelector((state) => state.collections);

  return (
    <div className="w-full pt-16 pb-10">
      <div className="flex flex-col items-center">
        <div className="text-gray-800 text-center text-3xl font-bold tracking-wider mb-4">
          Projelerimiz
        </div>
        <div className=" w-36 h-px bg-slate-500 mb-8" />
      </div>

      <div className="flex gap-x-16 gap-y-10 w-full justify-center flex-wrap">
        {projects?.map(
          (doc, index) =>
            index < 6 && (
              <Link key={doc.id} to={`/projects/${doc?.index + "_" + doc?.title}`}>
                <CardComp doc={doc} />
              </Link>
            )
        )}
      </div>
    </div>
  );
}
