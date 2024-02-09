import { useState } from "react";
import "./App.css";
// import { CsvFile, GroupedCsvRow } from "@/types/CsvFile";
import { LoadCSVButton } from "@/components/LoadCSVButton";
import { FILE_PATHS, PathValues } from "@/components/LoadCSVButton/Constants";
// import { useFetchCsv } from "@/hooks/useFetchCsv";
import { TableView } from "@/components/TableView";
import { GraphView } from "@/components/GraphView";
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
import { useSelectedGroups } from "@/hooks/useSelectedGroups";
import { useGroupedCsv } from "./hooks/useGroupedCsv";

// function groupByNumberAndName(data: CsvFile): GroupedCsvRow[] {
//   const grouped: Record<string, GroupedCsvRow> = {};

//   // CsvRow[]を加工してGroupedCsvRow[]を作成する
//   data.forEach((row) => {
//     const key = `${row.番号}_${row.氏名}`;
//     if (!grouped[key]) {
//       grouped[key] = {
//         id: row["番号"],
//         name: row["氏名"],
//         grades: [],
//         selected: false,
//       };
//     }
//     grouped[key].grades.push({ ...row });
//   });

//   return Object.values(grouped).sort((a, b) => a.id - b.id);
// }

function App() {
  const [csvPath, setCsvPath] = useState<PathValues>("");

  const [groupedCsvFile, setGroupedCsvFile] = useGroupedCsv(csvPath)
  const [selectedGroupedCsvFile] = useSelectedGroups(groupedCsvFile);

  // CSVデータを取得
  // const varCsv = SAMPLE_CSV;
  // const [localCsv] = useFetchCsv(FILE_PATHS.local);
  // const [remoteCsv] = useFetchCsv(FILE_PATHS.remote);

  // // ボタンが押されたタイミングで表示するデータを更新するハンドラ
  // const handleLoadCsv = (path: string) => {
  //   if (path === FILE_PATHS.var) setCsvFile([...varCsv]);
  //   else if (path === FILE_PATHS.local) setCsvFile([...localCsv]);
  //   else if (path === FILE_PATHS.remote) setCsvFile([...remoteCsv]);
  // };

  return (
    <>
      <Box m="0">
        <Container centerContent>
          {/* heading */}
          <Box mb={20}>
            <Heading as="h1">Table-Graph System</Heading>
          </Box>

          {/* load csv button */}
          <Box display="flex" mb={10}>
            <ButtonGroup gap="8">
              <LoadCSVButton
                csvPath={FILE_PATHS.var}
                handleSetPath={setCsvPath}
              ></LoadCSVButton>
              <LoadCSVButton
                csvPath={FILE_PATHS.local}
                handleSetPath={setCsvPath}
                ></LoadCSVButton>
              <LoadCSVButton
                csvPath={FILE_PATHS.remote}
                handleSetPath={setCsvPath}
              ></LoadCSVButton>
            </ButtonGroup>
          </Box>

          <Button
            onClick={() => setGroupedCsvFile([])}
            size="md"
            colorScheme="teal"
            variant="outline"
            mb={10}
          >
            Unload CSV
          </Button>

          <SimpleGrid columns={2} gap={10} w="80vw">
            {/* table */}
            <Box>
              <Divider />
              <Text>Table</Text>
              <Divider />
              {groupedCsvFile.length !== 0 ? (
                <TableView
                  csvFile={groupedCsvFile}
                  setCsvFile={setGroupedCsvFile}
                />
              ) : (
                <Text>Please load the CSV data!</Text>
              )}
            </Box>

            {/* graph */}
            <Box>
              <Divider />
              <p>Graph</p>
              <Divider />
              {selectedGroupedCsvFile.length !== 0 ? (
                selectedGroupedCsvFile.map((group) => {
                  return <GraphView selectedRow={group} key={group.id} />;
                })
              ) : (
                <Text>Please choose specific students!</Text>
              )}
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export default App;
