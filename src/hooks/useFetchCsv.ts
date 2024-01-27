import { CsvFile } from "@/types/CsvFile";
import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

const removeLastIfEmpty = (csvFile: CsvFile): CsvFile => {
  const newCsv = [...csvFile]

  // 配列が空でないか確認
  if (newCsv.length === 0) {
      return newCsv;
  }

  // 最後の要素を取得
  const lastElement = newCsv[newCsv.length - 1];

  // csvファイルには欠損値が全くないものと仮定する
  if (Object.keys(lastElement).length !== 8) {
      // 最後の要素が空のオブジェクトの場合、それを削除
      newCsv.pop();
  }

  return newCsv;
}

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
          setFile(removeLastIfEmpty(result.data));
        },
      });
    };

    fetchFile(path);
  }, [path, readString]);

  return [file]
}
