import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";


import { FiBookOpen } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { FiDivideSquare } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
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
      staggerChildren: 0.1,
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
      viewport={{ once: true, amount: 0.3  }}
      variants={fadeEffect}

    >
      {children}
    </motion.div>
  );
}




const WhyUs = () => {
  const { t } = useTranslation();
  return ( 

    <FadeInWhenVisible>
<section className='why_container'>
<div className='why_container_text'>

 <div className='why_main_colum' >
<motion.div className="why_colum" variants={fadeEffect}>
       <FiBookOpen className="icon"/>
       <motion.h1 variants={fadeEffect} >{t("common:whyHead_1")}</motion.h1>
<motion.span variants={fadeEffect}> {t("common:why_1")}</motion.span>
</motion.div>


    <motion.div className="why_colum">
       <FiDivideSquare className="icon"/>
       <motion.h1 variants={fadeEffect} >{t("common:whyHead_2")}</motion.h1>
    <motion.span variants={fadeEffect}>{t("common:why_4")}  </motion.span>
    </motion.div>


       
   
       <motion.div className="why_colum">
       <FiMapPin className="icon"/>
       <motion.h1 variants={fadeEffect} >{t("common:whyHead_3")}</motion.h1>
       <motion.span variants={fadeEffect}>{t("common:why_2")} </motion.span>
       </motion.div>


       </div>

       
  <div className='why_main_colum' >
         <motion.div className="why_colum">
       <FiAward className="icon"/>
       <motion.h1 variants={fadeEffect} >{t("common:whyHead_4")}</motion.h1>
         <motion.span variants={fadeEffect}>{t("common:why_5")}</motion.span>
         </motion.div>
      

         
       
            <motion.div className="why_colum">
       <FiPackage className="icon"/>
       <motion.h1 variants={fadeEffect} >{t("common:whyHead_5")}</motion.h1>
            <motion.span variants={fadeEffect}>{t("common:why_3")} </motion.span>
            </motion.div>
   
            
  
              <motion.div className="why_colum">
       <FiStar className="icon"/>
       <motion.h1 variants={fadeEffect} >{t("common:whyHead_6")}</motion.h1>
              <motion.span variants={fadeEffect}>{t("common:why_6")}</motion.span>
              </motion.div>
              </div>

</div>

</section>
</FadeInWhenVisible>
   );
}
 
export default WhyUs;