export type CsvRowObj = {
  id: number,
  name: string,
  grade: number,
  scoreJapanese: number,
  scoreMath: number,
  scoreEnglish: number,
  scoreScience: number,
  scoreSociety: number,
}
export type CsvFile = Array<CsvRowObj>;
