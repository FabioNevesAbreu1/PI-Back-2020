const User = require('../models/Users')
const Institution = require('../models/Institution')
const Interest = require('../models/Interest')

const Exeption = require('../../error')
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


//  return next(new ErrorHandler(6008));

module.exports = {
    async UserActivate(req, res, next){

        const { Name, Username ,CPF ,Street ,City ,Neighborhood ,Complements ,Password ,Email  } = req.body      
    
        

        if( !Name || !Username || !CPF || !Street || !City || !Neighborhood || !Complements || !Password || !Email ) return Exeption(res, 1000)
       
        User.find({$or: [{Username: Username}, {CPF: CPF}]})
        .then(Usuario => {
            
            // se encontrar algum usuario no banco
            if(Usuario.length) return Exeption(res, 1002)

            
            User.create(req.body)
            .then(data => {
                //var token = jwt.sign(JSON.stringify(data), process.env.SECRET)
                return res.send({
                    data: data
                })
            })
            
        })
        .catch(err => {
            return res.send(err)
        })

    },
    async Verify(req, res, next){
        const { token }= req.headers

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            req.tokenData = decoded
            next()
        });
        
    },

    async Login(req, res, next){
        const { Username, Password } = req.body

        User.findOne({Username: Username, Password: Password})
        .then(user => {
            if(!user) return Exeption(res, 1001)
            
            return res.send({
                token: jwt.sign(JSON.stringify(user), process.env.SECRET)
            })
        })
    },

    async FindInstitution(req, res, next){
        var  { Option } = req.body
        const { Neighborhood, City } = req.tokenData

        //return res.send(JSON.stringify(req.tokenData))
        var UserFilter = ( Option == 'City' ? City : Neighborhood )

        if( Option == 'City' ){
            Institution.find({  'City' : UserFilter, Active: 'true' })
            .then(institution => {
                return res.send(institution)
            })
        }else{
            Institution.find({  'Neighborhood' : UserFilter, Active: 'true' })
            .then(institution => {
                return res.send(institution)
            })
        }
    },
    async UserInterest(req, res, next){
        const { Enterprise, DataDonation, DateDonation } = req.body // outro nome para institution, para não conflitar com a tabela  5e6a0835078292088cb3a160
        const { _id } = req.tokenData

        Institution.findOne({Name: Enterprise})
        .then(institution => {
            if(!institution) return Exeption(res, 1003)
            Interest.create({Institution: institution._id, User: _id, DataDonation: DataDonation, DateDonation: DateDonation })
            .then(resposta => {
                return res.send(resposta)                
            })
        })

    },
    async getNome(req,res,next){
        return res.send(req.tokenData.Name)
    },

}
