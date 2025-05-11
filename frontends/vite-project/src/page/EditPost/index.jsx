import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function EditPost() {
  const inputValue = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Lấy tiêu đề hiện tại của bài viết để hiển thị trong ô input
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          inputValue.current.value = data.data.title || "";
        } else {
          toast.error("Không tìm thấy bài viết!", { autoClose: 2000 });
        }
      } catch (err) {
        toast.error("Lỗi khi tải bài viết", { autoClose: 2000 });
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    const value = inputValue.current.value.trim();
    if (!value) {
      return alert("Hãy nhập tên bài viết mới");
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: value }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Sửa bài viết thành công!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/", { state: { updated: true } }); // Gửi state báo là có cập nhật
        }, 2100);
        console.log(data);
      } else {
        toast.error("Sửa bài viết không thành công!", { autoClose: 2000 });
      }
    } catch (err) {
      toast.error("Lỗi kết nối!", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <ToastContainer />
      <h1>Sửa bài viết</h1>
      <div className="add-post">
        <input
          ref={inputValue}
          type="text"
          placeholder="Nhập tên bài viết mới"
          id="post-input"
        />
        <Link onClick={handleSubmit} id="add-post-btn">
          {loading ? "Đang sửa..." : "Sửa"}
        </Link>
      </div>
    </div>
  );
}

export default EditPost;
