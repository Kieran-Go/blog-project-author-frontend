import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useFetchData from "../hooks/useFetchData";
import { Link } from "react-router-dom";

export default function Posts() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN
    const { data, loading, error } = useFetchData(`${serverOrigin}/users/${user.id}/posts`);

    // Set posts context using the fetched data
    useEffect(() => {
        if(data) setPosts(data);
    },[data]);

    // Show a loading or error message if needed
    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return(
        <div>
            <h1>Your Posts:</h1>

            <Link to='/new-post'>
                <button>New Post</button>
            </Link>

            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.map((post) => {
                        return (
                            <div key={post.id} className="post" style={{display: "flex", gap: '1rem', margin: '10px'}}>
                                <Link to={`/post/${post.id}`}>
                                    {post.title}
                                </Link>
                                <span>
                                    <em style={{ color: "gray" }}>
                                        {post.isPublished ? "Published" : "Unpublished"}
                                    </em>
                                </span>
                            </div>
                        );
                    })
                ) :
                (<p>You have no posts yet.</p>)
            }
            </div>
        </div>
    );
}