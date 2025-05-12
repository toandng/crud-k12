import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Post() {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState(null);

  const [commentId, setCommentId] = useState({
    name: "",
    comment: "",
  });

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/comments/${id}`);
        const data = await res.json();

        setCommentId({
          name: data.data?.name ?? "",
          comment: data.data?.comment ?? "",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/posts/${params.id}/comments`
        );
        console.log(res);

        const data = await res.json();
        console.log(data);

        setComments(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/posts/${params.id}`
        );
        const data = await res.json();
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.id]);

  const handleChangValue = (e) => {
    const { name, value } = e.target;
    setCommentId((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (comment) => {
    try {
      await fetch(`http://localhost:3001/api/v1/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Xoá thành công!", { autoClose: 2000 });

      setComments(comments.filter((c) => c.id !== comment.id));
    } catch (error) {
      console.log(error);
    }
  };

  const editSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/api/v1/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentId),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Sửa thành công!", { autoClose: 2000 });
        setEditForm(false);

        setComments((prev) =>
          prev.map((comment) =>
            comment.id === result.data.id ? result.data : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (!data.name || !data.comment)
      return alert("Hãy nhập đầy đủ các trường để đi tiếp");

    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/posts/${params.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.success) {
        setComments((prev) => [...prev, result.data]);
        toast.success("Thêm thành công!", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>{post.name}</h1>
        <p>Tạo comment</p>
      </div>

      <div className="comments">
        <span style={{ fontWeight: "700" }}>Comments ({comments.length})</span>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nhập tên" />
          <input type="text" name="comment" placeholder="Nhập comment..." />
          <button>Bình luận</button>
        </form>

        <hr style={{ width: "100vw" }} />

        <div className="commentForm">
          {comments.map((comment) => (
            <div className="commentGroup" key={comment.id}>
              <div className="user">
                <img
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                  }}
                  src="https://a1.vnecdn.net/s61769534880479660226.png?w=60&h=60&s=KWc6wvqJHKSXlMtxC2HqkQ"
                  alt=""
                />
                <span className="userName">{comment.name}</span>

                <div className="content">
                  <p>{comment.comment}</p>
                </div>
              </div>

              <div className="action">
                <button
                  onClick={() => {
                    setId(comment.id);
                    setEditForm(!editForm);
                  }}
                >
                  sửa
                </button>
                <button onClick={() => handleDelete(comment)}>xoá</button>
              </div>

              {editForm && comment.id === id && (
                <form className="form" onSubmit={editSubmit}>
                  <input
                    value={commentId.name ?? ""}
                    type="text"
                    name="name"
                    className="name"
                    placeholder="Nhập tên"
                    onChange={handleChangValue}
                  />
                  <input
                    value={commentId.comment ?? ""}
                    type="text"
                    name="comment"
                    className="comment"
                    placeholder="Nhập comment..."
                    onChange={handleChangValue}
                  />
                  <button>Sửa</button>
                </form>
              )}

              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
