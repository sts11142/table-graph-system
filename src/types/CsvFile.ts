export type OriginalCsvRow = {
  '番号': number,
  '氏名': string,
  '学年': number,
  '国語': number,
  '数学': number,
  '英語': number,
  '理科': number,
  '社会': number,
}
export type CsvRow = OriginalCsvRow & { 'selected': boolean }

export type OriginalCsvFile = OriginalCsvRow[];
export type CsvFile = CsvRow[]

export type GroupedCsvRow = {
  id: number;
  name: string;
  grades: CsvRow[];
};

export type UnionedCsvRowObj = CsvRow | GroupedCsvRow;
export type UnionedCsvFile = CsvRow[] | GroupedCsvRow[];

export type CsvRowLabels = ['番号', '氏名', '学年', '国語', '数学', '英語', '理科', '社会'];
