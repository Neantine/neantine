/**
 * Object Model of a User ( <title>, (object User))
 */

export class UserDisplay {
  username: string;
  password: string;
  firstName : string;
  lastName : string;

  constructor( { username = '', password = '', firstName='', lastName ='' } :  {username: string ,password? : string, firstName : string, lastName :string } ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}

