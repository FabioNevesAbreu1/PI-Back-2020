
const dict = {
    "1000": "Falta parametros para a criação de usuario",
    "1001": "Não foi encontrado nenhum usuario no banco com este login e senha",
    "1002": "Ja existe um usuario com este nome de usuario no banco de dados",
    "1003": "Nome de Intituição invalido",

}

Exeption = (res, code) => {
    var Err = dict[code]
    var resp = {
        code: code,
        msg: Err
    }
    return res.send(resp)
}

module.exports = Exeption