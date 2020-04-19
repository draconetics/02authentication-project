
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(name, email, password) {
    return this.userRepository.create(name, email, password);
  }

  async getUser(id) {
    return this.userRepository.getUser(id);
  }

  async getAllUsers(){
      return this.userRepository.getAllUsers()
  }
}

module.exports = UserService;
