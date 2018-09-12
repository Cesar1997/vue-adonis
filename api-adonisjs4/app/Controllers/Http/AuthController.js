'use strict'
const User = use('App/Models/User');

class AuthController {
    async login ({request, response, auth}) {
        const {user} = request.all();
        const logged = await auth.attempt(user.email, user.password, true); //cuando se le pasa como parametro true. devuelve datos del usaurio
        return response.json(logged);
    }

    async register({request , response}) {
        const {user} = request.all();

        const userInstance = new User(); 
        userInstance.username = user.username;
        userInstance.email    = user.email;
        userInstance.password = user.password;
        await userInstance.save();

        return response.json(userInstance);    
    }

    async profile({request,response,auth}) {
        const userInput = request.input('user');

        let user = await auth.getUser();
        user.email = userInput['email'];
        user.username = userInput["username"]
        await user.save();
        const logged = await auth.generate(user, true)
        return response.json(logged);
    }
}

module.exports = AuthController
