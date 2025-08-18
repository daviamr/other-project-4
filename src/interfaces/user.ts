export interface IUserResponse {
  success?: boolean,
  message?: string,
  users: IUser[]
}

export interface IUser {
  id: number
  name: string;
  email: string;
  datanascimento?: string | null;
  createdAt?: string;
}

export interface IDeleteUser {
  success: boolean,
  message: string
}