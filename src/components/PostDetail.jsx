import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchData from '../hooks/useFetchData';
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const token = localStorage.getItem('token');

  const { data, loading, error } = useFetchData(`${import.meta.env.VITE_SERVER_ORIGIN}/posts/${id}`);

  useEffect(() => {
    if (data) {
      setPost(data);
      setTitle(data.title || "");
      setContent(data.content || "");
      setIsPublished(!!data.isPublished);
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, isPublished }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      // Show success message
      alert("Changes saved");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  }

  async function deletePost(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete post");
      }

      // Show success message
      alert("Post Deleted");
      // Navigate back home
      navigate('/home');
    } catch (err) {
      setSubmitError(err.message);
    } 
  }

  async function deleteComment(e) {
    e.preventDefault();
  }

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <p>Edit Post:</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label><br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label><br />
          <textarea
            id="content"
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={e => setIsPublished(e.target.checked)}
            />
            Published
          </label>
        </div>

        {submitError && <p style={{ color: "red" }}>{submitError}</p>}

        <button type="submit" disabled={submitLoading}>
          {submitLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <button onClick={deletePost}>Delete Post</button>

      <Link to="/home">
        <button>Back to posts</button>
      </Link>
    </div>
  );
}
