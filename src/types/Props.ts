import { Dispatch, SetStateAction } from "react";
import { CsvFile } from "@/types/CsvFile";

export type CSVButtonProp = {
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};
