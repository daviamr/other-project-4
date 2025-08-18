import type { IRegister } from "@/interfaces/register";
import type { IUser, IUserResponse } from "@/interfaces/user";
import { UserService } from "@/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUserController() {
  const userService = new UserService()
  const queryClient = useQueryClient()

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<IUserResponse> => {
      const response = await userService.getUsers()
      if (!response.success) {
        toast.error('Erro ao buscar usuários.')
        throw new Error()
      }
      return { users: response.users }
    }
  })

  const { mutate: createUser, isPending: isLoading } = useMutation({
    mutationFn: async (payload: IRegister) => {
      const response = await userService.createUser(payload)
      return response
    },
    onMutate: async () => { queryClient.cancelQueries({ queryKey: ['users'] }) },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(response.message)
    },
    onError: (error) => { toast.error(`Erro ao criar usuário ${error.message}`) }
  })

  const { mutate: editUser, isPending: editUserLoading } = useMutation({
    mutationFn: async (payload: IUser) => {
      const response = await userService.editUser(payload)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(response.message)
    },
    onMutate: async () => { queryClient.cancelQueries({ queryKey: ['users'] }) },
    onError: (error) => { toast.error(`Erro ao editar usuário ${error.message}`) }
  })

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id: string) => {
      const response = await userService.deleteUser(id)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(response.message)
    },
    onMutate: async () => { queryClient.cancelQueries({ queryKey: ['users'] }) },
    onError: (error) => { toast.error(`Erro ao criar usuário ${error.message}`) }
  })

  return {
    usersQuery,
    createUser: {
      mutate: createUser,
      isLoading
    },
    editUser: {
      mutateEditUser: editUser,
      editUserLoading
    },
    deleteUser
  }
}