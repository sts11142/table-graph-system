import { CsvFile, CsvRowObj } from "@/types/CsvFile";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Text,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type TableProps = {
  csvFile: CsvFile;
  setCsvFile: Dispatch<SetStateAction<CsvFile>>;
};

function defineColumns(csvFile: CsvFile) {
  if (csvFile.length === 0) return [];

  const columns: ColumnDef<CsvRowObj>[] = [];
  Object.keys(csvFile[0]).map((key) => {
    columns.push({
      accessorKey: key.toString(),
      header: key.toString(),
    });
  });

  return columns;
}

export function TableView({ csvFile, setCsvFile }: TableProps) {
  const columns = defineColumns(csvFile);

  const table = useReactTable<CsvRowObj>({
    data: csvFile,
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
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* {csvFile?.map((item, index) => {
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
      })} */}
    </>
  );
}
