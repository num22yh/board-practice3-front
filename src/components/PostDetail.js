import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostDetail } from "../api/post"; 

const PostDetail = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    
    const [post, setPost] = useState({
        title: "",
        author: "",
        categoryName: "",
        createdAt: "",
        updatedAt: "",
        viewCount: 0,
        content: "",
        attachments: [],
    });

    useEffect(() => {
        const loadPostDetail = async () => {
            try {
                const data = await fetchPostDetail(id); 
                setPost(data);
            } catch (err) {
                setError("게시글을 불러오는 중 오류가 발생했습니다.");
            } 
        };

        loadPostDetail();
    }, [id]);

    if (error) return <div>{error}</div>; 
    

    return (
        <div>
            <h1>{post.title}</h1>
            <p><strong>작성자:</strong> {post.author}</p>
            <p><strong>카테고리:</strong> {post.categoryName}</p>
            <p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleString()}</p>
            <p><strong>수정일:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
            <p><strong>조회수:</strong> {post.viewCount}</p>
            <p><strong>내용:</strong></p>
            <p>{post.content}</p>

            {post.attachments && post.attachments.length > 0 && ( 
                <div>
                    <h3>첨부파일</h3>
                    <ul>
            {post.attachments.map((attachment, index) => (
                    <li key={index}>
                      <a
                        href={`${process.env.REACT_APP_API_URL}/posts/download/${attachment.storedName}`}
                        download={attachment.originalName} 
                        rel="noopener noreferrer">
                        {attachment.originalName}
                    </a>
                </li>
            ))}
        </ul>
                </div>
            )}

            <button onClick={() => (window.location.href = "/")}>목록으로</button>
        </div>
    );
};

export default PostDetail;
