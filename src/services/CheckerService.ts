export class CheckerService {
  readonly LOCAL_TOKEN: string | null
  constructor() { this.LOCAL_TOKEN = localStorage.getItem('@bearer') }
}