const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();


const postSignup = async (req, res) => {
    try {
        const result = await AuthServiceInstance.create(req.body);
        // console.log( result );
        if( result === 'User already exist' )
            res.status(400).json( result )
        else res.status(200).json( result )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}


const postLogin = async (req, res) => {
    try {
        const result = await AuthServiceInstance.login( req.body );
        if ( result.isLoggedIn ) {
            // return res.status(200).cookie('token', result.token, { maxAge: 86400000 }).json( result );
            res.cookie('token', result.token, { maxAge: 86400000 })
            return res.status(200).json( result );
        }
        res.status(404).json({ message: 'Invalid Credentials' });
    } catch ( error ) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { 
    postSignup,
    postLogin
}