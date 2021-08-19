import axios from 'axios';
import {axiosAuth} from "./AuthService";

const CLIENT_API_BASE_URL = "http://localhost:8084/api/cliente";

class ClientService {

    getClients(){
        return axiosAuth.get(CLIENT_API_BASE_URL);
    }

    createClient(client){
        return axiosAuth.post(CLIENT_API_BASE_URL, client);
    }

    getClientById(clientId){
        return axiosAuth.get(CLIENT_API_BASE_URL + '/' + clientId);
    }

    getClientByWorkId(workId){
        return axiosAuth.get(CLIENT_API_BASE_URL + '/?idObra=' + workId);
    }

    updateClient(client, clientId){
        return axiosAuth.put(CLIENT_API_BASE_URL + '/' + clientId, client);
    }

    deleteClient(clientId){
        return axiosAuth.delete(CLIENT_API_BASE_URL + '/' + clientId);
    }
}

export default new ClientService()
