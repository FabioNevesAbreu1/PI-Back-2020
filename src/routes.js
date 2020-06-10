const express = require('express');

const routes = express.Router(); 

const User = require('./app/controllers/User')
const Institution = require('./app/controllers/Institution')
const ControlerLogin = require('./app/controllers/ControlerLogin')
// ControlerLogin
// verificação de usuario, toda requisição de usuario tem que chamar ela
routes.get('/UserVerify', User.Verify);
routes.post('/InstitutionVerify', Institution.Verify );

// ROTAS PARA USUARIO
// cadastro de usuario
routes.post('/User', User.UserActivate);
// login de usuario
routes.post('/LoginUser', User.Login);
// buscar as instituições
routes.post('/FindInstitution', User.Verify, User.FindInstitution);
// interesse pela instituição
routes.post('/Interest', User.Verify, User.UserInterest);
// pegar o nome
routes.get('/getName', User.Verify, User.getNome);

routes.get('/getFotoUser/:id', User.Verify, Institution.getFoto);

routes.post('/Login', ControlerLogin.Login);

// ROTAS PARA INSTITUIÇÃO
// cadastro de instituição
routes.post('/Institution', Institution.InstitutionActivate );
// login de instituição
routes.post('/LoginInstitution', Institution.Login);
// alterar descrição
routes.post('/AlterDescription', Institution.Verify, Institution.AlterDescription);
// buscar dados da instituição
routes.get('/GetInfo', Institution.Verify, Institution.GetInfo);
// buscar usuarios que querem doar
routes.get('/GetUsers', Institution.Verify, Institution.FindUsers);
// colocar a foto no banco
routes.post('/foto', Institution.Verify, Institution.foto);
// rota para filtro
routes.get('/filtro/:tipo', Institution.Verify, Institution.filtro);

routes.get('/getFoto', Institution.Verify, Institution.showImage);


module.exports = routes;