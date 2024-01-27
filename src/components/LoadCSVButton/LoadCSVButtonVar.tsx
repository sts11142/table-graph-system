/* eslint-disable @typescript-eslint/naming-convention */
import { CsvFile } from "@/types/CsvFile";
import { Dispatch, SetStateAction } from "react";
import { DATA_var } from "./Constants";

type CSVButtonProp = {
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};

export function LoadCSVButtonVar({ setCsvFile }: CSVButtonProp) {
  const handleLoadCSV = () => {
    setCsvFile([...DATA_var]);
  };

  return (
    <>
      <div>
        <button onClick={handleLoadCSV}>load csv from var</button>
      </div>
    </>
  );
}
