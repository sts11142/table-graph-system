import { useState, useEffect, Dispatch } from "react";

import { GroupedCsvRow, CsvFile } from "@/types/CsvFile";
import { useFetchCsv } from "./useFetchCsv";
import { PathValues } from "@/components/LoadCSVButton/Constants";
import { useCalcOf } from "./useCalcAvg";

function groupByNumberAndName(data: CsvFile): GroupedCsvRow[] {
  const grouped: Record<string, GroupedCsvRow> = {};

  // CsvRow[]を加工してGroupedCsvRow[]を作成する
  data.forEach((row) => {
    const key = `${row.番号}_${row.氏名}`;
    if (!grouped[key]) {
      grouped[key] = {
        id: row["番号"],
        name: row["氏名"],
        grades: [],
        selected: false,
      };
    }
    grouped[key].grades.push({ ...row });
  });

  return Object.values(grouped).sort((a, b) => a.id - b.id);
}

export function useGroupedCsv(csvPath: PathValues): [GroupedCsvRow[], Dispatch<React.SetStateAction<GroupedCsvRow[]>>] {
    const [csvFile] = useFetchCsv(csvPath);  // path をもとにCSVを定義する
    const [groupedCsvFile, setGroupedCsvFile] = useState<GroupedCsvRow[]>([]);  // CSVファイルを保持するステート
    const [avgRow] = useCalcOf('avg', groupedCsvFile)
    const [maxRow] = useCalcOf('max', groupedCsvFile)
    // const [minRow] = useCalcOf('min', groupedCsvFile)
    
    useEffect(() => {
      console.log("avg: ", avgRow)
      setGroupedCsvFile(() => [...groupByNumberAndName(csvFile), maxRow])
    }, [csvFile])

    return [groupedCsvFile, setGroupedCsvFile]
}
