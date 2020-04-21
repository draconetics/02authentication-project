const User = require("./user.model");
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create( userBody ) {
    return this.userRepository.create( userBody );
  }

  async createAndLogin( userBody ) {
    let user = await this.userRepository.create( userBody );
    let token = await user.generateAuthToken()
    console.log("token: " + token)

    return {user, token: token, info:"nothing"};
  }

  async getUser(id) {
    return this.userRepository.getUser(id);
  }

  getAllUsers(){
      //console.log("service : " + this.userRepository.getAllUsers())
      //console.log("service" + this.userRepository.getAllUsers())
      return this.userRepository.getAllUsers()
  }

  async login( loginBody ) {
      
    const { email, password } = loginBody
    
    try{
        const user = await this.userRepository.findByCredentials2( email, password )
        return {results: user}
    }catch(e){
        throw e
    }
    

        
      // throw new Error("some happen")
      // const { email, password } = loginBody
      // try{
      //     const user = await User.findByCredentials( email, password )
      // }catch(e){
      //     console.log("error ocurred")
      //     throw new Error("some happen")
      // }
      
      // console.log(user)
      // if (!user) {
      //     //return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      //     console.log("user does not exist")
      //     throw new Error("Login failed! Check authentication credentials")
      // }
  }
}

module.exports = UserService;
