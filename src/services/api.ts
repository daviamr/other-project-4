import axios from "axios";

export const api = axios.create({
  baseURL: 'https://webscrap.bigdates.com.br:3670',
  headers: { "Content-Type": 'application/json' }
})