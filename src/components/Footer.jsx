
import { Link } from "react-router-dom";

import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const isAuthenticated  = true
  return (
    <>
      <footer>
        <div>
          <img src="https://assets.softr-files.com/applications/f042043c-4104-404c-9792-21256a0facf4/assets/9a96c1f5-00b4-4a88-be45-fcbe4ed0c8b3.png" alt="logo" />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Street No.007 Shahrah-e-Faisal Karachi, Pakistan</li>
            <li>nichenest@gmail.com</li>
            <li>+92 3106507521</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li to={"/"}>
              <Link>Home</Link>
            </li>
            <li to={"/jobs"}>
              <Link>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaYoutube />
                </span>
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight 2024. All Rights Reserved By CodeWithZeeshu
      </div>
    </>
  );
};

export default Footer;
