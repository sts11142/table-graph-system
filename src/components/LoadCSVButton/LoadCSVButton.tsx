/* eslint-disable @typescript-eslint/naming-convention */
import { CsvFile } from "@/types/CsvFile";
import { Dispatch, SetStateAction } from "react";
import { DATA_var, DATA_file, DATA_http } from "./Constants";

type CSVButtonProp = {
  loadType: "var" | "file" | "http";
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};

export function LoadCSVButton({ loadType, setCsvFile }: CSVButtonProp) {
  const handleLoadCSV = () => {
    if (loadType === 'var') {
      setCsvFile([...DATA_var])
    } else if (loadType === "file") {
      setCsvFile([...DATA_file]);
    } else if (loadType === "http") {
      setCsvFile([...DATA_http]);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleLoadCSV}>load csv by: {loadType}</button>
      </div>
    </>
  );
}
