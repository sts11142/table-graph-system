import { CsvFile } from "@/types/CsvFile";
import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

const removeLastIfEmpty = (csvFile: CsvFile): CsvFile => {
  // 読み取ったファイルの最終行が空行だった場合，その行のrowデータを削除する
  const newCsv = [...csvFile];
  if (newCsv.length === 0) return newCsv;  // 配列が空でないか確認
  return newCsv.filter((csvRow) => Object.keys(csvRow).length === 8);
};

export function useFetchCsv(path: string) {
  const [file, setFile] = useState<CsvFile>([]);
  const { readString } = usePapaParse();

  useEffect(() => {
    // httpリクエストを投げてCSVファイルを取得する関数(top-level async 用の関数宣言)
    const fetchFile = async (path: string) => {
      // Promiseのストリームからデータを取得する
      const csvString = await (await fetch(path)).text();

      // CSV形式のデータを papaparse ライブラリを用いてArray<object>型に変換する
      readString(csvString, {
        worker: true,
        header: true, // csvヘッダー有 の処理を行う
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        complete: (result: any) => {
          setFile( removeLastIfEmpty(result.data) );
        },
      });
    };

    fetchFile(path);
  }, [path, readString]);

  return [file];
}
