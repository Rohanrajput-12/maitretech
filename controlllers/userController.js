const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register =   (req,res,next ) =>  {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
    
        let user = new User ({
            email : req.body.email,
            username : req.body.username,
            password: hashedPass
            
            
        })
        user.save()
        .then(user => {
            res.json({
            message: 'user added succcessfully!' 
        })
    })
    .catch (error => {
        res.json({
            message: 'an error occured'
           })
        })
      })
    }

    const login = (req,res,next) =>{
        var username = req.body.username
        var password = req.body.password

        User.findOne({$or: [{username:username},{email:username}]})
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name: user.name}, 'verysecretkey', {expiresIn : '1h'})
                        res.json({
                            message : 'login successful!',
                            token 

                        })
                    }else{
                        res.json({
                            message : 'password doesnot match'
                        })
                    }
                })                
            }else{
                res.json({
                    messaeg: 'no user found!'
                })
            }
        })
    }

    //updatePassword

    const updatePassword = async(req,res) => {
        try {

            const username = req.body.username;
            const password = req.body.password;

            const data =  await User.findOne( {_id:username})

            if(data)
            {
                const newPassword = await password(password);

                const userData = await User.findByIdAndUpdate({_id:username},{$set:
                {
                    password:newPassword
                }});
                res.status(200).send({success: true,msg:'your password has been updated'})
                
            }else{
                res.status(200).send({success :false,msg: 'username can not find'});
            }

        }catch (error) {
            res.status(400).send(error.message);

        }
    }
    

    module.exports = {
        register, login, updatePassword
    }
    
    
