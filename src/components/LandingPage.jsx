import { Link, Outlet } from "react-router-dom"

export default function LandingPage() {
    return(
        <div>
            <h1>You are not logged in</h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="login">Log in</Link>
                <Link to="signup">Sign up</Link>
            </div>

            <Outlet />
        </div>
    )
};