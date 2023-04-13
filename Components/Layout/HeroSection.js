import { Parallax, useParallax } from 'react-scroll-parallax';
import styles from '../../styles/Components/hero.module.css'
import { useTranslation } from 'next-i18next'
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import transparent from '../../public/Photos/topPartPage/transpText.png'
import Image from 'next/image';
import Link from 'next/link';
import heroImg from '../../public/Resources/hero.JPG';




const fadeEffect = {
  hidden: {
    y: 50,
    opacity:0,
    transition:{
      staggerChildren: 0.3
    }
  },

  visible: {
    y: 0,
    opacity:1,
    transition: {
      type: "spring",
      staggerChildren: 0.3,
      mass: 0.5,
      damping: 20
    }

  }
  
}



const HeroSection = ({title, text,link}) => {



  const parallax2 = useParallax({
    speed: -10,
  });


  const { t } = useTranslation();
  return ( 
  <>


  <div  className={styles.container}>
<div className={styles.transp} ref={parallax2.ref}>
  <Image src={transparent} alt='Tm inox transparent'/>
  </div>
    <div className={styles.flexContainer}>

    <motion.div  className={styles.textContainer}  initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3  }}
              variants={fadeEffect} >
    <motion.h1 className={styles.heading}  variants={fadeEffect} >{title}</motion.h1>
    <motion.p className={styles.paragraph}  variants={fadeEffect}>{text}</motion.p>
   <Link href={link}>
    <motion.div className={styles.buttonContainer}  variants={fadeEffect} >
     <span  className='hederButton hover-midline-animation2'>{t('common:button_learn')}</span>
       <FiArrowUpRight className={styles.icon}/>
       </motion.div>
       </Link>
    </motion.div>
 <motion.div variants={fadeEffect}initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6  }} 
              className={styles.image} >
 <Parallax  speed={20}  >

          <Image layout='responsive' objectFit='contain' className={styles.imagee} src={heroImg}  alt="Abstract inox metal"/>


 </Parallax>
</motion.div>
    </div>

  </div>
  
  </> );
}
 
export default HeroSection;