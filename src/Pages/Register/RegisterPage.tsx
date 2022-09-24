import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import { useStore } from "../../Zustand/store";
import "./RegisterPage.css";

export default function RegisterPage({ validateUser }: any) {
  const {
    handleEmailRegister,
    handleFormSubmitRegister,
    handlePasswordChangeRegister,
    handleUserNameRegister,
    user,
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    validateUser();
  }, []);

  if (user) {
    navigate("/movies");
  }

  return (
    <>
      {/* @ts-ignore */}
      <HeaderCommon validateUser={validateUser} />
      <div className="signup-page-wrapper">
        <div className="left-main-wrapper">
          <img
            className="special-image-2"
            id="signup-page-img"
            src="/assets/images/netflix.png"
            alt=""
          />
        </div>
        <div className="right-main-wrapper">
          <form
            id="signup-form"
            onSubmit={function (e) {
              handleFormSubmitRegister(e);
            }}
          >
            <h1>MovieLandia24</h1>
            <label id="username" htmlFor="">
              <input
                type="text"
                placeholder="Enter your username"
                required
                onChange={function (e) {
                  handleUserNameRegister(e);
                }}
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                onChange={function (e) {
                  handleEmailRegister(e);
                }}
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter your password"
                required
                onChange={function (e) {
                  handlePasswordChangeRegister(e);
                }}
              />
            </label>
            <label htmlFor="">
              <button>Sign Up</button>
            </label>
            <label id="login-link-wrapper" htmlFor="">
              You have an account?
              <Link id="link" to={"../login"}>
                Log In
              </Link>
            </label>
          </form>
        </div>
      </div>
      <FooterCommon />
    </>
  );
}
