import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";

function Header({ WebHandler, account }) {
  return (
    <div>
      <header id="header">
        <div className="header-fixed-height"></div>
        <div className="menu-area sticky-header">
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                {/* <div className="mobile-nav-toggler" onClick={onclick}><FaBars backgroundColor="red" /></div> */}
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="logo">
                      <a href="/">
                        {/* <img src={logo} alt="lOGO" /> */}
                        <h2>Concert Ticket</h2>
                      </a>
                    </div>
                    <div className="navbar-wrap main-menu d-lg-flex">
                      <ul className="navigation">
                        <li className="active menu-item-has-children">
                          <a href="/" className="section-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="/" className="section-link">
                            About Us
                          </a>
                        </li>
                        <li>
                          <a href="/" className="section-link">
                            Ticket Sales
                          </a>
                        </li>
                        <li>
                          <a href="/" className="section-link">
                            Team
                          </a>
                        </li>

                        <li>
                          <a href="/" className="section-link">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>

                    {account ? (
                      <Button>
                        {account.slice(0, 5) + "..." + account.slice(38, 42)}
                      </Button>
                    ) : (
                      <Button onClick={WebHandler}>Connect Wallet </Button>
                    )}
                  </nav>
                </div>

                <div className="mobile-menu">
                  <nav className="menu-box">
                    <div className="close-btn">
                      <FaTimes />
                    </div>
                    <div className="nav-logo">
                      <a href="/"></a>
                    </div>
                    <div className="menu-outer"></div>
                    <div className="social-links">
                      <ul className="clearfix">
                        <li>
                          <a href="#facebook">
                            <FaFacebook />
                          </a>
                        </li>
                        <li>
                          <a href="#twitter">
                            <FaTwitter />
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#instagram">
                            <FaInstagram />
                          </a>
                        </li>
                        <li>
                          <a href="#linkedin">
                            <FaLinkedinIn />
                          </a>
                        </li>
                        <li>
                          <a href="#youtube">
                            <FaYoutube />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="menu-backdrop"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
