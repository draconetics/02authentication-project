const { validateUser, validateLogin } = require('../util/user.validation') ;
const LogHandler = require('../exception/LogHandler')

class UserController {
    constructor(userService) {
      this.userService = userService;
      this.logger = new LogHandler()
    }
  
    async register(req, res) {
        try{            
            console.log(req.body)
            validateUser( req.body )
            console.log("pasa validacion")
            const data = await this.userService.createAndLogin( req.body )
            return res.status(201).json(data);
        }
        catch(e){
            console.log()
            this.logger.logError(e, req)
            return res.status(this.logger.statusCode).json(this.logger.getClientError())
        }
    }
  
    getUser(req, res) {
      const { id } = req.params;
  
      console.log("this is the id : " + id)
      this.userService.getUser(id)
          .then(data =>{
                return res.status(200).send(data)
          })
          .catch(e => {
                this.logger.logError(e, req)
                return res.status(this.logger.statusCode).json(this.logger.getClientError())
          });
      
    }

    getAllUsers(req, res) {
        
        this.userService.getAllUsers()
            .then(data => {
                res.status(200).send(data);
            }).catch((e) => {
                this.logger.logError(e, req)
                return res.status(this.logger.statusCode).json(this.logger.getClientError())
            })
        //console.log(userList)
        
    }

    async login(req, res) {
        
        
        try{
            console.log(req)
            validateLogin( req.body )
            const data  = await this.userService.login( req.body )    
            
            return res.status(200).json(data);    
        }catch(e){
            this.logger.logError(e, req)
            return res.status(this.logger.statusCode).json(this.logger.getClientError())
        }           
            
    }

    logout(req, res){

        // Log user out of the application
        this.userService.logout( req.user, req.token )
            .then(data => {
                console.log("user logout")
                return res.status(200).json(data);    
            })
            .catch(e=>{
                this.logger.logError(e, req)
                return res.status(this.logger.statusCode).json(this.logger.getClientError())
            })   

    }

    getUserProfile(req, res) {
        let msg = {msg:"user logged in", user: req.user, toke: req.token}
        res.status(200).json(msg)
    }
}
  
module.exports = UserController;