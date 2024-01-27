import { CSVButtonProp } from "@/types/props";
import { useFetchCsv } from "../../hooks/useFetchCsv";

export function LoadCSVButtonFile({ setCsvFile }: CSVButtonProp) {
  const [file] = useFetchCsv("/Data.csv");

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
