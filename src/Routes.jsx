import App from './components/App';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import AuthorPrompt from './components/AuthorPrompt';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { Navigate } from 'react-router-dom';

// Define the routes
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
        // Multiple routes for home page - navigate to '/home'
        { path: 'home', element: <Posts /> },
        { path: '', element: <Navigate to="/home" replace /> },
        { path: 'posts', element: <Navigate to="/home" replace /> },

        { path: 'new-post', element: <NewPost /> },
        { path: 'post/:id', element: <PostDetail /> },
    ]
  },
  {
    path: '/author-prompt',
    element: <AuthorPrompt />,
  },
  {
    path: '/landing-page',
    element: <LandingPage />,
    children: [
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
    ]
  },
];

export default routes;