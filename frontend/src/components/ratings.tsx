import { FaStarHalfStroke } from "react-icons/fa6";
import { RatingT } from "../types";


export const Ratings = ({ ratings }: { ratings: RatingT[] }) => {
  return (
    <div>
      <div className="flex items-center  gap-1">
        <h3 className="text-lg font-semibold ">Ratings</h3>
        <FaStarHalfStroke className="text-sm" />
      </div>

      <ul className="space-y-2">
        {ratings?.map((rating) => (
          <li
            key={rating.id}
            className="flex justify-between gap-1 items-center"
          >
            <span className="font-medium text-sm">{rating?.source}:</span>
            <span className="text-sm">{rating?.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};