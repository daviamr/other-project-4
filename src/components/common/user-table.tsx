import { AtSign, Calendar, Eye, Loader, Trash, User } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { CreateEditUser } from "../create-edit-user"
import { useUserController } from "@/pages/User/controller"

export function UserTable() {
  const tableHeaders = [
    { label: 'Usuário', icon: <User size={16} /> },
    { label: 'E-mail', icon: <AtSign size={16} /> },
    { label: 'Criação', icon: <Calendar size={16} /> },
    { label: '', icon: null }
  ]
  const { usersQuery: { isLoading, data }, deleteUser } = useUserController()

  if (!data) return <span>Nenhum usuário encontrado</span>

  return (
    <div>
      <div className="flex justify-end pb-2">
        <CreateEditUser mode="create"/>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((h, i) => (
              <TableHead className="w-[140px]" key={i}>
                <span className="flex items-center gap-2">
                  {h.icon} {h.label}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user, i) => (
            <TableRow key={i}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size={"icon"} variant={"outline"}><Eye size={16} /></Button>
                <CreateEditUser id={String(user.id)} email={user.email} name={user.name} mode="edit"/>
                <Button size={"icon"} variant={"outline"} onClick={() => deleteUser(String(user.id))}><Trash size={16} /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && (<div className="w-full flex justify-center items-center py-32"><span className="animate-spin"><Loader size={32} /></span></div>)}
    </div>
  )
}