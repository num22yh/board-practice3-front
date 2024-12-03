import React, { useState, useEffect } from "react";
import { createPost } from "../api/post"; 
import axios from "axios";

const PostCreateForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    author: "",
    password: "",
    confirmPassword: "",
    title: "",
    content: "",
    attachments: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/create`);
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리 목록 불러오기 실패:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const validateForm = () => {
    if (formData.categoryId === "") {
        alert("카테고리를 선택해 주세요.");
        return false;
    }

    if (formData.author === "") {
        alert("작성자를 입력해주세요.");
        return false;
    }

    if (formData.password.length < 4 || formData.password.length > 16 || !/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
        alert("비밀번호는 영문, 숫자, 특수문자를 포함하여 4자 이상, 16자 미만이어야 합니다.");
        return false;
    }

    if (formData.password !== formData.confirmPassword) {
        alert("비밀번호 확인이 일치하지 않습니다.");
        return false;
    }

    if (formData.title.length < 4 || formData.title.length > 100) {
        alert("제목은 4자 이상, 100자 미만이어야 합니다.");
        return false;
    }

    if (formData.content.length < 4 || formData.content.length > 2000) {
        alert("내용은 4자 이상, 2000자 미만이어야 합니다.");
        return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const postFormData = new FormData();
    postFormData.append("categoryId", formData.categoryId);
    postFormData.append("author", formData.author);
    postFormData.append("password", formData.password);
    postFormData.append("title", formData.title);
    postFormData.append("content", formData.content);

    if (formData.attachments) {
      Array.from(formData.attachments).forEach((file) => {
        postFormData.append("attachments", file);
      });
    }

    try {
      await createPost(postFormData);
      alert("게시글이 성공적으로 생성되었습니다.");
      window.location.href = "/";
    } catch (error) {
      alert("게시글 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>게시글 등록</h1>
      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>카테고리</th>
              <td>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" name="author" value={formData.author} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" value={formData.title} onChange={handleChange} style={{ width: "100%" }} />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="10"
                  style={{ width: "100%" }}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>파일 첨부</th>
              <td>
                <input type="file" name="attachments" multiple onChange={handleFileChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button type="button" onClick={() => (window.location.href = "/")}>
            취소
          </button>
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreateForm;
