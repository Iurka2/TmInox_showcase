import styles from "../styles/services.module.css"
import TopPart from "../Components/toppart";
import serviceImg from '../public/Photos/topImages/bigImage5.jpg'
import serviceImgmobile from '../public/Photos/topImages/bigImage5mobile.jpg'

import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import sketch from "../public/Resources/TRender1.png"
import sketch2 from "../public/Resources/service1.png"
import sketch3 from "../public/Resources/service2.png"
import sketch4 from "../public/Resources/service3.png"

import cardImg1 from "../public/Resources/plc.jpg"
import cardImg2 from "../public/Resources/panou.png"
import bannerIMG from "../public/Resources/goodPhoto1.jpg"
import { motion } from "framer-motion";
import Card from "../Components/UI/Cards/Card";
import Head from "next/head";
import MarqueImg from "../Components/UI/Marque";
import MarqueImg2 from "../Components/UI/Marque2";
import schneider from '../public/Photos/companyLogos/schneider.jpg';
import simens from '../public/Photos/companyLogos/Siemens-logo.svg';
import alien from '../public/Photos/companyLogos/alien.svg'


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
      damping: 60,
      type: "spring",
      stiffness: 200,
      staggerChildren: 0.17, 
     
    }
  }
}


const childVarient = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 0.95,
    transition: {
    type:'spring',
    stiffness: 280,
    mass: 4,
    damping: 60,
    }
  }
};
function FadeInWhenVisible({ children }) {

  return (
    <motion.div  
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeEffect}

    >
      {children}
    </motion.div>
  );
}


function FadeInWhenVisible2({ children }) {

  return (
    <motion.div  
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeEffect}

    >
      {children}
    </motion.div>
  );
}



const Services = (props) => {


const { t } = useTranslation();
  return ( 
    <>

<Head>
  <title> TM INOX | {t('common:3_heder')}</title>
  <meta name="description" content={t("Tehno:tehnoTitle")} />
  <meta property="og:title" content={t('common:3_heder')} key="ogtitle" />
  <meta property="og:description" content={t("Tehno:tehnoTitle")} key="ogdesc" />
</Head>
    
    <TopPart img={serviceImg} imgmobile={serviceImgmobile} text={t('common:3_heder')} alt="Abstract image stainless steel" />

{/* //==============================================Top part========================/// */}
    <FadeInWhenVisible>
<section className={styles.introMain}>
  <motion.div className={styles.introTextCont}>
    <span>
    {t('common:what_offer')}   
   </span>
      <h1>
      {t('common:top_header')}   
      </h1>
        <p>
        {t('common:top_text')}   
        </p>
 </motion.div>
    <motion.div className={styles.introImg} >
      <Image src={sketch2} alt="3d model of project" />
    </motion.div>
</section>
</FadeInWhenVisible>


{/* //==========================AUTOMATIZATION======================================================================// */}


{/* //==========================TEXT=================// */}

<FadeInWhenVisible>
  <motion.div className={styles.flexContaienr}>
    <motion.h1 variants={fadeEffect} className={styles.servHeading}>{t('common:automat')}</motion.h1>

<div className={styles.servTextContainer}>

  <motion.div className={styles.servText} variants={fadeEffect}>
    <motion.h1 className={styles.gridHed}>
      {t('common:autom_heading1')}
    </motion.h1>
      <motion.p className={styles.gridP}>
       {t('common:atom_text1')}
      </motion.p>
  </motion.div>

  <motion.div className={styles.servText} variants={fadeEffect}>
    <motion.h1 className={styles.gridHed}>
    {t('common:autom_heading2')}
      </motion.h1>
     <motion.p className={styles.gridP}>
     {t('common:atom_text2')}
     </motion.p>
  </motion.div>

</div>
</motion.div>
</FadeInWhenVisible>


<div className={styles.random_image_container1}>
<div className={styles.random_image_container}>
  <Image className={styles.random_image} src={sketch3} alt="schema" layout="responsive" objectFit="cover" />
</div> 
</div>


{/* //==================================Tehno part===============// */}

<motion.div className={styles.tehnoContainer} >
  <FadeInWhenVisible2>
    <div className={styles.advantage_cont} >
     <h1>
     {t('common:avantaj')} 
    </h1>
      <p>
       {t('common:avantaj_txt')} 
      </p>
    </div>
 <motion.div className={styles.cardContainer}  variants={fadeEffect}  >
  
  <Card 
      Imageurl={cardImg1} 
      paragraphh={t('common:card1_paragraph')} 
      titlee={t('common:card1_heading')} 
      modalImge={cardImg1}  
      modalTitle={t('common:card1_heading')} 
      modaldescription1={t('common:card1_long_text')}
      modaldescription2={t('common:card1_long_text2')}
      modaldescription3={t('common:card1_long_text4')}
      modaldescription4={t('common:card1_long_text3')}
      />

<Card 
      Imageurl={cardImg2} 
      paragraphh={t('common:card2_paragraph')} 
      titlee={t('common:car2_heading')} 
      modalImge={cardImg2}  
      modalTitle={t('common:car2_heading')} 
      modaldescription2={t('common:card2_long_text1')}
      modaldescription3={t('common:card2_long_text2')}
      modaldescription4={t('common:card2_long_text3')}
       />

 </motion.div>
 </FadeInWhenVisible2>
</motion.div>



{/* //==========================tehnical stuff=================// */}
<div className={styles.tehno_block}>
  <div className={styles.manuf_block}>
    <div className={styles.manuf_image}>
      <Image layout="responsive" src={schneider} objectFit='cover' alt='simens' />
    </div>
    <div className={styles.manuf_image}>
      <Image layout="responsive" src={simens} objectFit='cover' alt='Glass of wine/Pahar vin'/>
    </div>
    <div className={styles.manuf_image}>
      <Image layout="responsive" src={alien}objectFit='cover' alt='Glass of wine/Pahar vin' />
    </div>
    </div>

<hr className={styles.devider}></hr>
</div>

{/* //==========================Banner=================// */}

 <div className={styles.bannerContainer}>
  <div className={styles.bannerText}>
    <h1>
    {t('common:banner')}   
    </h1>
  </div>

   <div className={styles.bannerImg}>
    <ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
        <ParallaxBannerLayer speed={-20}  >
          <Image src={bannerIMG} alt='construction worker ' layout='fill' objectFit='cover'  priority   />
        </ParallaxBannerLayer>
    </ParallaxBanner>
  
   </div>
  </div>

  {/* //===================================Mentenata================----------------------------------------=// */}
  <FadeInWhenVisible>
   <div className={styles.gridContainer}>
    
<motion.div className={styles.gridImg}>
<Image src={sketch} layout='responsive' objectFit="cover" alt='photo of schematics' />
</motion.div>

    <motion.div className={styles.gridText1} variants={fadeEffect}>
      <h2 className={styles.gridHed}>
       {t('common:ment_head1')}   
      </h2>
      <p className={styles.gridP}>
       {t('common:ment_text1')}   
      </p>
    </motion.div>




<div className={styles.gridImg2}>
 <div className={styles.random_image_container2}>
  <Image className={styles.random_image} src={sketch4} alt="schema" layout="responsive" objectFit="cover" />
 </div> 
</div>



       <motion.div className={styles.gridText2} variants={fadeEffect}>
         <h2 className={styles.gridHed}>
          {t('common:ment_head2')}   
         </h2>
         <p className={styles.gridP}>
          {t('common:ment_text2')}   
          </p>
       </motion.div>


          <motion.div className={styles.gridText3} variants={fadeEffect}>
            <h2 className={styles.gridHed}>
             {t('common:ment_head3')}   
            </h2>
            <p className={styles.gridP}>
             {t('common:ment_text3')}   
            </p>
          </motion.div>
 
   </div>
   </FadeInWhenVisible>

{/* //=======================================Marque part================// */}


<section className={styles.marqueCont}>
<MarqueImg />
<MarqueImg2 />
</section>



{/* //===================================Serivce list =================// */}
{/* <section className={styles.basic}>

    <div className={styles.serviceCont}>
      <div>
    <Image src={sketch} alt="3d model of project" />
    </div>
    <div className={styles.dropCont}>
<Drop newtirgger="new"  content='adasdasd asd as dasd asd asd a'/>
<Drop newtirgger="new"  content='wow'/>
<Drop newtirgger="new"  content='wow'/>
<Drop newtirgger="new"  content='wow'/>
<Drop newtirgger="new"  content='wow'/>
</div>
     
    </div>
</section> */}

<FadeInWhenVisible>
    <div className={styles.historycontainer}>
  
      <motion.div className={styles.containerText} variants={fadeEffect}>
      <h1>
      {t('common:list_head')}   
      </h1>
      </motion.div>
      


<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>1.</span>
    {t('common:list1')}   
    </p>
</motion.div>


<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>2.</span>
    {t('common:list2')}   
    </p>
</motion.div>


<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>3.</span>
    {t('common:list3')}   
    </p>
</motion.div>

<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>4.</span>
    {t('common:list4')}   
    </p>
</motion.div>

<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>5.</span>
    {t('common:list5')}   
    </p>
</motion.div>

<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>6.</span>
    {t('common:list6')}   
    </p>
</motion.div>

<motion.div  className={styles.smallContainer}   variants={fadeEffect}>
  <p className={styles.title}>
    <span className={styles.number}>7.</span>
    {t('common:list7')}   
    </p>
</motion.div>

    </div>
    </FadeInWhenVisible>




    </>
   );
}
 
export default Services;