import { useState } from "react";
import "./App.css";
import { LoadCSVButtonVar, LoadCsvButtonFile } from "./components/LoadCSVButton";
import { CsvFile } from "./types/CsvFile";
import { LoadCSVButtonHttp } from "./components/LoadCSVButton/LoadCSVButtonFile";

function App() {
  const [csvFile, setCsvFile] = useState<CsvFile>([]);

  return (
    <>
      <div>
        <p>Table-Graph System</p>
      </div>

      <div>
        <LoadCSVButtonVar setCsvFile={setCsvFile} />
        <LoadCsvButtonFile setCsvFile={setCsvFile} />
        <LoadCSVButtonHttp setCsvFile={setCsvFile} />
      </div>

      <div>
        {csvFile.map((item) => {
          return (
            <div key={item.id + item.grade}>
              <span>id: {item.id}</span>
              <span>name: {item.name}</span>
              <span>grade: {item.grade}</span>
              <span>japanese: {item.scoreJapanese}</span>
              <span>math: {item.scoreMath}</span>
              <span>english: {item.scoreEnglish}</span>
              <span>science: {item.scoreScience}</span>
              <span>society: {item.scoreSociety}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
