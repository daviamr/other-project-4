/* eslint-disable react-refresh/only-export-components */

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle, ChevronsLeft, ChevronsRight, CircleX, Download, ExternalLink, Eye, Loader, Search, Share, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { UploadSheet } from "../upload-sheet"
import { TooltipPadrao } from "../tooltip"
import { useSheetController } from "@/pages/Checker/sheet-controller"
import { CheckerTable } from "./checker-table"
import { useViewSheet } from "@/contexts/sheet-context"
import { ShareWorkSheet } from "../share"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    nomeArquivo: "planilha-template-1.xlsx",
    dataUpload: "25/10/2023, 12:44h",
    status: 'success',
    totalLinhas: '323',
    totalLinhasInvalidas: '23',
    fixo: '234',
    movel: '90'
  },
  {
    id: "m5gr84i10",
    nomeArquivo: "planilha-template-3.xlsx",
    dataUpload: "19/08/2024, 08:21h",
    status: 'error',
    totalLinhas: '1223',
    totalLinhasInvalidas: '134',
    fixo: '897',
    movel: '238'
  },
  {
    id: "m5gr84i11",
    nomeArquivo: "planilha-template-3.xlsx",
    dataUpload: "20/08/2025, 14:53h",
    status: 'pending',
    totalLinhas: '9874',
    totalLinhasInvalidas: '1876',
    fixo: '7462',
    movel: '483'
  }
]

export type Payment = {
  id: string
  nomeArquivo: string
  dataUpload: string
  status: string
  totalLinhas: string
  totalLinhasInvalidas: string
  fixo: string
  movel: string
}

export function FileTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [maxRows, setMaxRows] = React.useState(50)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [selectedFile, setSelectedFile] = React.useState<{ id: string, name: string }>()
  const [hasSelectedRows, setHasSelectedRows] = React.useState(false)
  const { changeViewSheet, viewSheet } = useViewSheet()
  const { exportDefaultSheet } = useSheetController()
  console.log(selectedFile)

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all" />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row" />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      accessorKey: "nomeArquivo",
      header: "Nome do Arquivo",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("nomeArquivo")}</div>),
    },
    {
      accessorKey: "dataUpload",
      header: "Data Upload",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("dataUpload")}</div>),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (<div className="capitalize flex items-center gap-2">
        {row.getValue("status") === 'success' && <span><TooltipPadrao message="Processado com sucesso"><CheckCircle size={16} className="text-green-500" /></TooltipPadrao></span>}
        {row.getValue("status") === 'pending' && <span><TooltipPadrao message="Erro ao processar"><CircleX size={16} className="text-red-500" /></TooltipPadrao></span>}
        {row.getValue("status") === 'error' && <span><TooltipPadrao message="Processando"><Loader size={16} className="animate-spin" /></TooltipPadrao></span>}
      </div>),
      size: 80,
    },
    {
      accessorKey: "totalLinhas",
      header: "Total",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("totalLinhas")}</div>),
      size: 80,
    },
    {
      accessorKey: "totalLinhasInvalidas",
      header: "Inválidas",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("totalLinhasInvalidas")}</div>),
      size: 80,
    },
    {
      accessorKey: "fixo",
      header: "Fixo",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("fixo")}</div>),
      size: 80,
    },
    {
      accessorKey: "movel",
      header: "Móvel",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("movel")}</div>),
      size: 80,
    },
    {
      accessorKey: "utils",
      header: "",
      cell: ({ row }) => (<div className="capitalize flex justify-end gap-2">
        { }
        <TooltipPadrao message="Visualizar resultado">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              setSelectedFile({ id: row.original.id, name: row.original.nomeArquivo })
              changeViewSheet(row.original.nomeArquivo)
            }}>
            <Eye />
            {row.getValue("select")}</Button>
        </TooltipPadrao>
        <TooltipPadrao message="Download">
          <Button
            variant={"outline"}
            size={'icon'}
            onClick={exportDefaultSheet}><Download size={16} /></Button>
        </TooltipPadrao>
        <TooltipPadrao message="Excluir">
          <Button
            variant={"outline"}
            size={'icon'}>
            <Trash size={16} /></Button>
        </TooltipPadrao>
        <TooltipPadrao message="Compartilhar">
          <ShareWorkSheet />
        </TooltipPadrao>
        {/* {row.getIsSelected() && (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => row.toggleSelected()}>
            <Check color="green" />
          </Button>
        )}
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => row.toggleSelected()}>
          <Edit />
          {row.getValue("select")}</Button>
        <Button variant={"outline"} size={"icon"}><Trash />{row.getValue("select")}</Button> */}
      </div>
      ),
      size: 180,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection, },
  })

  React.useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows
    const ids = selectedRows.map(row => row.original.id)

    setSelectedIds(ids)
    setHasSelectedRows(ids.length > 0)
  }, [rowSelection, table])

  React.useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      table.setPageSize(maxRows);
      setIsLoading(false)
    }, 1000)
  }, [maxRows, table]);

  return viewSheet === 'default' ? (
    <div className=" w-full">
      <div className="relative flex items-center py-4">
        <Search size={16} className="absolute left-2" />
        <div className="flex items-center gap-4 w-full max-w-xs">
          <Input
            placeholder="Filtrar por palavra"
            value={(table.getColumn("nomeArquivo")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("nomeArquivo")?.setFilterValue(event.target.value)}
            className="pl-8 min-w-40" />
        </div>

        <div className="flex w-full justify-end">
          <div className='flex items-center gap-4'>
            {/* <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`} size={"icon"}><SquarePen size={16} /></Button> */}
            <TooltipPadrao message="Excluir Selecionados">
              <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`} size={"icon"}><Trash size={16} /></Button>
            </TooltipPadrao>
            <TooltipPadrao message="Download Selecionados">
              <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`}
                onClick={() => { console.log(selectedIds) }}><Download size={16} /> Seleção</Button>
            </TooltipPadrao>
          </div>
          <UploadSheet />
          {/* <TooltipPadrao message="Download Total">
            <Button variant={"secondary"} className="ml-4" onClick={exportDefaultSheet}><Download size={16} /> Download</Button>
          </TooltipPadrao> */}
        </div>
      </div>
      <div className="rounded-md border relative">
        <div className="absolute right-2 top-[2px] z-10">
          <Select value={maxRows.toString()} onValueChange={(value) => setMaxRows(Number(value))}>
            <SelectTrigger className="font-bold border-none bg-background hover:bg-background dark:hover:bg-background">{maxRows}</SelectTrigger>
            <SelectContent className="bg-background">
              <SelectGroup>
                <SelectItem value='50'>50</SelectItem>
                <SelectItem value='100'>100</SelectItem>
                <SelectItem value='200'>200</SelectItem>
                <SelectItem value='500'>500</SelectItem>
                <SelectItem value='1000'>1000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-2" style={{ width: `${header.getSize()}px` }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="relative h-32">
                  <Loader size={32} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>

          <span className="text-sm text-gray-600">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  ) : (<CheckerTable />)
}