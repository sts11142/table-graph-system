import { useState } from "react";
import "./App.css";
import { LoadCSVButton } from "./components/LoadCSVButton";
import { CsvFile } from "./types/CsvFile";
import { DATA_var, PATHS } from "./components/LoadCSVButton/Constants";
import { useFetchCsv } from "./hooks/useFetchCsv";

function App() {
  const [csvFile, setCsvFile] = useState<CsvFile>([]);

  // CSVデータを取得
  const [localCsv] = useFetchCsv(PATHS.local);
  const [remoteCsv] = useFetchCsv(PATHS.remote);

  // ボタンが押されたタイミングで表示するデータを更新するクリックハンドラ
  const handleLoadCsv = (path: string) => {
    if (path === PATHS.var) setCsvFile([...DATA_var]);
    else if (path === PATHS.local) setCsvFile([...localCsv]);
    else if (path === PATHS.remote) setCsvFile([...remoteCsv]);
  };

  return (
    <>
      <div>
        <h1>Table-Graph System</h1>
      </div>

      <div>
        <LoadCSVButton
          handleSetCsv={handleLoadCsv}
          csvPath={PATHS.var}
        ></LoadCSVButton>

        <LoadCSVButton
          handleSetCsv={handleLoadCsv}
          csvPath={PATHS.local}
        ></LoadCSVButton>
        
        <LoadCSVButton
          handleSetCsv={handleLoadCsv}
          csvPath={PATHS.remote}
        ></LoadCSVButton>
      </div>

      <div>
        {csvFile?.map((item, index) => {
          return (
            <div key={item["番号"] + item["学年"]}>
              <span>{index + 1} | </span>
              <span>番号: {item["番号"]}</span>
              <span>氏名: {item["氏名"]}</span>
              <span>学年: {item["学年"]}</span>
              <span>国語: {item["国語"]}</span>
              <span>数学: {item["数学"]}</span>
              <span>英語: {item["英語"]}</span>
              <span>理科: {item["理科"]}</span>
              <span>社会: {item["社会"]}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
