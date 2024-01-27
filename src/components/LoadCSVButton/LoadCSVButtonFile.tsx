import { CSVButtonProp } from "@/types/props";
import { useFetchCsvLocal } from "./hooks";

export function LoadCSVButtonFile({ setCsvFile }: CSVButtonProp) {
  const [file] = useFetchCsvLocal();

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
