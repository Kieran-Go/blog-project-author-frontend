import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function App() {
  // Get user state
  const { user, setUser } = useContext(AuthContext);

  // If not logged in, deny users access to the app and send them to the landing page
  if (!user) return <Navigate to="/landing-page" replace />;

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
      </div>
    </>
  )
}