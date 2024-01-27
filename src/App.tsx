import { useState } from "react";
import "./App.css";
import { LoadCSVButton } from "./components/LoadCSVButton";
import { CsvFile } from "./types/CsvFile";
import { SAMPLE_CSV, FILE_PATHS } from "./components/LoadCSVButton/Constants";
import { useFetchCsv } from "./hooks/useFetchCsv";
import { TableView } from "./components/TableView";
import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

function App() {
  const [csvFile, setCsvFile] = useState<CsvFile>([]);

  // CSVデータを取得
  const varCsv = SAMPLE_CSV;
  const [localCsv] = useFetchCsv(FILE_PATHS.local);
  const [remoteCsv] = useFetchCsv(FILE_PATHS.remote);

  // ボタンが押されたタイミングで表示するデータを更新するハンドラ
  const handleLoadCsv = (path: string) => {
    if (path === FILE_PATHS.var) setCsvFile([...varCsv]);
    else if (path === FILE_PATHS.local) setCsvFile([...localCsv]);
    else if (path === FILE_PATHS.remote) setCsvFile([...remoteCsv]);
  };

  return (
    <>
      <Container>
        <Box mb={20}>
          <Heading as="h1">Table-Graph System</Heading>
        </Box>

        {/* <SimpleGrid columns={3} spacing={20} mb={20}> */}
        <Box display="grid" mb={20}>
          <ButtonGroup gap='4'>
            <LoadCSVButton
              handleSetCsv={handleLoadCsv}
              csvPath={FILE_PATHS.var}
            ></LoadCSVButton>
            <LoadCSVButton
              handleSetCsv={handleLoadCsv}
              csvPath={FILE_PATHS.local}
            ></LoadCSVButton>
            <LoadCSVButton
              handleSetCsv={handleLoadCsv}
              csvPath={FILE_PATHS.remote}
            ></LoadCSVButton>
          </ButtonGroup>
        </Box>

        <Divider />

        <TableView csvFile={csvFile} setCsvFile={setCsvFile} />
      </Container>
    </>
  );
}

export default App;
