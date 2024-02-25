import { Link } from "react-router-dom";

type SearchResultInfoProps = {
  city: string;
  total: number;
};
export default function SearchResultInfo({
  city,
  total,
}: SearchResultInfoProps) {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span >
        {total} Restaurats found in {city}
        <Link
          to={"/"}
          className="text-sm font-semibold ml-2 whitespace-nowrap underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
      insert sort dropdown here
    </div>
  );
}
