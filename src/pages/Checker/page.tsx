import { FileTable } from "@/components/common/file-table";
import { useViewSheet } from "@/contexts/sheet-context";
import { ChevronRight } from "lucide-react";

export function CheckerPage() {
  const { changeViewSheet, viewSheet } = useViewSheet()
  const sheetName = viewSheet

  return (
    <>
      <main className="p-4">
        <div className="container m-auto">

          <div className="grid gap-8 pt-8">

            <div className="flex items-center gap-4">
              <div className="flex gap-4 cursor-pointer w-max" onClick={() => changeViewSheet('default')}>
                <h1 className="text-3xl font-semibold">Checker</h1>
              </div>
              {sheetName !== 'default' && (
                <>
                  <span><ChevronRight size={16} /></span>
                  <span className="opacity-50">{sheetName}</span>
                </>
              )}
            </div>
            <FileTable />
          </div>

        </div>

      </main>
    </>
  )
}