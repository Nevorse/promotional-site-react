import { useSelector } from "react-redux";
import CardComp from "../../../components/CardComp";
import { Link } from "react-router-dom";

export default function HomeProjects() {
  const { projects } = useSelector((state) => state.collections);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-16 pb-10">
      <div className="flex flex-col items-center">
        <div className="text-[color:var(--color-primary)] text-center text-4xl font-bold tracking-wider mb-4">
          Projelerimiz
        </div>
        <div className=" w-36 h-px bg-[color:var(--color-primary)] mb-10" />
      </div>

      <div className="flex w-[92.5%] gap-x-4 gap-y-20 justify-center flex-wrap">
        {projects?.map(
          (doc, index) =>
            index < 6 && (
              // <Link key={doc.id} to={`/projects/${doc?.id}`}>
                <CardComp key={doc.id} doc={doc} folder={true} />
              // </Link>
            )
        )}
      </div>
    </div>
  );
}
