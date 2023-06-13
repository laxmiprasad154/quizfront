import axios from "axios";
export const BASE_URL = 'http://localhost:5180/';

export const ENDPOINTS = {
    user: 'user',
    question:'question',
    getAnswers : 'question/getanswers',
    randomQuestions : 'question/random',
}
export const createAPIEndpoint = (endpoint) => {

    let userid = localStorage.getItem("userId");
    let url = BASE_URL + 'api/' + endpoint + '/';
  
    // Get the token from local storage
    const token = localStorage.getItem("token");
  
    // Create a custom axios instance with headers
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
  
    return {
      fetch: () => axiosInstance.get(url),
      fetchById: (id) => axiosInstance.get(url + id),
      post: (newRecord) => axiosInstance.post(url, newRecord),
      put: (id, updatedRecord) => axiosInstance.put(url + userid, updatedRecord),
      delete: (id) => axiosInstance.delete(url + id),
    };
  };