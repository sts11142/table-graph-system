import { useEffect, useState } from "react";
import "./App.css";
import { LoadCSVButton } from "./components/LoadCSVButton";
import { CsvFile, GroupedCsvRowObj } from "./types/CsvFile";
import { SAMPLE_CSV, FILE_PATHS } from "./components/LoadCSVButton/constants";
import { useFetchCsv } from "./hooks/useFetchCsv";
import { TableView } from "./components/TableView";
import { GraphView } from "./components/GraphView";
import {
  Box,
  Container,
  ButtonGroup,
  SimpleGrid,
  Text,
  Divider,
  Heading,
  Button,
} from "@chakra-ui/react";

function groupByNumberAndName(data: CsvFile): GroupedCsvRowObj[] {
  const grouped: Record<string, GroupedCsvRowObj> = {};

  // Group the data by id and name
  data.forEach((row) => {
    const key = `${row.番号}_${row.氏名}`;
    if (!grouped[key]) {
      grouped[key] = { id: row["番号"], name: row["氏名"], grades: [] };
    }
    grouped[key].grades.push({ ...row });
  });

  return Object.values(grouped).sort((a, b) => a.id - b.id);
}

function App() {
  const [csvFile, setCsvFile] = useState<CsvFile>([]);
  const [groupedCsvFile, setGroupedCsvFile] = useState<GroupedCsvRowObj[]>([]);

  useEffect(() => {
    setGroupedCsvFile(groupByNumberAndName(csvFile));
  }, [csvFile]);

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
      <Box>
        <Container maxW="12xl" centerContent>
          {/* heading */}
          <Box mb={20}>
            <Heading as="h1">Table-Graph System</Heading>
          </Box>

          {/* load csv button */}
          <Box display="flex" mb={10}>
            <ButtonGroup gap="8">
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

          <Button
            onClick={() => setCsvFile([])}
            size="md"
            colorScheme="teal"
            variant="outline"
            mb={10}
          >
            Unload CSV
          </Button>

          <Divider />

          <SimpleGrid columns={2} gap={10}>
            {/* table */}
            <Box>
              <Text>Table</Text>
              <Divider />
              {groupedCsvFile.length !== 0 ? (
                <TableView csvFile={groupedCsvFile} />
              ) : (
                <Text>Please load the CSV file!</Text>
              )}
            </Box>

            {/* graph */}
            <Box>
              <p>Graph</p>
              <Divider />
              {groupedCsvFile.length !== 0 ? (
                <GraphView csvFile={groupedCsvFile} />
              ) : (
                <Text>Please choose a specific student!</Text>
              )}
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export default App;
