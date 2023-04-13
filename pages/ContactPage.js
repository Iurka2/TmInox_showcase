import styles from "../styles/ContactPage.module.css"
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image';
import TopPart from "../Components/toppart";
import serviceImg from '../public/Photos/topImages/bigImage3.jpg'
import serviceImgmobile from '../public/Photos/topImages/bigImage3mobile.jpg'
import contact from '../public/Resources/contact.jpg'
import {FiPhone,FiMail } from "react-icons/fi";
import Head from "next/head";
import toast from "react-hot-toast";

export async function getStaticProps({ locale }){
  return {
   props:  {
    ...(await serverSideTranslations(locale, ["common", "home"])),
      
    }
  }
}

const ContactPage = (props) => {
 
 

  const { t } = useTranslation();
  return ( 
<>
<Head>
  <title>TM INOX | {t('common:5_heder')}  </title>
  <meta name="description" content={t("common:get")} />
  <meta property="og:title" content={t('common:5_heder')} key="ogtitle" />
  <meta property="og:description" content={t("common:get")} key="ogdesc" />
</Head>

<TopPart img={serviceImg} imgmobile={serviceImgmobile} alt='Abstract stainless steel'  text={t('common:5_heder')}  />


<section className={styles.container}>
 <div className={styles.leftcontainer}>  
  <div className={styles.flex}>
      <h1>
      {t("common:visit")}
      </h1>
        <p style={{cursor:'pointer'}}  onClick={() => {
              navigator.clipboard.writeText("Str. Fundătura Hărmanului 4, 500240 Brașov");
              toast.success("Adresa Copiat", {
                style: {
                  background: "#191716",
                  color: "#fff",
                },
              });
            }}>
          Str. Fundătura Hărmanului 4, 500240 Brașov
        </p>
  </div>

 <div className={styles.flex}>
     <h1>
     {t("common:get")}
     </h1>
   <div>
       <div className={styles.info1} >
        <FiPhone className={styles.icon}/>
         <span style={{cursor:'pointer'}} onClick={() => {
              navigator.clipboard.writeText("004 0368 44 10 90");
              toast.success("Tel. Copiat", {
                style: {
                  background: "#191716",
                  color: "#fff",
                },
              });
            }}  className={styles.infotext}> {t("common:phone")}</span>
       </div>
       <div className={styles.info1} >
        <FiMail className={styles.icon}/>
         <span style={{cursor:'pointer'}} onClick={() => {
              navigator.clipboard.writeText("office@tminox.com.ro");
              toast.success("Email Copiat", {
                style: {
                  background: "#191716",
                  color: "#fff",
                },
              });
            }} className={styles.infotext}>office@tminox.com.ro</span>
       </div>
   </div>
 </div>

 <div className={styles.flex}>
      <h1>
      {t("common:oppening")}
      </h1>
        <p>
        {t("common:hours")}
        </p>
  </div>
</div>


   <div className={styles.imgcontainer}>
    <Image src={contact} layout='responsive' className={styles.img} alt='Women answearing contact phone' />
   </div>

</section>

</>

   );
}
 
export default ContactPage;