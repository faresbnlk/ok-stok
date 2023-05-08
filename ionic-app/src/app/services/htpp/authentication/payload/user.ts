import { Role } from "./role";

export class User {
  constructor(public id: number,
              public name: string,
              public email: string,
              public phone: string,
              public imageUrl: string,
              public verifiedUser: boolean,
              public roles: Role[]) {}
}
