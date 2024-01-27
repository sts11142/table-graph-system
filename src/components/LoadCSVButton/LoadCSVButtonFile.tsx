import { CSVButtonProp } from "@/types/props";
import { DATA_file } from "./Constants";

export function LoadCSVButtonFile({ setCsvFile }: CSVButtonProp) {
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
