import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/posts");
      const data = await res.json();
      setPosts(data.data);
      console.log(data);
    } catch (error) {
      toast.error("Không thể tải danh sách bài viết", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [location.state?.updated]); // refetch nếu có state updated

  const handleDelete = async (e) => {
    const check = confirm("Bạn có muốn xoá không?");
    const id = e.target.closest("li").dataset.id;

    if (check) {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (data.status === "error") {
          toast.error("Xoá không thành công!", { autoClose: 2000 });
        } else {
          toast.success("Xoá thành công!", { autoClose: 2000 });
          setPosts((prev) => prev.filter((p) => p.id !== +id));
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra!", { autoClose: 2000 });
      }
    }
  };

  return (
    <div className="app">
      <ToastContainer />
      <h1>Quản lý bài viết</h1>

      <div className="add-post">
        <Link to={"/new-post"} id="add-post-btn">
          Thêm bài viết
        </Link>
      </div>

      <ul id="post-list" className="post-list">
        {posts.map((post) => (
          <li data-id={post.id} key={post.id}>
            <Link to={`/post/${post.id}`} className="link">
              <span>{post.title}</span>
            </Link>

            <Link to={`/edit-post/${post.id}`}>Sửa</Link>
            <Link onClick={handleDelete}>Xóa</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
