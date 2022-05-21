import type { NextPage } from "next";

import { TransactionList } from "../components/TransactionList";
import { FormAddExpense } from "../components/FormAddExpense";
import { Header } from "../components/Header";

const Home: NextPage = () => {

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-indigo-700">
        <Header />
      </div>
      <div className="w-full flex  flex-col">
        <div className="w-full h-9 my-4 xl:w-2/5 m-auto">
          <header className="flex justify-center flex-col items-center gap-y-2">
            <FormAddExpense />
          </header>
          <h1 className="py-[1px] px-2 font-light text-sm text-center">Despesas</h1>
          <TransactionList />
        </div>
      </div>

      <footer className="text-center p-4 font-thin hidden">
        Feito com muito ♥️ by João Manoel
      </footer>
    </div>
  );
};

export default Home;
