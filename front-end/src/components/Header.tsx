import argentBankLogo from "../assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(user);

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <div>
                <Link className="main-nav-item" to="/user">
                  <i className="fa fa-user-circle"></i>
                  Tony
                </Link>
                <button
                  className="main-nav-item"
                  type="button"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out"></i>
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="main-nav-item" to="/sign-in">
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
