const jwt = require('jsonwebtoken');

let PRIVATE_KEY = 'apflqwdkeqf';

class JwtAuth {

    getToken(data,type){
        console.log(data);
        return type === 'refresh' ? 
        jwt.sign(data,PRIVATE_KEY,{
            issuer:'admin'
        })
        :
        jwt.sign(data,PRIVATE_KEY,{
            expiresIn:'15m',
            issuer:'admin'
        });
    }
    verify(token){
        try {
            return jwt.verify(token, PRIVATE_KEY);
        } catch (err) {
            if (err.message === 'jwt expired') {
                return 'expired token';
            } else {
                return 'invalid token';
            }
        }
    }
    refreshAccessToken(refresh){
        let verify = this.verify(refresh);
        if(typeof verify === 'string')
            return verify;
        return this.getToken(verify,'access');
    }
}

module.exports = JwtAuth;