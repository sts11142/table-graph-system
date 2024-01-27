import { useFetchCsv } from "../../hooks/useFetchCsv";
import { CSVButtonProp } from "@/types/props";

export function LoadCSVButtonHttp({ setCsvFile }: CSVButtonProp) {
  const [file] = useFetchCsv(
    "http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv",
  );

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
