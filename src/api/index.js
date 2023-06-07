import axios from 'axios'

export const BASE_URL = 'http://localhost:5180/';

export const ENDPOINTS = {
    user: 'user',
    question:'question',
    getAnswers : 'question/getanswers'
}

export const createAPIEndpoint = (endpoint) => {

    let userid = localStorage.getItem('userId')

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + userid, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}