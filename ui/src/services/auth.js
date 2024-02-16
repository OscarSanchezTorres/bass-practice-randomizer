import instance from "axios";


const authenticate = async (email, password) => {
    return await instance.post("http://localhost:3000/authentication", {email, password});

}


const AuthService = {authenticate}

export default AuthService;