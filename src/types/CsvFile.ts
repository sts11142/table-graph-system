export type CsvRow = {
  '番号': number,
  '氏名': string,
  '学年': number,
  '国語': number,
  '数学': number,
  '英語': number,
  '理科': number,
  '社会': number,
}
export type GroupedCsvRow = {
  id: number;
  name: string;
  grades: CsvRow[];
  selected: boolean;
};

export type CsvFile = CsvRow[]
