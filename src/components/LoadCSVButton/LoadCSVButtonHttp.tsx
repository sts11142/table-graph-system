import { useFetchCsvRemote } from "./hooks";
import { CSVButtonProp } from "@/types/props";

export function LoadCSVButtonHttp({ setCsvFile }: CSVButtonProp) {
  const [file] = useFetchCsvRemote();

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
