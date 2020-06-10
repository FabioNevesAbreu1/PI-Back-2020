const Institution = require('../models/Institution')
const Interest = require('../models/Interest')
const User = require('../models/Users')

const Exeption = require('../../error')
var jwt = require('jsonwebtoken');
module.exports = { 
    async Login(req, res, next){
        const { Username, Password } = req.body

        Institution.findOne({Username: Username, Password: Password})
        .then(institution => {
            if(!institution){
                
                User.findOne({Username: Username, Password: Password})
                .then(user => {

                    if(!user) return Exeption(res, 1001)

                    return res.send({
                        token: jwt.sign(JSON.stringify(user), process.env.SECRET),
                        type: 'User'
                    })

                })

            }else{
                return res.send({
                    token: jwt.sign(JSON.stringify(institution), process.env.SECRET),
                    type: 'institution'
                })
            }


        })
    }
    

}
