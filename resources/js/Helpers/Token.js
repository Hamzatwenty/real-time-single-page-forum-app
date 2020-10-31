class Token {

    isValid(token){
        const payload = this.payload(token);
        if (payload){
            var server = payload['iss'];
            if (server == "http://localhost:8080/realtimeApp/public/api/auth/login" || server =="http://localhost:8080/realtimeApp/public/api/auth/signup"){
                return true;
            }
            else{
                return false;
            }
        }
        return false
    }

    payload(token){
        const payload = token.split('.')[1];

        return  this.decode(payload)
    }

    decode(payload){
        if (this.isBase64(payload)){
            return JSON.parse(atob(payload))
        }
        return false

    }

    isBase64(str){
        try {
            return btoa(atob(str)).replace(/=/,"") == str
        }
        catch (err) {
            return false
        }
    }
}

export default Token = new Token();