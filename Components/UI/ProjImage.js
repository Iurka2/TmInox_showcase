import { motion } from 'framer-motion';
import styles from '../../styles/Project.module.css'
import Image from 'next/image';

const fadeEffect = {
  hidden: {
    y: 50,
    opacity:0,
  },

  visible: {
    y: 0,
    opacity:1,
    transition: {
      damping: 50,
      type: "spring",
      stiffness: 200,

     
    }
  }
}



const ProjectImage = ({img,text}) => {
  return ( 
<>
        <div className='box3'>
        <Image  lazyBoundary='150%' src={img} layout='responsive' width="400px" height="400px" alt='Project main'   /> 
        <div className="uncover">
          <motion.div   
          whileInView={{height:0}} 
          transition={{damping: 60,
                      type: "spring",
                      stiffness: 200,}}
         viewport={{ once: true, amount: 0.7  }}
          className="uncover_slice"></motion.div>
      </div>
  

          <motion.h2 className={styles.projH2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2}}
          variants={fadeEffect}
          >
           {text}
          </motion.h2>  
          </div>
</>

   );
}
 
export default ProjectImage;