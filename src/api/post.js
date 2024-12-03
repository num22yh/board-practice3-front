import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const createPost = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 생성 중 오류 발생:", error);
    throw error;
  }
};

export const fetchPostList = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
      return response.data;
    } catch(error){
        console.error("게시글 목록 요청 중 오류 발생 : ", error);
        throw error;
    }
};


export const fetchPostDetail = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
    return response.data;
};



