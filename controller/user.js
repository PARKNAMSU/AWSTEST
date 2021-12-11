const { User } = require('../model/user');
const JwtAuth = require('../service/jwtAuth');
const auth = new JwtAuth();
class UserController {

    constructor(){
        console.log('made User Controller');
    }
    async create(req,res){
        let body = req.body;
        if(
            !body.email,
            !body.password
        ){
            await res.status(400).send({
                message:'email or password was not received'
            })
        }
        User.findOne({
            where:{
                email:body.email
            }
        })
        .then(data => {
            if(data !== null)
                res.status(403).send({message:'email aleady has'});
            
            User.create(body)
            .then(data => {
                res.status(201).send({
                    message:'created ok'
                });
            })
            
        });
    }
    async login(req,res){
        let email = req.params.email;
        let password = req.body.password;
        if(
            !email,
            !password
        ){
            await res.status(400).send({
                message:'email or password was not received'
            });
        }
        User.findOne({
            attributes:['email','firstName','lastName'],
            where:{
                email,
                password
            }
        })
        .then(data => {
            if(data === null){
                res.status(403).send({
                    message:'email or password not correct'
                });
            }
            let accessToken = auth.getToken(data.dataValues,'access');
            let refreshToken = auth.getToken(data.dataValues,'refresh');

            res.cookie('refreshToken', refreshToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                path: '/',
                sameSite: 'none'
            });

            res.status(201).send({
                message:'login success',
                data:{
                    accessToken,
                    user:data.dataValues
                }
            });
        })    
    }
}

module.exports = UserController;