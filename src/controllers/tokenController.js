const jwt = require('jsonwebtoken');

class TokenController{

    //Metodo
    constructor(){

    }

    //Funcion para verificar si usuario esta autenticado o no
    // verifyAuth=(req, res, next)=>{
    //     //Captura de token
    //     const token = this.getToken(req);
    //     //verficacion de token, puede devolver error o un decode
    //     jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error,decode)=>{
    //         if (error){
    //             res.status(401).json({info: 'Usuario no autorizado'});
    //         }else{
    //             next();
    //         }
    //     });
    // }

    //Properties Initializer

    getToken = (req)=>{
         //obtener datos del token del usuario para manejar sus productos
        //hay varias maneras pero se esta haciendo aca de la cabecera de la peticion
        //se accede a la peticion, cabecera, zona de la autorizacion y luego se parte esa parte de la cadena donde encuentre un espacio
        //Al ser devuelto como un arreglo, se puede accedder a esa posicion 1
        let token = null;
        let authorization= req.headers.authorization;

        //Si hay token hace todo el proceso
        if (authorization != null && authorization != undefined){
            let arrayAuth=(authorization.split(" "));

            token = arrayAuth[1];
        }
        return token;
        //para que este controlador se encargue de manejar el uso del token en otros lados

    }
}
module.exports = TokenController;