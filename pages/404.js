import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

const NotFound = () => {
  const { t } = useTranslation();
  return ( 
    <>
    <Head>
    <title>404</title>
    <meta name="description" content="Content not found" />
    <meta name="robots" content="noindex, nofollow" />
   </Head>

<div className="errorpage">
  <h1>404</h1>
  <h2>{t("common:error")}</h2>
</div>
   </>
   );
}
 
export default NotFound;