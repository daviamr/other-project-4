import { FileTable } from "@/components/common/file-table";

export function CheckerPage() {

  return (
    <>
      <main className="p-4">
        <div className="container m-auto">

          <div className="grid gap-8 pt-8">

            <div className="flex gap-4">
              <h1 className="text-3xl font-semibold">Checker</h1>
            </div>
            <FileTable />
          </div>

        </div>

      </main>
    </>
  )
}