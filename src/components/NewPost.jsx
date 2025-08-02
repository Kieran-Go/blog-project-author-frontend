import { useState } from "react"
import { useNavigate } from 'react-router-dom';


export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // Reset error to null
        setSubmitError(null);

        try {
            const res = await fetch(`${serverOrigin}/posts/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, isPublished })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to submit post');
            }

            // Navigate back to home page after successful submission
            else navigate('/home');
        }
        catch(err) {
            setSubmitError(err.message);
        }
    }

    return (
        <div>
            <p>Write a new post:</p>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="title">Title:</label><br />
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>

                <div>
                <label htmlFor="content">Content:</label><br />
                <textarea
                    id="content"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                </div>

                <div>
                <label htmlFor="isPublished">
                    <input
                    id="isPublished"
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    />
                    Publish now
                </label>
                </div>

                <button type="submit">Create Post</button>
            </form>

            {submitError && 
                <>
                    <p style={{color: "red"}}>There was a problem submitting your post</p>
                    <p style={{color: "red"}}>{submitError}</p>
                </>
            }
        </div>
  );
}