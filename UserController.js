const User = require('./User')
const moment = require('moment');
const { format } = require('date-fns');
const { ObjectId } = require('mongodb');

class UserController {
    async signin(req,res){
        try{
            const currentDate = moment();
            const {name , email, password }= req.body
            const users = await User.find({email})
           

            if(users.length === 0){  
                
                const user = await User.create({name , email, password,status:'active',lastLogin:currentDate.format('yyyy-MM-dd HH:mm:ss')})

                console.log('bpb');
                return res.status(200).json(user)
            }else{
                return res.status(200).json('false')
            }

        }catch (e){
            res.status(500).json(e)
        }
    }
    async login(req,res){
        try{
            const {email , password} = req.body

            const user = await User.find({email: email}) 

            

            if(user[0].password === password && user[0].status != 'blocked'){
                res.status(200).json(user)
            }else{
                res.status(200).json('false')
            }
        }catch (e){
            res.status(500).json(e)
        }
    }
    async block(req,res){
        try{
            const users = req.body.users
            const changeStatus = req.body.type
            
            const updatedUsers = []

    
            users.forEach( async (item)=>{

                if(!item){
                    res.status(400).json({message:'no id'})
                 }
                 const user = await User.findById(item)
                 
                 user.status = changeStatus
                 const updateUser = await User.findByIdAndUpdate(item , user , {new:true})
                 
                 updatedUsers.push(updateUser)
            })



            return res.status(200).json(updatedUsers)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params

            if(!id){
                res.status(400).json({message:'no id'})
            }
            const user = await User.findByIdAndDelete(id)
            return res.json(user)

        }catch (e){
            res.status(500).json(e)
        }
    }
    async users(req,res){
        try{
            const users = await User.find()
            res.json(users)
        }catch (e){
            res.status(500).json(e)
        }

    }
}

module.exports = new UserController()