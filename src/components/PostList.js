import React, { useEffect, useState } from 'react';
import { fetchPostList } from '../api/post';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPostList();
                setPosts(data); // 게시글 데이터를 상태에 저장
            } catch (err) {
                setError('게시글을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>게시글 목록</h1>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th>작성일</th>
                        <th>수정일</th>
                        <th>카테고리</th>
                        <th>첨부파일</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id}>
                            <td>{index + 1}</td>
                            <td>{post.author}</td>
                            <td>{post.title}</td>
                            <td>{post.viewCount}</td>
                            <td>{new Date(post.createdAt).toLocaleString()}</td>
                            <td>{new Date(post.updatedAt).toLocaleString()}</td>
                            <td>{post.categoryName}</td>
                            <td>{post.hasAttachments ? '📎' : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;
