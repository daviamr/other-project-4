import type { ILogin, ILoginResponse } from "../interfaces/auth";
import { api } from "./api";

const DEFAULT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdWxpb0BqdWxpby5jb20iLCJuYW1lIjoianVsaW8iLCJpYXQiOjE3NTM5MTE3MzQsImV4cCI6MTc1Mzk5ODEzNH0.qPxqgwkSFbkLJ9cP2SbQOJV3nYHIN8KbGRYaNffNNRA'

export class AuthService {
  readonly LOCAL_TOKEN: string | null;

  constructor() { this.LOCAL_TOKEN = localStorage.getItem('@bearer') }

  async login({ ...payload }: ILogin): Promise<ILoginResponse> {
    const response = await api.post('/api/auth/login', { ...payload }, { headers: { 'Authorization': this.LOCAL_TOKEN ? this.LOCAL_TOKEN : DEFAULT_TOKEN } })
    const { token } = response.data
    localStorage.setItem('@bearer', token)
    return response.data
  }
}