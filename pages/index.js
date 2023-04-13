import styles from '../styles/Home.module.css';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import {  motion  } from 'framer-motion';
import { db } from '../utils/firebase/firebase';
import ProjectImage from '../Components/UI/ProjImage';
import { useRouter } from 'next/router';
import Head from 'next/head';


import WineBottle from '../public/Resources/winebottle.png';
import vegies from "../public/Resources/vegies.png";
import HeroSection from '../Components/Layout/HeroSection';
import { FiArrowUpRight,FiDownload } from "react-icons/fi";


import { IconContext } from "react-icons";
import Beer from '../public/Resources/beer.png';
import WhyUs from '../Components/Layout/WhyUs';
import chemical from '../public/Resources/micro.png';


import tehnobg1 from "../public/Resources/tehnobg1.jpg";
import tehnobg2 from "../public/Resources/tehnobg2.jpg";
import tehnobg4 from "../public/Resources/tehnobg4.jpg";

import gif1 from "../public/Resources/gif1.gif";
import gif2 from "../public/Resources/gif2.gif";
import gif3 from "../public/Resources/gif3.gif";

import dieme from '../public/Photos/companyLogos/dieme.png';
import inoxpa from '../public/Photos/companyLogos/inoxpa.png';
import ebara from '../public/Photos/companyLogos/ebara.svg';
import liverani from '../public/Photos/companyLogos/liverani.jpg';
import schneider from '../public/Photos/companyLogos/schneider.jpg';
import simens from '../public/Photos/companyLogos/Siemens-logo.svg';
import alien from '../public/Photos/companyLogos/alien.svg'
import albrigi from '../public/Photos/companyLogos/albrigi.png'
import awh from '../public/Photos/companyLogos/awh.jpg'
import catalonia from '../public/Photos/companyLogos/catalonia.png'
import continental_logo from '../public/Photos/companyLogos/continental_logo.svg'
import direct from '../public/Photos/companyLogos/direct.jpg'
import elica from '../public/Photos/companyLogos/elica.jpg'
import enomet from '../public/Photos/companyLogos/enomet.png'
import enotalia from '../public/Photos/companyLogos/enotalia.png'
import favrin from '../public/Photos/companyLogos/favrin.png'
import frabcesca from '../public/Photos/companyLogos/frabcesca.jpg'
import gg from '../public/Photos/companyLogos/gg.jpg'
import isolcell from '../public/Photos/companyLogos/Isolcell.png'
import kisle from '../public/Photos/companyLogos/kisle.png'
import mori from '../public/Photos/companyLogos/mori.webp'
import niob from '../public/Photos/companyLogos/niob.jpg'
import omaf from '../public/Photos/companyLogos/omaf.png'
import red from '../public/Photos/companyLogos/red.png'
import smInox from '../public/Photos/companyLogos/smInox.jpg'
import syveco from '../public/Photos/companyLogos/syveco.jpg'
import tomica from '../public/Photos/companyLogos/tomica.jpg'
import toneliere from '../public/Photos/companyLogos/toneliere.png'
import vALBIA from '../public/Photos/companyLogos/VALBIA.png'
import zambelli from '../public/Photos/companyLogos/zambelli.png'




import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination} from "swiper";
import Marquee from 'react-fast-marquee';

import { useMediaQuery } from 'react-responsive'
import TehnoDrawer from '../Components/UI/TehnoDrawer';




export const getServerSideProps = async ({ locale, res }) => {
  const projects = await db.collection("projects").limit(5).get();
  const products = await db.collection("manufacturers/tm_inox/products")
  .where('tags', 'array-contains', "HOT")   
  .limit(9)
  .get();
  
  const ProjectData = projects.docs.map((proj) => ({
    id: proj.id,
    ...proj.data(),
    params: { id: proj.id.toString() },
  }));

  const productsData = products.docs.map((prod) => ({
    id: prod.id,
    ...prod.data(),
    params: { id: prod.id.toString() },
  }));


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=900'
  )

  return {
    props: {
      projects: JSON.parse(JSON.stringify(ProjectData)),
      products: JSON.parse(JSON.stringify(productsData)),
      ...(await serverSideTranslations(locale, ["common", "home"])),
      
    },
    
  };

};


const logos = [
  { id: 2, src: inoxpa },
  { id: 3, src: ebara },
  { id: 4, src: liverani },
  { id: 1, src: dieme },
  { id: 5, src: schneider },
  { id: 6, src: simens },
  { id: 7, src: alien },
  { id: 8, src: albrigi },
  { id: 9, src: awh },
  { id: 10, src: catalonia },
  { id: 11, src: continental_logo },
  { id: 12, src: direct },
  { id: 13, src: elica },
  { id: 14, src: enomet },
  { id: 15, src: enotalia },
  { id: 16, src: favrin },
  { id: 17, src: frabcesca },
  { id: 18, src: gg },
  { id: 19, src: isolcell },
  { id: 20, src: kisle },
  { id: 21, src: mori },
  { id: 22, src: niob },
  { id: 23, src: omaf },
  { id: 24, src: red },
  { id: 25, src: smInox },
  { id: 26, src: syveco },
  { id: 27, src: tomica },
  { id: 28, src: toneliere },
  { id: 29, src: vALBIA },
  { id: 30, src: zambelli },
 

]
//==========================Animation effects=============//

const fadeEffect = {
  hidden: {
    y: 50,
    opacity:0,

  },

  visible: {
    y: 0,
    opacity:1,
    transition:{
      damping: 50,
      type: "spring",
      stiffness: 200, 
      staggerChildren: 0.25,
    }

  }
  
}


const fadeEffect2 = {
  hidden: {
    y:-20,
    opacity:0,
    transition:{
      staggerChildren: 0.3
    }
  },

  visible: {
   y:0,
    opacity:1,
    transition: {
      damping: 50,
      type: "spring",
      stiffness: 200, 
      staggerChildren: 0.1,
    }

  },  
}




function FadeInWhenVisible({ children }) {

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

export default function Home(props) {

  const { locale } = useRouter();
  const { t } = useTranslation();
  const localisator = t(locale);


const [projects, setProjects] = useState(props.projects);
const getImagesByTag = async () => {
  setProjects([]);
  //--------------------
  //GET THE IMAGES HERE
  //--------------------
  setProjects(projects);
};
 
const [products, setProducts] = useState(props.products);


const [hydrated, setHydrated] = useState(false);
	const isDesktop = useMediaQuery(
		{ query: "(min-width: 814px)" },
		hydrated ? undefined  : { deviceWidth: 814 }
	);

	useEffect(() => {
		setHydrated(true);
	}, []);


const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })


const specificTag = "hot";

  return (
   <>   

<Head>
  <title>TM INOX | {t("common:home")}</title>
  <meta name="description" content={t("home:hero_txt")} />
  <meta property="og:title" content={t("common:home")} key="ogtitle" />
  <meta property="og:description" content={t("home:hero_txt")} key="ogdesc" />
</Head>
   
{/* //==========================First thing you see on page=============// */}






<motion.section id='indexTop' className={styles.topAllContainer}  >




   <motion.div className={styles.topContainer} >
   <video width="100%" height="100%" loop autoPlay muted src='Resources/main_page_video.mp4' type='video/mp4' className={styles.vidos} />
   </motion.div>

   <motion.div className={styles.topTextContainer} 
               initial="hidden"
              whileInView="visible"
              variants={fadeEffect}>
       {/* <motion.h1 className={styles.topText} variants={fadeEffect}>TM INOX</motion.h1 > */}

       <motion.h1 className={styles.topText2}  variants={fadeEffect}> 
       {t('home:top_1')}
       </motion.h1>
       
     </motion.div>

     </motion.section>
     
{/* //==========================Hero section=============// */}

     <HeroSection title={t("home:what_we_do")}  text={t("home:hero_txt")} link={"aboutUs"} />


{/* //==========================Idustries  section=============// */}

<motion.div className={styles.textContainer}  
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4  }}
              variants={fadeEffect}>

<motion.h1  className={styles.centerText}
                variants={fadeEffect}
              >
             {t('home:industry')}
              </motion.h1>  


              <motion.p  className={styles.descriptionText}
              variants={fadeEffect}
              >
        {t('home:indust_desc')}
              </motion.p> 
</motion.div>


     <motion.div className={styles.gridContainer}>
      <motion.div className={styles.item1} initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4  }}
              variants={fadeEffect} >
       <motion.h1  variants={fadeEffect}  className={styles.item1H1}>{t('common:wine')}</motion.h1>
       <motion.p  variants={fadeEffect}  className={styles.item1P1}>{t('home:wine_txt')}</motion.p>
       <Link href='/products/'>
       <motion.div  variants={fadeEffect}  className={styles.buttonContainer1} >
     <span  className={`${styles.button1} hover-underline-animation `}>{t('common:button_product')}</span>
     <FiArrowUpRight className={styles.icon}/>
       </motion.div>
       </Link>
       <motion.div  className={styles.img1}>
       <Image src={WineBottle} lazyBoundary='150%'  layout='responsive' objectFit='cover' alt='Glass of wine/Pahar vin' />
       </motion.div>
      </motion.div>

      <motion.div className={styles.item2}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4  }}
      variants={fadeEffect}>
       <motion.h1  variants={fadeEffect} className={styles.item1H2}>{t('common:beer')}</motion.h1>
       <motion.p  variants={fadeEffect} className={styles.item1P2}>{t('home:beer_txt')}</motion.p>
       <Link href='/products/'>
       <motion.div  variants={fadeEffect} className={styles.buttonContainer2} >
     <span  className={`${styles.button1} hover-underline-animation `}>{t('common:button_product')}</span>
       <FiArrowUpRight className={styles.icon}/>
       </motion.div>
       </Link>
       <div className={styles.img2}>
       <Image src={Beer} lazyBoundary='150%' layout='responsive' objectFit='cover' alt='Glass of beer /Pahar bere' />

       </div>
      </motion.div>


      <motion.div className={styles.item3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4  }}
        variants={fadeEffect}>
       <motion.h1  variants={fadeEffect} className={styles.item1H2}>{t('common:food')}</motion.h1>
       <motion.p  variants={fadeEffect} className={styles.item1P2}>{t('home:food_txt')}</motion.p>
       <Link href='/products/'>
       <motion.div  variants={fadeEffect} className={styles.buttonContainer2} >
     <span  className={`${styles.button1} hover-underline-animation `}>{t('common:button_product')}</span>
     <FiArrowUpRight className={styles.icon}/>
       </motion.div>
       </Link>
       <div className={styles.img4}>
       <Image src={vegies} lazyBoundary='150%' layout='responsive' objectFit='cover' alt='Vegetables / Legume' />
       </div>
      </motion.div>


      <motion.div className={styles.item4}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true, amount: 0.4  }}
       variants={fadeEffect}>
       <motion.h1  variants={fadeEffect} className={styles.item1H1}>{t('common:chemical')}</motion.h1>
       <motion.p  variants={fadeEffect} className={styles.item1P1}>{t('home:chem_txt')}</motion.p>
       <Link href='/products/'>
       <motion.div  variants={fadeEffect} className={styles.buttonContainer1} >
     <span  className={`${styles.button1} hover-underline-animation `}>{t('common:button_product')}</span>
     <FiArrowUpRight className={styles.icon}/>
       </motion.div>
       </Link>
       <div className={styles.img3}>
       <Image src={chemical} lazyBoundary='150%' layout='responsive' objectFit='cover' alt='Microscop' />
       </div>
      </motion.div>


      <div className={styles.buttonContainer3} >
     <span  className={`${styles.button2} hover-underline-animation `}>{t('common:button_all')}</span>
     <FiArrowUpRight className={styles.icon}/>
       </div>
     </motion.div>

     

{/* //==========================Produse  section=============// */}

<section className={styles.bg}>
 <motion.div 
  className={styles.textContainer2}   
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4  }}
  variants={fadeEffect}>
   
   <motion.h1  className={styles.centerText2}   variants={fadeEffect} >
     {t('common:1_heder')}
   </motion.h1>   
 
   <motion.p  className={styles.descriptionText} variants={fadeEffect}>
     {t('home:prod_desc')}
   </motion.p> 
 
 </motion.div>


 <motion.div 
  className={styles.ProductsGrid} 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
  variants={fadeEffect2} >
    
    {products

  .map((product) => (

 <Link  href={{
  pathname: "products/" + product.id,
 
}} key={product.id}>
  <motion.div 
    key={product.id}
    className={styles.prod}  
    variants={fadeEffect2}  
    whileHover={{scale:1.02,}} >
     <motion.h1 className={styles.prodtext}>{localisator == "ro" ? product.nameRo : product.nameEn}</motion.h1>
  <div className={styles.prdFlex}>
    <motion.div className={styles.imgCont}>
      <Image  src={product.image[0].downloadURL} layout='responsive' width={100} height={100} alt='Stainless steel main product' />
    </motion.div> 
    <motion.p className={styles.prodDesc}>{localisator == "ro"? product.descriptionRo : product.descriptionEn}</motion.p>
  </div>
  </motion.div>
</Link>
 ))}
 </motion.div>
 <div className={styles.buttonContainer7} >
  <Link href="/products/">
     <span className={`${styles.button2} hover-underline-animation `}>{t('common:button_all')}</span>
     </Link>
       <FiArrowUpRight className={styles.icon}/>
  </div>
</section>




{/* //================================Cataloage=================// */}




 <section className={styles.mainCatalog} >  
    <motion.a  
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, amount: 0.4  }}
     variants={fadeEffect}
     whileHover={ {scale: 0.98}}
      className={styles.smallCatalog} 
      target="_blank" 
      rel="noreferrer"  
      href="/Resources/catalogA.pdf">
        <FiDownload className={styles.downloadicon} />
        <p>{t('common:catalog1')}</p>
    </motion.a>
 
      <motion.a 
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true, amount: 0.4  }}
       variants={fadeEffect} 
       whileHover={ {scale: 0.98}}
        className={styles.smallCatalog} 
        target="_blank" 
        rel="noreferrer"  
        href="/Resources/catalogG.pdf">
          <FiDownload className={styles.downloadicon} />
          <p>{t('common:catalog2')}</p>
      </motion.a>
</section>

{/* //==========================Project section=============// */}

<motion.div 
className={styles.textContainer2}   
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.4  }}
variants={fadeEffect}>

 <motion.h1  
   className={styles.centerText}
   variants={fadeEffect} >
    {t('common:2_heder')}
 </motion.h1>   

  <motion.p 
    className={styles.descriptionText}
    variants={fadeEffect}>
      {t('home:proj_desc')}
   </motion.p> 

</motion.div>
              
              
<div className='sswiper'>
<Swiper 
 slidesPerView={isTabletOrMobile ? 1 : 3}
 spaceBetween={24}
navigation={true} 
modules={[Navigation]} 
className="projswiper">

   
{projects.map((proj) => {
          return (

            <SwiperSlide key={proj.id} >
                <Link href={"/projects/" + proj.id} >  
                <div>
              <ProjectImage img={proj.photo[0].downloadURL} text={localisator == 'ro' ? proj.titleRo : proj.titleEn}  alt="Project Main Image" />
              </div>             
               </Link>
            </SwiperSlide>
         
           );
          })}
      </Swiper>      

      <div className={styles.buttonContainer5} >
     <span  className={`${styles.button2} hover-underline-animation `}>{t('common:button_all')}</span>
         <IconContext.Provider value={{ size:'1.2em', }}>
       <FiArrowUpRight/>
         </IconContext.Provider>
       </div>
      </div>

      
{/* //==============================Tehnoloies section=================// */}

<section className={styles.bg2} >

<motion.div className={styles.textContainer}  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4  }}
  variants={fadeEffect}>
  
<motion.h1 className={styles.centerText3}

  variants={fadeEffect}>
{t('common:tehno')}
</motion.h1>


<motion.p  
  className={styles.descriptionText}
   variants={fadeEffect} >
{t('home:tehno_desc')}
</motion.p> 
</motion.div>


<div className={styles.tehnoCont}>
<TehnoDrawer maintitle={t("common:tehno1")} title={t("common:tehno1")} newimage={tehnobg1} text1={t("common:tehno_descript1")}  position="smallTehno11" />
 <div className={styles.singleTehno1}>
  <Image src={gif1} alt='Tehnologie showcase' layout="fill" objectFit="cover"/>
 </div>

<TehnoDrawer maintitle={t("common:tehno2")} title={t("common:tehno2")} newimage={tehnobg2} text1={t("common:tehno_descript2")}   position="smallTehno22" />
 <div className={styles.singleTehno2}>
  <Image src={gif2} alt='Tehnologie showcase' layout="fill" objectFit="cover"/>
 </div>

<TehnoDrawer maintitle={t("common:tehno6")}  title={t("common:tehno6")} newimage={tehnobg4} text1={t("common:tehno_descript3")}  position="smallTehno33" />
  <div className={styles.singleTehno3}>
    <Image src={gif3} alt='Tehnologie showcase' layout="fill" objectFit="cover"/>
  </div>
</div>

 <div className={styles.buttonContainer6} >
  <Link href="/tehno">
     <span className={`${styles.button2} hover-underline-animation `}>{t('common:button_all')}</span>
     </Link>
       <FiArrowUpRight className={styles.icon}/>
  </div>

</section>

{/* //==========================Service  section=============// */}
<section className={styles.basic}>
 <motion.div 
  className={styles.textContainer}  
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4  }}
  variants={fadeEffect}>
   <motion.h1 
   className={styles.centerText2}
   variants={fadeEffect}>
    {t('common:3_heder')}
   </motion.h1>
  <motion.p  
   className={styles.descriptionText}
   variants={fadeEffect} >
    {t('home:serv_desc')}
  </motion.p> 
 </motion.div>

 <FadeInWhenVisible>

    <div className={styles.historycontainer}>
  
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
</section>
{/* //==================================Furnizori section=========================// */}



<Marquee gradient={false} className={styles.marqueimgcontainer} speed='70' >
  {logos.map((logo) => (
        <div key={logo.id} className={styles.furnizorImg}>
          <Image src={logo.src} layout="fill" objectFit='contain' alt={`logo-${logo.id}`} />
        </div>
      ))}
  </Marquee>

  <Marquee gradient={false} direction="right"  className={styles.marqueimgcontainer2} speed='70' >
  {logos.reverse().map((logo) => (
        <div key={logo.id} className={styles.furnizorImg}>
          <Image src={logo.src} layout="fill" objectFit='contain' alt={`logo-${logo.id}`} />
        </div>
      ))}
  </Marquee>

{/* //==================================Why us=========================// */}
<WhyUs />


   </>
  )
}


