/* eslint-disable @typescript-eslint/naming-convention */
import { CsvFile } from "@/types/CsvFile";
import { Dispatch, SetStateAction } from "react";
import { DATA_file } from "./Constants";

type CSVButtonProp = {
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};

export function LoadCSVButtonHttp({ setCsvFile }: CSVButtonProp) {
  const handleLoadCSV = () => {
    setCsvFile([...DATA_file]);
  };

  return (
    <>
      <div>
        <button onClick={handleLoadCSV}>load csv from file</button>
      </div>
    </>
  );
}
