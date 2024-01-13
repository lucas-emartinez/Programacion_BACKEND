export default class UserDTO {
    constructor(userObj) {
        this.first_name = userObj.first_name;
        this.last_name = userObj.last_name;
        this.email = userObj.email;
        this.birth_date = userObj.birth_date;
        this.password = userObj.password;
        this.role = userObj.role;
    }
}