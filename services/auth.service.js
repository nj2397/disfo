require('dotenv').config();
const AuthUsers = require("../models/auth.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    secret = process.env.ADMIN_KEY;
    create = async ( data ) => {
        const searchUser = await AuthUsers.findOne({ email: data.email })
        if ( searchUser )
            return "User already exist";
        const cryptedPassword = await this.encrypt( data.password )
        const authBody = new AuthUsers( { ...data, password: cryptedPassword } );
        const result = await authBody.save();
        return result;
    }

    login = async ( data ) => {
        const response = await AuthUsers.findOne({ username: data.username });
        if ( response ) {
            const verifyAccess = await this.verifyPassword ( data.username, data.password )
            if ( verifyAccess ) {
                const accessToken = this.generateToken( response.id )
                // console.log(typeof accessToken)
                return {
                    userId: response.id,
                    isLoggedIn: true,
                    token: accessToken,
                };
            }
                
        }
        return {
            isLoggedIn: false
        };
    }

    encrypt = async ( password ) => {
        const hashedPassword = await bcrypt.hash( password, await bcrypt.genSalt() );
        return hashedPassword;
    }

    verifyPassword = async ( username, password ) => {
        const user = await AuthUsers.findOne({ username });
        const isValid = await bcrypt.compare ( password, user.password );
        if ( isValid ) {
            return user;
        }
        return null;
    }   

    generateToken = ( id ) => {
        try {
            const token = jwt.sign({ id }, this.secret, {
                expiresIn: '1h'
            }) 
    
            return token
        } catch ( error ) {
            throw error;
        }
    }
}

module.exports = AuthService