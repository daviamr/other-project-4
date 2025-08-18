import type { IDeleteUser, IUser, IUserResponse } from "@/interfaces/user";
import { api } from "./api";
import type { IRegister, IRegisterResponse } from "@/interfaces/register";

export class UserService {
  readonly LOCAL_TOKEN: string | null;
  constructor() { this.LOCAL_TOKEN = localStorage.getItem('@bearer') }

  async getUsers(): Promise<IUserResponse> {
    const response = await api.get('/api/auth/users', { headers: { 'Authorization': `Bearer ${this.LOCAL_TOKEN}` } })
    return response.data
  }

  async createUser({ ...payload }: IRegister): Promise<IRegisterResponse> {
    const response = await api.post('/api/auth/register', { ...payload }, { headers: { 'Authorization': `Bearer ${this.LOCAL_TOKEN}` } })
    return response.data
  }

  async editUser({ ...payload }: IUser): Promise<IUserResponse> {
    console.log(this.LOCAL_TOKEN)
    const response = await api.put(`/api/auth/users/${payload.id}`, { ...payload }, { headers: { 'Authorization': `Bearer ${this.LOCAL_TOKEN}` } })
    return response.data
  }

  async deleteUser(id: string): Promise<IDeleteUser> {
    const response = await api.delete(`/api/auth/users/${id}`, { headers: { 'Authorization': `Bearer ${this.LOCAL_TOKEN}` } })
    return response.data
  }
}