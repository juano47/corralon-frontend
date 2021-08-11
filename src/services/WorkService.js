import axios from 'axios';

const WORK_API_BASE_URL = "http://localhost:8084/api/obra";

class WorkService {

    getWorks(){
        return axios.get(WORK_API_BASE_URL);
    }

    createWork(work){
        return axios.post(WORK_API_BASE_URL, work);
    }

    getWorkById(workId){
        return axios.get(WORK_API_BASE_URL + '/' + workId);
    }

    updateWork(work, workId){
        return axios.put(WORK_API_BASE_URL + '/' + workId, work);
    }

    deleteWork(workId){
        return axios.delete(WORK_API_BASE_URL + '/' + workId);
    }
}

export default new WorkService()
