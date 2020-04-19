const User = require("./user.model");

class UserRepository {
  constructor() {
    this.user = User;
    //this.user.sync({ force: true });
  }

  async create(name, email, password) {
    return this.user.create({
      name,
      email,
      password
    });
  }

  async getUser(id) {
    return this.user.findOne({ id });
  }

  async getAllUsers() {
      return this.user.find()
  }
}

module.exports = UserRepository;
