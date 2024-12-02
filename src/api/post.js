import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const fetchPostList = async () => {
    try{
        const response = await api.get('/posts');
        return response.data;
    } catch(error){
        console.error("게시글 목록 요청 중 오류 발생 : ", error);
        throw error;
    }
};