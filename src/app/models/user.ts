export class User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar:string;
    // Add any other user-related properties here
  
    constructor(id: number, first_name: string, email: string,  last_name: string,avatar:string) {
      this.id = id;
      this.first_name = first_name;
      this.email = email;
      this.last_name = last_name;
      this.avatar = avatar;
    }
}
