import { useState } from "react";
import "./App.css";
import { LoadCSVButtonVar, LoadCSVButtonFile, LoadCSVButtonHttp } from "./components/LoadCSVButton";
import { CsvFile } from "./types/CsvFile";

function App() {
  const [csvFile, setCsvFile] = useState<CsvFile>([]);

  return (
    <>
      <div>
        <p>Table-Graph System</p>
      </div>

      <div>
        <LoadCSVButtonVar setCsvFile={setCsvFile} />
        <LoadCSVButtonFile setCsvFile={setCsvFile} />
        <LoadCSVButtonHttp setCsvFile={setCsvFile} />
      </div>

      <div>
        {csvFile?.map((item, index) => {
          return (
            <div key={item['番号'] + item['学年']}>
              <span>{index+ 1} | </span>
              <span>番号: {item['番号']}</span>
              <span>氏名: {item['氏名']}</span>
              <span>学年: {item['学年']}</span>
              <span>国語: {item['国語']}</span>
              <span>数学: {item['数学']}</span>
              <span>英語: {item['英語']}</span>
              <span>理科: {item['理科']}</span>
              <span>社会: {item['社会']}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
