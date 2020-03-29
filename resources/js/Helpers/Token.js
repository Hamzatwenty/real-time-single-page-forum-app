class Token {

    isValid(token){
        const payload = this.payload(token);
        if (payload){
            var server = payload['iss'];
            if (server == "http://localhost:8080/realtimeApp/public/api/auth/login"){
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
        return JSON.parse(atob(payload))
    }
}

export default Token = new Token();