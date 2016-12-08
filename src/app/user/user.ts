/**
 * Object Model of a User
 */

export class User {
  username: string;
  password: string;
/*
  firstName: string;
  lastName: string;
*/

  constructor(
    {
      username = '',
      password = ''

    }:  { username ? : string, password ? : string })
  {
    this.username = username;
    this.password = password;
  }

}
