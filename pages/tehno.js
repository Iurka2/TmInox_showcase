import styles from "../styles/tehno.module.css";
import TopPart from "../Components/toppart";
import serviceImg from "../public/Photos/topImages/bigImage2.png";
import Head from "next/head";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import bannerIMG from "../public/Resources/banner2.JPG";
import { motion } from "framer-motion";
import WhyUs from "../Components/Layout/WhyUs";
import TehnoDrawer from "../Components/UI/TehnoDrawer";


import gif1 from "../public/Resources/gif1.gif"
import gif2 from "../public/Resources/gif2.gif"
import gif3 from "../public/Resources/gif3.gif"
import gif4 from "../public/Resources/gif4.gif"
import gif5 from "../public/Resources/gif5.gif"
import gif6 from "../public/Resources/gif6.gif"

import tehnobg1 from "../public/Resources/tehnobg1.jpg"
import tehnobg2 from "../public/Resources/tehnobg2.jpg"
import tehnobg3 from "../public/Resources/tehnobg3.jpg"
import tehnobg4 from "../public/Resources/tehnobg4.jpg"
import tehnobg5 from "../public/Resources/tehnobg5.jpg"
import tehnobg6 from "../public/Resources/tehnobg6.jpg"

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}



//===================Animations=========//
const fadeEffect = {
  hidden: {
    y: 50,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 60,
      type: "spring",
      stiffness: 200,
      staggerChildren: 0.3,
    },
  },
};




const childVarient = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 280,
      mass: 4,
      damping: 60,
    },
  },
};


function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeEffect}
    >
      {children}
    </motion.div>
  );
}



const Tehnologies = (props) => {
  const { t } = useTranslation();



  return (
    <>



<Head>
  <title>TM INOX | {t("common:tehno")}</title>
  <meta name="description" content={t("common:tehnoTitle")} />
  <meta property="og:title" content={t("common:tehno")} key="ogtitle" />
  <meta property="og:description" content={t("common:tehnoTitle")} key="ogdesc" />
</Head>

      <TopPart
        img={serviceImg}
        text={t("common:tehno")}
        alt="Abstract stainless steel image"  
        
        />


{/* //=======================================================================================Tehno part====================// */}

<section className={styles.bigTehno}>
<h1 className={styles.centerText2}>{t("common:tehnoTitle")}</h1>      
<div className={styles.mainTehno}>

<TehnoDrawer maintitle={t("common:tehno1")} title={t("common:tehno1")} newimage={tehnobg1} text1={t("common:tehno_descript1")}  position="smallTehno1" />
 <div className={styles.singleTehno1}>
  <Image src={gif1} alt='gif showcase of tehnologie' layout="fill" objectFit="cover" priority/>
 </div>

<TehnoDrawer maintitle={t("common:tehno2")} title={t("common:tehno2")} newimage={tehnobg2} text1={t("common:tehno_descript2")}  position="smallTehno2" />
 <div className={styles.singleTehno2}>
  <Image src={gif2} alt='gif showcase of tehnologie' layout="fill" objectFit="cover" priority/>
 </div>

<TehnoDrawer maintitle={t("common:tehno6")}  title={t("common:tehno6")} newimage={tehnobg4} text1={t("common:tehno_descript3")}  position="smallTehno3" />
  <div className={styles.singleTehno3}>
    <Image src={gif3} alt='gif showcase of tehnologie' layout="fill" objectFit="cover" priority/>
  </div>

<TehnoDrawer maintitle={t("common:tehno5")} title={t("common:tehno5")} newimage={tehnobg3} text1={t("common:tehno_descript4")}  position="smallTehno4" />
 <div className={styles.singleTehno4}>
  <Image src={gif4} alt='gif showcase of tehnologie' layout="fill" objectFit="cover" priority/>
</div>

<TehnoDrawer maintitle={t("common:tehno3")} title={t("common:tehno3")} newimage={tehnobg6} text1={t("common:tehno_descript5")}  position="smallTehno5" />
 <div className={styles.singleTehno5}>
  <Image src={gif5} alt='gif showcase of tehnologie' layout="fill" objectFit="cover" priority/>
 </div>

<TehnoDrawer maintitle={t("common:tehno4")} title={t("common:tehno4")} newimage={tehnobg5} text1={t("common:tehno_descript6")}  position="smallTehno6" />
 <div className={styles.singleTehno6}>
  <Image src={gif6} alt='gif showcase of tehnologie' layout="fill" objectFit="cover" priority/>
 </div>

</div>
</section>



{/* //===========================================text part================================// */}




<FadeInWhenVisible>
        <motion.div className={styles.flexContaienr}>
          <motion.h1 variants={fadeEffect} className={styles.servHeading}>
          {t("common:tehnoQ")}
          </motion.h1>

          <div className={styles.servTextContainer}>
            <motion.div className={styles.servText} variants={fadeEffect}>
              <motion.h1 className={styles.gridHed}>
              {t("common:tehnoQ_title1")}
              </motion.h1>
              <motion.p className={styles.gridP}>
              {t("common:tehnoQ_text1")}
              </motion.p>
            </motion.div>

            <motion.div className={styles.servText} variants={fadeEffect}>
              <motion.h1 className={styles.gridHed}>
              {t("common:tehnoQ_title2")}
              </motion.h1>
              <motion.p className={styles.gridP}>
              {t("common:tehnoQ_text2")}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </FadeInWhenVisible>


      <div className={styles.bannerContainer}>
        <div className={styles.bannerText}>
          <h1>
          {t("common:tehnoMid")}
          </h1>
        </div>

        <div className={styles.bannerImg}>
          <ParallaxBanner style={{ aspectRatio: "3/ 1" }}>
            <ParallaxBannerLayer speed={-20}>
              <Image
                src={bannerIMG}
                alt="Worker doing mending"
                layout="fill"
                objectFit="cover"
                priority
              />
            </ParallaxBannerLayer>
          </ParallaxBanner>
        </div>
      </div>

     

     
      <WhyUs />


{/* 
///=================================================Drawers=========================// */}



    </>
  );
};

export default Tehnologies;
