import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const {isAuthenticated}=useSelector((state)=>state.user)
  console.log(isAuthenticated)
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
          <img
            src="https://assets.softr-files.com/applications/f042043c-4104-404c-9792-21256a0facf4/assets/9a96c1f5-00b4-4a88-be45-fcbe4ed0c8b3.png"
            alt="logo"
          />
          </Link>
          
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashborad">Dashboard</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        {/* Mobile Drawer for smaller screens */}
    
      </nav>
    </>
  );
}

export default Navbar;
