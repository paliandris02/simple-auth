const crypto = require("crypto");

class User {
  constructor(username, email, password) {
    (this._id = crypto.randomUUID()),
      (this._username = username),
      (this._email = email),
      (this._password = this.hashPassword(password)),
      (this._createdAt = Date.now());
  }
  getId() {
    return this._id;
  }
  getUsername() {
    return this._username;
  }

  getEmail() {
    return this._email;
  }
  getHasdedPassword() {
    return this._password;
  }
  setUsername(newUsername) {
    this._username = newUsername;
    return this._username;
  }
  setEmail(newEmail) {
    this._email = newEmail;
  }
  setPassword(newPassword) {
    this._password = this.hashPassword(newPassword);
    return this._password;
  }
  hashPassword(password) {
    if (!password) throw new Error("Empty password");
    return crypto
      .createHash("sha256")
      .update(password, "binary")
      .digest("base64");
  }
}
module.exports = User;
