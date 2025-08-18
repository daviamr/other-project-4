export interface ILogin {
  email: string,
  password: string
}

export interface ILoginResponse {
  success: boolean,
  token: string,
  user: {
    name: string
    email: string
  }
}