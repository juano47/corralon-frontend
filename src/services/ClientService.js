import axios from 'axios';

const CLIENT_API_BASE_URL = "http://localhost:8084/api/cliente";

class ClientService {

    getClients(){
        return axios.get(CLIENT_API_BASE_URL);
    }

    createClient(client){
        return axios.post(CLIENT_API_BASE_URL, client);
    }

    getClientById(clientId){
        return axios.get(CLIENT_API_BASE_URL + '/' + clientId);
    }

    getClientByWorkId(workId){
        return axios.get(CLIENT_API_BASE_URL + '/?idObra=' + workId);
    }

    updateClient(client, clientId){
        return axios.put(CLIENT_API_BASE_URL + '/' + clientId, client);
    }

    deleteClient(clientId){
        return axios.delete(CLIENT_API_BASE_URL + '/' + clientId);
    }
}

export default new ClientService()
