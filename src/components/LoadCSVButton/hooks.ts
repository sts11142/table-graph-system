import { CsvFile } from "@/types/CsvFile";
import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

export function useFetchCsv() {
  const [file, setFile] = useState<CsvFile>([]);
  const { readString } = usePapaParse();

  useEffect(() => {
    // httpリクエストを投げてCSVファイルを取得する関数(top-level async 用の関数宣言)
    const fetchFile = async (url: string) => {
      // Promiseのストリームからデータを取得する
      const csvString = await (await fetch(url)).text();

      // CSV形式のデータを papaparse ライブラリを用いてArray<object>型に変換する
      readString(csvString, {
        worker: true,
        header: true,  // csvヘッダー有 の処理を行う
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        complete: (result: any) => {
          setFile(result.data);
        },
      });
    };

    fetchFile("http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv");
  }, [readString]);

  return [file];
}
