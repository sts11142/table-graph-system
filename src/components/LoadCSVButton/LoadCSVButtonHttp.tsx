/* eslint-disable @typescript-eslint/naming-convention */
import { CsvFile } from "@/types/CsvFile";
import { Dispatch, SetStateAction } from "react";
import { useFetchCsv } from "./hooks";

type CSVButtonProp = {
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};

export function LoadCsvButtonFile({ setCsvFile }: CSVButtonProp) {
  const [file] = useFetchCsv();

  const handleLoadCSV = () => {
    setCsvFile(file);
  };

  return (
    <>
      <div>
        <button onClick={handleLoadCSV}>load csv from file</button>
      </div>
    </>
  );
}
