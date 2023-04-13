import Drawer from "react-modern-drawer";
import { FiX,FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import styles from "../../styles/tehno.module.css";
import Image from "next/image";
import { motion } from "framer-motion";


const hoverEffect = {
  initial: {
    opacity: 1,
  },

  animate: {
    opacity: 0,

  },
};




const TehnoDrawer = ({maintitle,title,newimage,text1,position}) => {
  
  const [isOpen, setIsOpen] = useState(false);

  return ( 
    <>



<motion.div className={styles[position]} 
            initial="initial"
            whileHover="animate"
            variants={hoverEffect} onClick={ () =>setIsOpen((prevState) => !prevState)} >
                    <h2 className={styles.tehnoText}>{maintitle}</h2>
      </motion.div>


    <Drawer
   open={isOpen}
   zIndex='9999999'
   enableOverlay={true}
   onClose={ () =>setIsOpen((prevState) => !prevState)}
   direction="top"
   size="100vh"
   style={{
   backgroundColor: "#191716",
   }}>
<div className={styles.x} onClick={ () =>setIsOpen((prevState) => !prevState)}>
  <FiX className={styles.xx} />
  </div>
<div className={styles.drawerTopContainer}>
    <div className={styles.drawerImage}>
      <Image className={styles.drawerImagee} src={newimage} alt='Modern Tehnologie software showcase' layout="fill" objectFit="cover" />
    </div>
    <div className={styles.topText}>
      <h1>
{title}
      </h1>
  </div>
</div>

<div className={styles.drawerFlex}>
<p>{text1}</p>
<div  onClick={ () =>setIsOpen((prevState) => !prevState)} >
       <FiArrowLeft  className={styles.icon}/>
       </div>

</div>

   </Drawer>
    </>
   );
}
 
export default TehnoDrawer;