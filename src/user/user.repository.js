const User = require("./user.model");

class UserRepository {
  constructor() {
    this.User = User;
    //this.user.sync({ force: true });
  }

  async create( userBody ) {
    console.log("repository" + userBody)
    let user = new this.User( userBody );
    await user.save()
    return user
  }

  async getUser(id) {
    return this.User.findOne({ id });
  }

  async getAllUsers() {
      console.log("repository")
      // let userList = []
      // try{
      //     userList = await this.User.find({});
      //     //console.log(userList)
      // }catch(e){
      //     const error = new ErrorHandler(500, "SERVER_ERROR", e)
      //     return res.status(500).json(error)
      // }
      // //console.log(userList)
      // return userList

      return await this.User.find({})
          // .catch(e => {
          //     const error = new ErrorHandler(500, "SERVER_ERROR", "no se puede encontrar los usuarios")
          //     return res.status(500).json(error)
          // })
  }

  findByCredentials( email, password ) {
      return this.User.findByCredentials( email, password );
  }

  async findByCredentials2(){
      // Search for a user by email and password.
      //console.log("find schedules")
      let user = {}
      await User.findOne({ email} )
              .then(data=>{
                  user = data
              })
              .catch(e => {
                  throw {
                    error: "error on finding by email",
                    details: e
                  }
              })
      if (!user) {
          throw { error: 'Invalid login credentials' }
          //throw { error: 'Invalid login credentials' }
      }
      //console.log("user founded: ")
      //console.log(user);
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
          console.log("error on the password")
          throw { error: 'Invalid login credentials' }
      }
      //console.log("password founded: ")
      //console.log(isPasswordMatch);
      return user
  }
}

module.exports = UserRepository;
