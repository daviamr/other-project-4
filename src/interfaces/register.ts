export interface IRegister {
  name: string,
  password: string,
  email: string
}

export interface IRegisterResponse {
  success: boolean,
  message: string,
  user: {
    id: number
    name: string
    email: string
  }
}