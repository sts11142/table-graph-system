import { CsvFile } from "@/types/CsvFile";

type GraphViewProps = {
  csvFile: CsvFile,
}

export function GraphView({ csvFile }: GraphViewProps) {
  return <>{csvFile.length > 0 && <p>Graph area</p>}</>;
}
