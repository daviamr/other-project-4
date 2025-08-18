import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'

export function useSheetController() {
  const date = new Date()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result
      if (!result || typeof result === 'string') return toast.error('Falha ao ler o arquivo.')

      const data = new Uint8Array(result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const exportToExcel = (data: any, filename = 'planilha.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
    XLSX.writeFile(workbook, filename);
  }

  const exportDefaultSheet = () => {
    const worksheet = XLSX.utils.json_to_sheet(defaultData)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
    XLSX.writeFile(workbook, 'padrao-exemplo.xlsx');
  }

  const defaultData = [
    { numero: '+55 (21) 988776-65544', operadora: 'Claro', pfPj: 'PF', dataConsulta: date },
    { numero: '+55 (21) 988776-65544', operadora: 'Tim', pfPj: '91.081.895/0001-91', dataConsulta: date },
    { numero: '+55 (21) 988776-65544', operadora: 'Vivo', pfPj: '82.332.230/0001-12', dataConsulta: date }
  ]

  return {
    exportDefaultSheet,
    exportToExcel,
    handleFileUpload
  }
}