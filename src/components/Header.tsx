import { TotalExpense } from "./TotalExpense";

export const Header = () => {
  return (
    <header className="w-full flex items-center px-6 justify-between py-6 text-4xl">
      <h1 className="font-bold cursor-default text-white w-fit">
        Cateira{" "}
        <i className="font-thin block bg-white text-black px-2 rounded-bl-lg rounded-tr-lg">
          to-do
        </i>
      </h1>
      <TotalExpense />
    </header>
  );
};
