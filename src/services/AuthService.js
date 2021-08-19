import {applyAuthTokenInterceptor, clearAuthTokens, getRefreshToken, setAuthTokens} from 'axios-jwt';
import axios from 'axios';
import resolve from "resolve";
var qs = require('qs');

const url = "http://localhost:8084/oauth/token";

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosAuth = axios.create({ baseURL: 'http://localhost:8084' })

// 2. Define token refresh function.
const requestRefresh = async () => {
    try{
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        console.log("Access token sigue siendo válido por ", 0, ' segundos');
        if(new Date(tokenExpiration).getTime() < new Date().getTime()){
            console.log("Se utilizará token almacenado en local");
            return localStorage.getItem('accessToken');
        }

        console.log("Access token vencido, se solicitará un nuevo access token");
        const data = {
            refresh_token: getRefreshToken(),
            grant_type: "refresh_token",
        };

        const auth = {
            username: "web",
            password: "web",
        };

        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify(data),
            auth: auth,
            url,
        };

        let response;
        try{
            response = await axios(options);
        }catch (error){
            console.log("Refresh token vencido, se cerrará la sesión");
            logout();
            return;
        }

        //refresh token data
        saveTokenExpirationTime(response.data.expires_in);
        setAuthTokens({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token
        })
        return response.data.access_token;
    }catch (error){
        console.log("Ocurrió un error, se cerrará la sesión - ", error);
        logout();
        return;
    }
};

// 3. Apply interceptor
applyAuthTokenInterceptor(axiosAuth, {
    requestRefresh,  // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
    header: "Authorization",  // header name
    headerPrefix: "Bearer ",  // header value prefix
})

// 4. Logging in
export const login = async (username, password) => {
    const url = "http://localhost:8084/oauth/token";

    const data = {
        username: username,
        password: password,
        grant_type: "password",
    };

    const auth = {
        username: "web",
        password: "web",
    };

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
        auth: auth,
        url,
    };

    const response = await axios(options);

    console.log(JSON.stringify(response, null, 2))

    // save tokens to storage
    saveTokenExpirationTime(response);
    setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    })
    return true;
}

export const logout = () => {
    localStorage.clear();
    clearAuthTokens();
    //refresh page
    window.location.replace('');
}

const saveTokenExpirationTime = (expires_in) => {
    localStorage.clear();
    const tokenExpiration = ((Date.now()/100) + expires_in);
    localStorage.setItem("tokenExpiration", tokenExpiration);
}
