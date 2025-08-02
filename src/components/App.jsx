import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function App() {
  // Get user state
  const { user, setUser, loading } = useContext(AuthContext);

  // Don't render anything until loading finishes
  if (loading) return <p>Loading...</p>;

  // If not logged in, deny users access to the app and send them to the landing page
  if (!user) return <Navigate to='/landing-page' replace />;

  // If user is logged in but is not an author, take them to the author-prompt page
  if(!user.isAuthor) return <Navigate to='/author-prompt' replace />;

  // Function to log user out
  function handleLogout() {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Set user to null
    setUser(null);

  }

  return (
    <>
      <div>
          <h1>Welcome, {user.name}</h1>
          <button onClick={handleLogout}>Sign Out</button>

          <Outlet />
      </div>
    </>
  )
}