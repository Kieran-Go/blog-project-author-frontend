import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthorPrompt () {
    const { user, setUser, loading } = useContext(AuthContext);
    const [password, setPassword] = useState("");

    // Don't render anything until loading finishes
    if (loading) return <p>Loading...</p>;

    // If user isn't logged in or is logged in and an author, navigate to appropriate page
    if (!user) return <Navigate to='/landing-page' replace />;
    if (user.isAuthor) return <Navigate to="/home" replace />;

    function handleLogout() {
        // Remove token from local storage
        localStorage.removeItem('token');

        // Set user to null
        setUser(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Attempt to make user an author
        const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/users/make-author`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ password }),
        });

        const result = await res.json();

        if (!res.ok) return alert(result.error || 'Something went wrong');

        alert('Success! You are now an author!');
        setUser(result.user); // update context

    }

    return(
        <div>
            <h1>You are not an author!</h1>
            
            <p>To become an author, enter the secret password:</p>
            <button onClick={handleLogout}>Sign Out</button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Secret Password"
                    required
                />
                <button type="submit">Become an author</button>
            </form>
        </div>
    );
}