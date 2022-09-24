import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <>
      <HeaderCommon />
      <div className="error-wrapper">
        <span>ERROR 404</span>
      </div>
      <FooterCommon />
    </>
  );
}
