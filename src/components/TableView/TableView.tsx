import { CsvFile, CsvRowObj } from "@/types/CsvFile";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TableProps = {
  csvFile: CsvFile;
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};

type GroupedCsvRowObj = {
  id: number;
  name: string;
  grades: CsvRowObj[];
};

type UnionedCsvRowObj = CsvRowObj | GroupedCsvRowObj;

// Group by '番号' and '氏名', and nest '学年' as a subarray
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

function defineColumns(csvFile: CsvFile) {
  if (csvFile.length === 0) return [];

  const columns: ColumnDef<UnionedCsvRowObj>[] = [];
  Object.keys(csvFile[0]).map((key) => {
    columns.push({
      accessorKey: key.toString(),
      header: key.toString(),
    });
  });

  return columns;
}

export function TableView({ csvFile, setCsvFile }: TableProps) {
  const [groupedCsvFile, setGroupedCsvFile] = useState<GroupedCsvRowObj[]>([]);

  useEffect(() => {
    setGroupedCsvFile(groupByNumberAndName(csvFile));
  }, [csvFile]);

  const columns = defineColumns(csvFile);

  const table = useReactTable<UnionedCsvRowObj>({
    data: groupedCsvFile,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Box>
        <TableContainer>
          <Table>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {groupedCsvFile.map((group) =>
                group.grades.map((row, rowIndex) => {
                  const isGroupStart = rowIndex === 0;
                  const rowSpan = group.grades.length;

                  return (
                    <Tr key={row.番号 + row.氏名 + row.学年}>
                      {isGroupStart && (
                        <>
                          <Td rowSpan={rowSpan}>{row.番号}</Td>
                          <Td rowSpan={rowSpan}>{row.氏名}</Td>
                        </>
                      )}
                      <Td>{row.学年}</Td>
                      <Td>{row.国語}</Td>
                      <Td>{row.数学}</Td>
                      <Td>{row.英語}</Td>
                      <Td>{row.理科}</Td>
                      <Td>{row.社会}</Td>
                    </Tr>
                  );
                }),
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
