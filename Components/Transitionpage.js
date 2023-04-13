import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";




const navAnimate = {
  hidden: {
     scale:1.20,
     originY:0,
  },

  visible: {
    scale:1,
    transition: {
      damping: 60,
      type: "spring",
      stiffness: 285,
     
      
    }
  },

  out:{
    opacity: 0,
    transition: {
    delay:0.1 
    }
  }
}

const moduler = {
  hidden: {
    y: 1000,
   
  },

  visible: {
    y: [1000,0,0,-2000],
    transition: {
      type:'spring'
  },
},

  out:{
    y: -2000,
   opacity:0,
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
const TransitionPage = ({children}) => {
const {asPath} = useRouter()



  return (

    <>

      <div className="effect-1">
        <motion.div
        key={asPath}
        className="module"
        initial="hidden"
        animate="visible"
        exit="out"
        variants={moduler}>
      </motion.div>

        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }
        >
          <motion.div
           
            key={asPath}
            variants={navAnimate}
            animate="visible"
            initial="hidden"
            exit="out"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default TransitionPage;