import styles from '../styles/Components/toppart.module.css'
import Image from 'next/image';
import { ParallaxBanner, ParallaxBannerLayer,Parallax } from 'react-scroll-parallax';
import {  motion } from 'framer-motion';
import { FiChevronsDown } from "react-icons/fi";
import { BiMouse } from "react-icons/bi";
import React, { useRef } from "react";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from 'react-responsive'
import { useState,useEffect } from 'react';


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



const scroll = {
  initial: {
    y: 0,

  },

  animate: {
    y: 10,
    transition: {
      type: "spring",
    }

  }
  
}



  const TopPart = ({img,imgmobile,alt, text}) => {

    const buttonRef = useRef(null);


    const { t } = useTranslation();

    function scrollDown(percentage) {
      const height = window.innerHeight;
      const scrollDistance = percentage * height;
      window.scrollBy(0, scrollDistance);
    }


    const [hydrated, setHydrated] = useState(false);
	const isDesktop = useMediaQuery(
		{ query: "(min-width: 814px)" },
		hydrated ? undefined  : { deviceWidth: 814 }
	);

	useEffect(() => {
		setHydrated(true);
	}, []);






    return ( 

  <>
  <motion.div className={styles.topAllContainer}>
  <ParallaxBanner  className={styles.topContainer} >
    <ParallaxBannerLayer speed={-20}  >
      <Image 
      src={isDesktop ? img : imgmobile} 
      alt={alt} 
      layout='fill' 
      priority
      placeholder='blur'
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
                {text}
              </motion.h1>
          </Parallax>
      </motion.div>

  <motion.div    initial='initial'  whileHover='animate'  className={styles.icon}    ref={buttonRef} onClick={() => scrollDown(1)}>
  <BiMouse className={styles.icon3}  />
  <motion.span variants={scroll}>
  <FiChevronsDown className={styles.icon2}  />
  </motion.span>
  </motion.div>


  </motion.div>
    

  </>


   );
}
 
export default TopPart;


