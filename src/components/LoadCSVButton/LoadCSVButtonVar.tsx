import { CSVButtonProp } from "@/types/props";
import { DATA_var } from "./Constants";

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
