import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useWallet } from "../hooks/useWallet";
import { monthNames } from "../utils/date";

export const MonthNavigation = (): JSX.Element => {
  const { month, handlePreviusMonth, handleNextMonth } = useWallet()
  

  return (
    <div className="flex justify-between my-4">
      <button onClick={() => handlePreviusMonth()}>
        <ChevronLeftIcon className="h-8" />
      </button>
      <span className="text-lg">{monthNames[month - 1]}</span>
      <button
        onClick={() => {
          handleNextMonth();
        }}
      >
        <ChevronRightIcon className="h-8" />
      </button>
    </div>
  );
};
