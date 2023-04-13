import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import {FiX } from "react-icons/fi";
import Link from "next/link";



const CookiesNotice = () => {
  const [showCookies, setShowCookies] = useState(false);
  const { t } = useTranslation();


  
  useEffect(() => {
    const cookieAccepted = Cookies.get("cookieAccepted");
    setShowCookies(!cookieAccepted);
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieAccepted", "true", { expires: 3 });
    setShowCookies(false);
  };

  return (
    <>
      {showCookies && (
        <div className="cookie-card">
          <span className="title">🍪 Cookie</span>
          <p className="description">
          {t("common:cokei_desc1")}{' '}
           <Link href="/PrivacyPolicy" ><a>{t("common:cokei_desc2")}</a></Link> 
          </p>
          <div className="actions">
            <button className="accept" onClick={handleAccept}>
              Accept
            </button>
          </div>
          <div onClick={handleAccept} className="x"><FiX /></div>
        </div>
       )} 
    </>
  );
};

export default CookiesNotice;
