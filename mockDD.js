class Users {
  _Users = [];
  constructor() {}

  getAll() {
    return this._Users;
  }

  addUser(user) {
    this._Users.push(user);
    return this._Users;
  }
  findOneById(id) {
    const user = this._Users.find((user) => user.getId() == id);
    if (!user) return null;
    return user;
  }
  findOneByUser(username) {
    const user = this._Users.find((user) => user.getUsername() == username);
    if (!user) return null;
    return user;
  }
  update(id, updatedUser) {
    const user = this.findOne(id);

    if (!user) return null;

    updatedProps = Object.keys(updatedUser);
    updatedUser.forEach((prop) => {
      user[prop] = updatedUser[prop];
    });

    return this._Users;
  }
  delete(id) {
    this._Users = this._Users.filter((user) => user.getId() !== id);
    return this._Users;
  }
}
module.exports = Users;
