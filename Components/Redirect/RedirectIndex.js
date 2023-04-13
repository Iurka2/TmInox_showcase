import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from "next/head";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

const RedirectIndex = () => {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    if (seconds === 0) {
      clearInterval(interval);
      Router.push('/');
    }
    return () => clearInterval(interval);
  }, [seconds]);
  return ( 
    <>
    <Head>
     <title>TM Inox</title>
     <meta name="description" content="Redirect Page" />
     <meta name="robots" content="noindex, nofollow" />
    </Head>

   <section className="redirect">
    <h1>{t("common:redirect")}</h1>
<h2>{t("common:redirect2")} <span style={{color:"#FF6E00"}}>{seconds}</span> {t("common:redirectIndex")}</h2>



</section>
    </>
   );
}
 
export default RedirectIndex;