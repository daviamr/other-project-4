import { UserTable } from "../../components/common/user-table";

export function UserPage() {
  return (
    <>
      <main className="p-4">
        <div className="container m-auto">

          <div className="grid gap-8 py-8">

            <h1 className="text-3xl font-semibold">Usuários</h1>

            <UserTable />
          </div>

        </div>

      </main>
    </>
  )
}