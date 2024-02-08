export type CsvRowObj = {
  '番号': number,
  '氏名': string,
  '学年': number,
  '国語': number,
  '数学': number,
  '英語': number,
  '理科': number,
  '社会': number,
}

export type CsvFile = Array<CsvRowObj>;

export type GroupedCsvRowObj = {
  id: number;
  name: string;
  grades: CsvRowObj[];
};

export type UnionedCsvRowObj = CsvRowObj | GroupedCsvRowObj;
export type UnionedCsvFile = CsvRowObj[] | GroupedCsvRowObj[];

export type CsvRowLabels = ['番号', '氏名', '学年', '国語', '数学', '英語', '理科', '社会'];
