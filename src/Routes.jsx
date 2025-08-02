import App from './components/App';
import AuthorPrompt from './components/AuthorPrompt';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';

// Define the routes
const routes = [
  {
    path: '/',
    element: <App />,
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