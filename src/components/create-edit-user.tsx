import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserController } from "@/pages/User/controller"
import { zodResolver } from "@hookform/resolvers/zod"
import { AtSign, CircleCheck, CircleX, Edit, Loader, Plus, RectangleEllipsis, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"

const registerUserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'O campo nome é obrigatório.'),
  email: z.string().email('Endereço de e-mail inválido.'),
  password: z.string().min(4, 'A senha deve ter no mínimo 6 caracteres.')
})

type RegisterUserData = z.infer<typeof registerUserSchema>

interface userProps {
  id?: string,
  name?: string,
  email?: string,
  mode: 'create' | 'edit'
}

export function CreateEditUser({ ...props }: userProps) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<RegisterUserData>({
      resolver: zodResolver(registerUserSchema),
      defaultValues: {
        id: props?.id || '',
        name: props?.name || '',
        email: props?.email || '',
      }
    })
  const { createUser, editUser } = useUserController()
  const { mutate, isLoading } = createUser
  const { mutateEditUser, editUserLoading } = editUser
  const mode = (props.mode === 'create')

  const onSubmit = async (data: RegisterUserData) => {
    const idStringToNumber = parseInt(data?.id)
    try {
      if (mode) {
        mutate(data)
        reset()
      } else {
        mutateEditUser({ ...data, id: idStringToNumber })
      }
    } catch (error) {
      toast.error('Erro ao cadastrar novo usuário.')
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {mode ? <><Plus size={16} />Cadastrar Usuário</> : <Edit size={16} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar novo usuário</DialogTitle>
          <DialogDescription className="pb-4 border-b">
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('id')} />
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name"><User size={16} />Nome</Label>
              {errors.name && (<span>{errors.name.message}</span>)}
              <Input id="name" type="text" placeholder="Fulano de Tal" {...register('name')} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email"><AtSign size={16} />E-mail</Label>
              {errors.email && (<span>{errors.email.message}</span>)}
              <Input id="email" type="email" placeholder="email@exemplo.com" {...register('email')} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pass"><RectangleEllipsis size={16} />Senha</Label>
              {errors.password && (<span>{errors.password.message}</span>)}
              <Input id="pass" type="password" placeholder="******" {...register('password')} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline"><CircleX size={16} />Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {(isLoading || editUserLoading) ? (<span className="animate-spin"><Loader size={16} /></span>) : (<><CircleCheck size={16} />Cadastrar Usuário</>)}

            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}