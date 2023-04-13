import { motion, AnimatePresence,isPresent } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";





const moduler = {
  hidden: {
    y: 0,
  },

  visible: {
    y: [1000,0,0,-1000],
    transition: {
    type:'spring',
      mass:1,
      damping: 60,
      stiffness:280 
  },
},

  out:{
    y: -1000,

 transition: {
      type:'spring',
      mass:1,
      damping: 80,
      stiffness:280
  },
}

}



/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs
 */
const TransitionEffect = () => {
  const { asPath } = useRouter();
  

  return (


 <motion.div
 key={asPath}
  className="module"
 initial='hidden'
 animate='visible'
 exit="out"
 style={{ x: isPresent ? 1 : 0 }}
 variants={moduler}>
  

</motion.div>


  );
};

export default TransitionEffect;