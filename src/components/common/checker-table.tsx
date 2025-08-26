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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Copy, Download, Filter, Loader, Search, Trash } from "lucide-react"
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
// import { UploadSheet } from "../upload-sheet"
import { SheetInfo } from "../sheetIconsInfo"
import { TooltipPadrao } from "../tooltip"
import { useSheetController } from "@/pages/Checker/sheet-controller"
import { Label } from "../ui/label"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    numero: "+55 (21) 988776-65544",
    anatel: 'Válido',
    operadora: "Claro",
    tipo: 'Móvel',
    municipio: 'Rio de Janeiro',
    uf: 'RJ',
    dataHoraConsulta: '25/10/2398, 18:09h'
  },
  {
    id: "m5gr84i10",
    numero: "+55 (21) 988776-65544",
    anatel: 'Inválido',
    operadora: "Tim",
    tipo: 'Móvel',
    municipio: 'São Paulo',
    uf: 'SP',
    dataHoraConsulta: '12/12/3498, 13:39h'
  },
  {
    id: "m5gr84i11",
    numero: "+55 (21) 988776-65544",
    anatel: 'Inválido',
    operadora: "Vivo",
    tipo: 'Fixo',
    municipio: 'Rio de Janeiro',
    uf: 'RJ',
    dataHoraConsulta: '01/07/9888, 12:18h'
  }
]

export type Payment = {
  id: string
  numero: string
  anatel: string
  operadora: string
  tipo: string
  municipio: string
  uf: string
  dataHoraConsulta?: string
}

export function CheckerTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [maxRows, setMaxRows] = React.useState(50)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [hasSelectedRows, setHasSelectedRows] = React.useState(false)
  const [showFilter, setShowFilter] = React.useState<string[]>(['anatel'])
  const [showFilters, setShowFilters] = React.useState(false)
  const { exportDefaultSheet } = useSheetController()

  const copyFormattedData = async (rowData: Payment) => {
    const formattedText = `Número: ${rowData.numero} | Operadora: ${rowData.operadora} | Data de Consulta: ${rowData.dataHoraConsulta}`
    try {
      await navigator.clipboard.writeText(formattedText);
      // Aqui você pode adicionar uma notificação de sucesso se quiser
      console.log('Dados copiados com sucesso!');
    } catch (err) {
      console.error('Erro ao copiar dados:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = formattedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  // const filteredData = React.useMemo(() => {
  //   if (showField === 'Todos') {
  //     return data
  //   }
  //   const filteredData = data.filter(item => item.operadora === showField)
  //   return filteredData
  // }, [showField])

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
      accessorKey: "numero",
      header: "Número",
      cell: ({ row }) => (<p>{row.getValue("numero")}</p>),
      size: 180,
    },
    {
      accessorKey: "anatel",
      header: "Anatel",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("anatel")}</div>),
    },
    {
      accessorKey: "operadora",
      header: "Operadora Origem",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("operadora")}</div>),
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("tipo")}</div>),
    },
    {
      accessorKey: "municipio",
      header: "Município",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("municipio")}</div>),
    },
    {
      accessorKey: "uf",
      header: "UF",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("uf")}</div>),
    },
    {
      accessorKey: "utils",
      header: "",
      cell: ({ row }) => (<div className="capitalize flex justify-end gap-2">
        { }
        <TooltipPadrao message="Copiar dados">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => copyFormattedData(row.original)}>
            <Copy />
            {row.getValue("select")}</Button>
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
    // data: filteredData,
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

  return (

    <div className=" w-full">
      <div className="relative flex items-center py-4">
        <Search size={16} className="absolute left-2" />
        <div className="flex items-center gap-4 w-full">
          <Input
            placeholder={`Filtrar por Anatel`}
            value={(table.getColumn('anatel')?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn('anatel')?.setFilterValue(event.target.value)}
            className="pl-8 min-w-40" />

          {showFilter.includes('operadora') && (
            <Input
              placeholder="Filtrar por Operadora"
              value={(table.getColumn("operadora")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("operadora")?.setFilterValue(event.target.value)}
            />
          )}

          <Button variant={"outline"} size={"icon"} onClick={() => setShowFilters(prev => !prev)}>
            <Filter size={16} />
          </Button>

          <SheetInfo total={32} success={92} error={10} mobile={10} phone={22} />
        </div>

        <div className="flex w-full justify-end">
          <div className='flex items-center gap-4'>
            {/* <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`} size={"icon"}><SquarePen size={16} /></Button> */}
            <TooltipPadrao message="Excluir Selecionados">
              <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`} size={"icon"}><Trash size={16} /></Button>
            </TooltipPadrao>
            <TooltipPadrao message="Baixar Selecionados">
              <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`}
                onClick={() => { console.log(selectedIds) }}><Download size={16} /> Download Seleção</Button>
            </TooltipPadrao>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-gray-600 pl-2">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
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
                <ChevronLeft />
              </Button>

              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <ChevronRight />
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
          {/* <UploadSheet /> */}
          <TooltipPadrao message="Download Total">
            <Button variant={"secondary"} className="ml-4" onClick={exportDefaultSheet}><Download size={16} /> Download Base</Button>
          </TooltipPadrao>
        </div>
      </div>
      <div className="rounded-md border relative">
        <div className="absolute right-2 top-[2px] z-10">
          <Select value={maxRows.toString()} onValueChange={(value) => setMaxRows(Number(value))}>
            <SelectTrigger className="font-bold">{maxRows}</SelectTrigger>
            <SelectContent>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <span className="text-sm text-gray-600 pl-2">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
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
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ChevronRight />
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
      {
        showFilters && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
            onClick={() => setShowFilters(false)}
          >
            <div
              className="bg-background p-6 rounded-lg shadow-lg w-100"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-2xl pb-4 border-b">Selecione os filtros</p>
              <div className="flex items-center gap-2 text-white py-4">
                <Input
                  type="checkbox"
                  className="max-w-4 h-4 w-4"
                  id="operadora"
                  checked={showFilter.includes('operadora')}
                  onChange={(e) => {
                    const value = 'operadora';
                    if (e.target.checked) {
                      setShowFilter(prev => [...prev, value]);
                    } else {
                      setShowFilter(prev => prev.filter(item => item !== value));
                    }
                  }}
                />
                <Label htmlFor="operadora" className="text-white cursor-pointer">
                  Operadora Origem
                </Label>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
