const { validateUser, isEmpty } = require('../util/user.validation') ;
const { ErrorHandler } = require('../exception/ErrorHandler')

class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    async register(req, res) {

        const errorUser = validateUser( req.body )

        if( !isEmpty(errorUser) )
            return res.status(422).send(errorUser)

        await this.userService.create(name, email, password)
              .then(data=>{
                  return res.status(201).send({results: data});
              })
              .catch(e=> {
                  const error = new ErrorHandler(422, "SERVER_ERROR", e)
                  return res.status(500).json(error)
              })
    }
  
    async getUser(req, res) {
      const { id } = req.params;
  
      await this.userService.getUser(id)
          .then(data =>{
              return res.send({results: data})
          })
          .catch(e => {
              const error = new ErrorHandler(500, "SERVER_ERROR", e)
              return res.status(500).json(error)
          });
      
    }

    async getAllUsers(req, res) {
    
        await this.userService.getAllUsers()
            .then(data =>{
                return res.send({results: user})
            })
            .catch(e => {
                const error = new ErrorHandler(500, "SERVER_ERROR", e)
                return res.status(500).json(error)
            });
        
    }
  }
  
  module.exports = UserController;