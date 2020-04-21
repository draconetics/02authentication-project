const { validateUser, validateLogin, isEmpty } = require('../util/user.validation') ;
const { ErrorHandler } = require('../exception/ErrorHandler')

class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    register(req, res) {

        const errorUser = validateUser( req.body )

        if( !isEmpty(errorUser) )
            return res.status(422).send(errorUser)

        this.userService.createAndLogin( req.body )
              .then(data=>{
                  return res.status(201).json(data);
              })
              .catch(e=> {
                  const error = new ErrorHandler(422, "SERVER_ERROR", e)
                  return res.status(500).json(error)
              })
    }
  
    getUser(req, res) {
      const { id } = req.params;
  
      this.userService.getUser(id)
          .then(data =>{
              return res.send({results: data})
          })
          .catch(e => {
              const error = new ErrorHandler(500, "SERVER_ERROR", e)
              return res.status(500).json(error)
          });
      
    }

    getAllUsers(req, res) {
        this.userService.getAllUsers()
        .then(data => {
            res.status(200).send({results:data});
        }).catch((e) => {
            const error = new ErrorHandler(500, "SERVER_ERROR", e)
            return res.status(500).json(error)
        })
        //console.log(userList)
        
    }

    login(req, res) {
        const errorUser = validateLogin( req.body )

        if( !isEmpty(errorUser) )
            return res.status(422).json(errorUser)

        // await this.userService.login( req.body )
        //     .then(data => {
        //         console.log("user fouinded")
        //         res.status(200).json(data);    
        //     })
        //     .catch((e) => {
        //         const error = new ErrorHandler(500, "SERVER_ERROR", e)
        //         return res.status(500).json(error)
        //     })
            
        
        this.userService.login( req.body )
            .then(data => {
                console.log("user fouinded")
                return res.status(200).json(data);    
            })
            .catch(e=>{
                //console.log("controller")
                //console.log(e.error)
                const error = new ErrorHandler(500, "SERVER_ERROR", e)
                return res.status(500).json(error)
            })
                            
            
                                }
  }
  
  module.exports = UserController;