const Institution = require('../models/Institution')
const Interest = require('../models/Interest')
const User = require('../models/Users')
const Exeption = require('../../error')
var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const imageToBase64 = require('image-to-base64');

//  return next(new ErrorHandler(6008));

module.exports = { 
    async InstitutionActivate(req, res, next){

        const { Name, Username ,CNPJ ,Street ,City ,Neighborhood ,Complements ,Password ,Email  } = req.body      
    
        if( !Name || !Username || !CNPJ || !Street || !City || !Neighborhood || !Complements || !Password || !Email ) return Exeption(res, 1000)
       
        Institution.find({$or: [{Username: Username}, {CNPJ: CNPJ}]})
        .then(institution => {
            
            // se encontrar algum usuario no banco
            if(institution.length) return Exeption(res, 1002)


            Institution.create(req.body)
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
        

        jwt.verify(token, process.env.SECRET, function(err, decoded) { // TODO: buscar no banco para saber se existe esta instituição
            req.tokenData = decoded
            next()    
        });
        
    },

    async Login(req, res, next){
        const { Username, Password } = req.body

        Institution.findOne({Username: Username, Password: Password})
        .then(institution => {
            if(!institution) return Exeption(res, 1001)

            return res.send({
                token: jwt.sign(JSON.stringify(institution), process.env.SECRET)
            })
        })
    },

    async AlterDescription(req, res){
        const { Description } = req.body
        const { _id } = req.tokenData

        Institution.findOneAndUpdate({_id: _id}, {Description: Description})
        .then(result => {
            return res.send(result)
        })
        
    },
    async FindUsers(req, res){
        const { _id } = req.tokenData

        Interest.find({Institution: _id})
        .then(result => {

            var request = []

            result.forEach((e, i) => {
                request.push(new Promise((resolve, reject) => {
                    User.findOne({_id: e['User']})
                    .then((content) => {
                        resolve(content)
                    })
                    .catch((err) => {
                        reject(err)
                    })

                }))
            })

            Promise.all(request).then( async (content) => {
                var retorno = []
                result.forEach((e,i) => {

                    var achou = content.find(x => {
                        return String(x['_id']) == String(e['User'])
                    }) // vai retornar os usuarios
                    
                    retorno.push({
                        Usuario: achou,
                        Doacao: e
                    })

                   

                })
                
                return res.send(retorno)

            })
            

        })
        
    },

    async GetInfo(req, res){
        const { _id } = req.tokenData

        Institution.find({_id: _id})
        .then(result => {
            
            return res.send(result)
        })
        
    },

    async foto(req, res){

        /*const { source } = req.body

        let data = source.split('base64,');
        let base64 = data[1];
        let mimeType = data[0].match(/\/(.*);/)[1]
        
        const saveImage = (base64, mimeType, fileName, path) => {
            try {
                let nomeArquivo = `${path}${fileName}`
                console.log(`${nomeArquivo}.${mimeType}`)
        
                fs.writeFileSync(`${nomeArquivo}.${mimeType}`, base64, 'base64');
        
                return res.json({ error: false, msg: "Image salva com sucesso", details: path })
            } catch (e) {
                return res.status(500).json({ error: true, msg: 'Erro ao salvar imagem', details: e })
            }
        }

        saveImage(base64, mimeType, req.tokenData['_id'], './src/imagens/');*/
        
    },

    async showImage(req, res){
        let nomeArquivo = req.tokenData['_id'];
        let absolutePath = path.resolve(`src/imagens/${nomeArquivo}.jpeg`);
        imageToBase64(absolutePath) // you can also to use url
            .then(
                (response) => {
                    return res.status(200).send(response)
                }
            )
            .catch(
                (error) => {
                    console.log(error); //Exepection error....
                }
            )
    },

    
    async filtro(req, res){
        var tipo = req.params.tipo

        var obj = {}
        obj[`${tipo}`] = req.tokenData[`${tipo}`]
        
        console.log(obj)
        Institution.find(obj)
        .then((e) => {
            return res.send(e)
        })
        .catch((err) => {

        })
    },

    async getFoto(req, res){
        let nomeArquivo = req.params.id
        let absolutePath = path.resolve(`src/imagens/${nomeArquivo}.jpeg`);
        return res.status(200).sendFile(`${absolutePath}`);
    },

    

}
