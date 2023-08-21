import { useNavigate } from "react-router-dom";

function Header({ token, setUserinfo, setToken }) {
  const navigate = useNavigate();

  const Clicktologin = () => {
    return navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("token");
    setUserinfo({});
    setToken("");
  };

  return (
    <header className="bg-dark px-3 d-flex justify-content-between align-items-center  text-light">
      <div className="logo">
        <a href="/" className="logo_first">
          <h3>amazona</h3>
        </a>
      </div>
      <div>
        <div className="d-flex align-items-center py-2 text-light gap-2">
          <span>
            <button
              onClick={() => navigate("/Addtocart")}
              className="btn  d-flex align-items-center justify-content-center   btn-warning fw-bold"
            >
              cart
            </button>
          </span>
          <button
            onClick={token ? logout : Clicktologin}
            className="btn d-flex align-items-center justify-content-center   btn-warning fw-bold"
          >
            {token ? "Signout" : "Singin"}
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
