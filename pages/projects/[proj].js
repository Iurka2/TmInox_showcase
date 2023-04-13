import styles from '../../styles/Components/projects.module.css'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Zoom from 'react-medium-image-zoom'
import { motion } from "framer-motion";
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import { db } from "../../utils/firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import "react-medium-image-zoom/dist/styles.css";
import Head from 'next/head';
import { FiChevronsDown,FiArrowRight,FiArrowLeft } from "react-icons/fi";
import { ParallaxBanner, ParallaxBannerLayer,Parallax } from 'react-scroll-parallax';
import { useRef } from "react";

const scaleUp = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 0.99,
    transition: {
    type:'spring',
    }
  }
};

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
      mass: 0.5,
      damping: 20,
      delay: 0.5
    }

  }
  
}


const NextProject = ({ projects }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [allVisited, setAllVisited] = useState(false);

  function handleClick() {
     // Get the list of visited routes from localStorage
     const visitedRoutes = JSON.parse(localStorage.getItem('visitedRoutes')) || [];

     // Filter out the visited routes from the list of available projects
     let availableProjects = projects.filter((project) => !visitedRoutes.includes(project.id));
 
     // Keep re-filtering the availableProjects array until there are no more unvisited routes
     while (availableProjects.length === 0) {
       visitedRoutes.length = 0; // Clear the visited routes array if all projects have been visited
       localStorage.setItem('visitedRoutes', JSON.stringify(visitedRoutes)); // Save the cleared array to localStorage
       availableProjects = projects.filter((project) => !visitedRoutes.includes(project.id));
     }
 
     // Select a random project from the available projects
     const randomProject = availableProjects[Math.floor(Math.random(0) * availableProjects.length)];
 
     // Add the new route to the visited routes in localStorage
     visitedRoutes.push(randomProject.id);
     localStorage.setItem('visitedRoutes', JSON.stringify(visitedRoutes));

 
     // Navigate to the new route
     router.push(`/projects/${randomProject.id}`);


     console.log(visitedRoutes)
  }


  
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/projects') {
        localStorage.removeItem('visitedRoutes');
        setAllVisited(false);
      }
      
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
    
  }, [router]);

  useEffect(() => {
    const visitedRoutes = JSON.parse(localStorage.getItem('visitedRoutes')) || [];

    if (router.pathname === '/projects' && visitedRoutes.length === 0) {
      const firstProject = projects[0];
      visitedRoutes.push(firstProject.id);
      localStorage.setItem('visitedRoutes', JSON.stringify(visitedRoutes));
    }
  }, [router, projects]);


  function handleBackClick() {
    router.back();
  }

  return (
    <>
   
    <div  className={styles.next_button_main_container} key={projects.id} >
    <div className={styles.next_button_container}  >
     <FiArrowLeft className={styles.icon2}/>
        <button onClick={handleBackClick} className={`${styles.next_button} hover-midline-animation `}>{t('common:back')}</button>
       </div>
      
       <div  className={styles.next_button_container} >
        <button onClick={handleClick} className={`${styles.next_button} hover-underline-animation `}>{t('common:next')}</button>
         <FiArrowRight className={styles.icon2}/>
       </div>
       </div>


    </>
  );
};



const ProjectTemplate = (props) => {
  
  
  const { project } = props;
  const { locale } = useRouter();
  const { t } = useTranslation();
  const localisator = t(locale);




  const [projects, setProjects] = useState(props.projects);
  // const getImagesByTag = async () => {
  //   setProjects([]);
  //   //--------------------
  //   //GET THE IMAGES HERE
  //   //--------------------
  //   setProjects(projects);
  // };
  
  const buttonRef = useRef(null);

  function scrollDown(percentage) {
    const height = window.innerHeight;
    const scrollDistance = percentage * height;
    window.scrollBy(0, scrollDistance);
  }
  

  return ( 

<>

<Head>
  <title>TM INOX | {t('common:2_heder')} | {localisator == "ro" ? project.titleRo : project.titleEn} </title>
  <meta name="description" content={localisator == "ro" ? project.aboutRo : project.aboutEn} />
  <meta property="og:title" content={t('common:2_heder')}  key="ogtitle" />
  <meta property="og:description" content={localisator == "ro" ? project.aboutRo : project.aboutEn} key="ogdesc" />
</Head>



<motion.div className={styles.topAllContainer}>
  <ParallaxBanner  className={styles.topContainer} >
    <ParallaxBannerLayer speed={-20}  >
      <Image 
      src={project.photo[0].downloadURL} 
      alt={localisator == 'ro' ? project.titleRo : project.titleEn}
      layout='fill' 
      priority
      objectFit='cover'
      className={styles.images}
      
      />
    </ParallaxBannerLayer>
  </ParallaxBanner>


    <motion.div className={styles.topTextContainer}  >
        <Parallax speed={10}>
              <motion.h1 initial="hidden"
                whileInView="visible" 
                variants={fadeEffect} 
                className={styles.topText}>
            {localisator == 'ro' ? project.titleRo : project.titleEn}
              </motion.h1>
          </Parallax>
      </motion.div>

  <div className={styles.icon} ref={buttonRef} onClick={() => scrollDown(1)}>
  <FiChevronsDown />
  </div>


  </motion.div>



<div className={styles.projAbout}>

<div className={styles.about}>
 <h1>{t('common:abt_proj')} </h1>
 <p>{localisator == "ro" ? project.aboutRo : project.aboutEn}</p>
</div>

<div className={styles.location}>
 <h1>{t('common:location')}</h1>
 <p>{project.location}</p>
</div>

<div className={styles.service}>
 <h1>{t('common:servv')}</h1>
 <p>{localisator == "ro" ? project.serviceRo : project.serviceEn}</p>
</div>

<div className={styles.date}>
 <h1>{t('common:date')}</h1>
 <p>{project.date}</p>
</div>

</div>  


      
<div className={styles.gridgallery}>
      {project.showcaseImages?.map((image) => (
        <motion.div key={project.id} className={styles.gridImg} variants={scaleUp} initial="initial" whileHover="animate">
            <Zoom  wrapStyle={{ maxWidth: "100%" }}>
              <Image src={image.downloadURL} alt="Showcase image of project" layout="responsive" width={400} height={400} />
            </Zoom>
        </motion.div>
      ))}
    </div>



<NextProject projects={projects}   />

</>

   );
}
//=======================GET SERVER SIDE PROPS=============
export async function getServerSideProps(context) {
  const { locale } = context;

  const { params } = context;
  const { proj } = params;

  const docRef = doc(db, "projects", proj);
  const docSnap = await getDoc(docRef);
  //
  const projectData = docSnap.data();
  const project = JSON.parse(JSON.stringify(projectData));
 
   const projects = await db.collection("projects").limit(20).get();

  const ProjectData = projects.docs.map((proj) => ({
    id: proj.id,
    ...proj.data(),
    params: { id: proj.id.toString() },
  }));



  return {
    props: {
      project,
      ...(await serverSideTranslations(locale, ["common", "home"])),
      projects: JSON.parse(JSON.stringify(ProjectData)),
    },

  };
}



 
export default ProjectTemplate;