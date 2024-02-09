/* eslint-disable @typescript-eslint/naming-convention */
import { CsvFile } from "@/types/CsvFile";

export const FILE_PATHS = {
  var: "",
  local: "Data.csv",
  remote: import.meta.env.VITE_REMOTE_CSV_URL,
} as const;

export const SAMPLE_CSV: CsvFile = [
  {
    番号: 100,
    氏名: "進藤 怜奈",
    学年: 1,
    国語: 78,
    数学: 71,
    英語: 35,
    理科: 68,
    社会: 80,
  },
  {
    番号: 100,
    氏名: "進藤 怜奈",
    学年: 2,
    国語: 37,
    数学: 86,
    英語: 46,
    理科: 42,
    社会: 60,
  },
  {
    番号: 100,
    氏名: "進藤 怜奈",
    学年: 3,
    国語: 62,
    数学: 63,
    英語: 55,
    理科: 57,
    社会: 97,
  },
] as const;
