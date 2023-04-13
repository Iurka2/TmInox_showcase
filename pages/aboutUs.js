import styles from "../styles/About.module.css"
import TopPart from "../Components/toppart";
import serviceImg from '../public/Photos/topImages/bigImage6.jpg'
import serviceImgmobile from '../public/Photos/topImages/bigImage6mobile.jpg'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { motion } from "framer-motion";
import { FiAward,FiTool,FiTruck,FiArrowUpRight} from "react-icons/fi";
import bannerIMG from "../public/Resources/banner4.jpeg"
import WhyUs from "../Components/Layout/WhyUs";
import transparent from "../public/Resources/about.JPG"
import Link from "next/link";
import Head from "next/head";

export async function getStaticProps({ locale }){
  return {
   props:  {
    ...(await serverSideTranslations(locale,['common', 'home']))
    }
  }
}




const fadeEffect = {
  hidden: {
    y: 50,
    opacity:0,
  },

  visible: {
    y: 0,
    opacity:1,
    transition: {
      type: "spring",
      staggerChildren: 0.18,
      mass: 0.5,
      damping: 20
     
    }
  }
}

function FadeInWhenVisible({ children }) {

  return (
    <motion.div  
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeEffect}

    >
      {children}
    </motion.div>
  );
}






const AboutUs = (props) => {

  const { t } = useTranslation();
  return ( 
<>
<Head>
  <title>TM INOX | {t('common:4_heder')}</title>
  <meta name="description" content={t('common:centerText')}  />
  <meta property="og:title" content={t('common:4_heder')} key="ogtitle" />
  <meta property="og:description" content={t('common:centerText')} key="ogdesc" />
</Head>

    <TopPart img={serviceImg} imgmobile={serviceImgmobile} alt='Abstract stainless steel' text={t('common:4_heder')}  />

<FadeInWhenVisible>
<div className={styles.textContainer2}>
  <h1>{t('common:centerText')} </h1>
</div>
</FadeInWhenVisible>



<FadeInWhenVisible>
<div className={styles.flexCont}>
    <div className={styles.imagee} style={{  position: "relative",
        width: "50vw",
        height: "60vh",
       
  }}>
    <Image className={styles.imagee} src={transparent} alt='Photo of a factory'   layout='fill' objectFit='cover' />
    </div>  


 <div className={styles.textRight}>
      <p>{t('common:text_1')}</p>
      <p>{t('common:text_2')}</p>
   <div className={styles.buttonFlex}>

    <Link scroll={false}  href="/projects">
     <div className={styles.buttonContainer} >
      <span  className={`${styles.button} hover-underline-animation `}>{t('common:button_1')}</span>
       <FiArrowUpRight className={styles.icon}/>
     </div>
   </Link>

  <Link scroll={false}  href="/services">
    <div className={styles.buttonContainer} >
      <span  className={`${styles.button} hover-underline-animation `}>{t('common:button_2')}</span>
       <FiArrowUpRight className={styles.icon}/>
    </div>
  </Link>

  </div>
 </div>
</div>
</FadeInWhenVisible>




<FadeInWhenVisible>
<div className={styles.achivConrainer}>



    <motion.div className={styles.achivSmall} variants={fadeEffect}>
      <FiTruck className={styles.icon2}/>
    <h1>120 000+</h1>
    <h3>{t('common:costumer_title')}</h3>
    <p>{t('common:costumer_text')}</p>
    </motion.div>



      <motion.div className={styles.achivSmall} variants={fadeEffect}>
        <FiTool className={styles.icon2} />
      <h1>200+</h1>
      <h3>{t('common:proj_title')}</h3>
      <p>{t('common:proj_text')}</p>
      </motion.div>

      
      <motion.div className={styles.achivSmall} variants={fadeEffect}>
  <FiAward className={styles.icon2}/>
<h1>52</h1>
<h3>{t('common:awards_title')}</h3>
<p>{t('common:awwards_text')}</p>
</motion.div>

</div>


</FadeInWhenVisible>


<FadeInWhenVisible>
<div className={styles.textContainer}>
<motion.h1 variants={fadeEffect}>{t('common:mision')}</motion.h1>
<motion.div className={styles.textFlex} variants={fadeEffect}>
  
  <div className={styles.textC}>
    <h1>{t('common:mission_title')}</h1>
<p>{t('common:mission_text')}</p>
    </div>

<div className={styles.textC}>
  <h1>{t('common:mission_title2')}</h1>
<p>{t('common:mission_text2')}</p>
</div>

</motion.div>
</div>
</FadeInWhenVisible>






<div className={styles.bannerContainer}>


<div className={styles.bannerText}>
  <h1> {t('common:mid_txt')} </h1>
</div>

<div className={styles.bannerImg}>

<ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
    <ParallaxBannerLayer speed={-25}  >
      <div className={styles.image}>
  <Image src={bannerIMG} alt='Meding closeup' layout='fill' objectFit='cover'/>
  </div>
    </ParallaxBannerLayer>


</ParallaxBanner>
</div>
</div>




<FadeInWhenVisible>
<div className={styles.textContainer}>
<motion.h1 variants={fadeEffect}>{t('common:value')}</motion.h1>
<motion.div className={styles.textFlex} variants={fadeEffect}>
  
<div className={styles.textC}>
<h1>{t('common:quality')}</h1>
<p>{t('common:quality_txt')}</p>
</div>

<div className={styles.textC}>
<h1>{t('common:passion')}</h1>
<p>{t('common:passion_txt')}</p>
</div>

</motion.div>
</div>
</FadeInWhenVisible>



<FadeInWhenVisible>
    <div className={styles.historycontainer}>
  
      <motion.div className={styles.containerText} variants={fadeEffect}>
      <h1>
       Our History 
      </h1>
      </motion.div>
      


<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <h1 className={styles.title}>2008</h1>
  <p className={styles.paragraph}>TmInox apare pe piata romana </p>
</motion.div>

<motion.div className={styles.smallContainer} variants={fadeEffect}>
  <h1 className={styles.title }>2008</h1>
  <p className={styles.paragraph}>TmInox apare pe piata romana  </p>
</motion.div>

<motion.div className={styles.smallContainer} variants={fadeEffect}>
  <h1 className={styles.title}>2008</h1>
  <p className={styles.paragraph}>TmInox apare pe piata romana </p>
</motion.div>

<motion.div className={styles.smallContainer} variants={fadeEffect}>
  <h1 className={styles.title}>2008</h1>
  <p className={styles.paragraph}>
  TmInox apare pe piata romana </p>
</motion.div>

<motion.div className={styles.smallContainer} variants={fadeEffect}>
  <h1 className={styles.title}>2008</h1>
  <p className={styles.paragraph}>
  TmInox apare pe piata romana </p>
</motion.div>

<motion.div className={styles.smallContainer} variants={fadeEffect}>
  <h1 className={styles.title}>2008</h1>
  <p className={styles.paragraph}>
  TmInox apare pe piata romana </p>
</motion.div>

<motion.div className={styles.smallContainer} variants={fadeEffect}>
  <h1 className={styles.title}>2008</h1>
  <p className={styles.paragraph}>
  TmInox apare pe piata romana </p>
</motion.div>


    </div>
    </FadeInWhenVisible>

<WhyUs />


    </>

   );
}
 
export default AboutUs ;