import { useState } from "react";
import "./App.css";
import { LoadCSVButton } from "./components/LoadCSVButton";
import { CsvFile } from "./types/CsvFile";

function App() {
  const [csvFile, setCsvFile] = useState<CsvFile>([]);
  console.log("refreshed")

  return (
    <>
      <div>
        <p>Table-Graph System</p>
      </div>

      <div>
        <LoadCSVButton
          loadType="var"
          setCsvFile={setCsvFile}
        />
        <LoadCSVButton
          loadType="file"
          setCsvFile={setCsvFile}
        />
        <LoadCSVButton
          loadType="http"
          setCsvFile={setCsvFile}
        />
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
          )
        })}
      </div>
    </>
  );
}

export default App;
