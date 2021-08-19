import axios from 'axios';
import {axiosAuth} from "./AuthService";

const WORK_API_BASE_URL = "http://localhost:8084/api/obra";

class WorkService {

    getWorks(){
        return axiosAuth.get(WORK_API_BASE_URL);
    }

    createWork(work){
        return axiosAuth.post(WORK_API_BASE_URL, work);
    }

    getWorkById(workId){
        return axiosAuth.get(WORK_API_BASE_URL + '/' + workId);
    }

    updateWork(work, workId){
        return axiosAuth.put(WORK_API_BASE_URL + '/' + workId, work);
    }

    deleteWork(workId){
        return axiosAuth.delete(WORK_API_BASE_URL + '/' + workId);
    }
}

export default new WorkService()
