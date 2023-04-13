import Layout from '../Components/Layout/Layout'
import '../styles/globals.css'
import {appWithTranslation} from 'next-i18next'
import { Toaster } from 'react-hot-toast'
import { ParallaxProvider } from 'react-scroll-parallax';
import { Router} from 'next/router';
import TransitionPage from '../Components/Transitionpage';
import { AnimatePresence,motion } from "framer-motion";
import { useState,useEffect } from 'react';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css'; //styles of nprogress
import CookiesNotice from '../Components/UI/Cokies';
import { db } from "../utils/firebase/firebase.js"


NProgress.configure({ showSpinner: false })





//==================Main animation============//

const blackBox = {
  initial: {
    y: 0,

  },
  animate: {
    y: -1000,
    transition: {
      when: "afterChildren",
      duration: 0.9,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,

    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};




const InitialTransition = () => {


  return (
    <>
  <motion.div
       className="FirstModal"
       initial="initial"
       animate="animate"
       variants={blackBox}
       onAnimationStart={() => document.body.classList.add("overflow-hidden")}
       onAnimationComplete={() =>
         document.body.classList.remove("overflow-hidden")
       }
    >

<motion.svg variants={textContainer} className="FirstTextCont">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          style={{color:'black'}}
        >
          <rect className="rectt" />
          <motion.rect
            variants={text}
           style={{width:"100%", height:'100%', color:"grey", fill: "#FF6E00"}}
          />
        </pattern>
        <text
          textAnchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#pattern)", fontSize:"2rem",fontWeight:500, }}
        >
        TM INOX
        </text>
      </motion.svg>
      </motion.div>

      </>
  )
}


//===================================Stops css from demounting for 1/2sec======//

 const fixTimeoutTransition = (timeout) => {
  Router.events.on('beforeHistoryChange', () => {
    // Create a clone of every <style> and <link> that currently affects the page. It doesn't matter
    // if Next.js is going to remove them or not since we are going to remove the copies ourselves
    // later on when the transition finishes.
    const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])')
    const copies = [...nodes].map((el) => el.cloneNode(true))

    for (let copy of copies) {
      // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
      // change process.
      copy.removeAttribute('data-n-p')
      copy.removeAttribute('data-n-href')

      // Add duplicated nodes to the DOM.
      document.head.appendChild(copy)
    }

    const handler = () => {
      // Emulate a `.once` method using `.on` and `.off`
      Router.events.off('routeChangeComplete', handler)

      window.setTimeout(() => {
        for (let copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy)
        }
      }, timeout)
    }

    Router.events.on('routeChangeComplete', handler)
  })
}

fixTimeoutTransition(3000)

//====================================Loading===========//

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

//=================================Main===================//

function MyApp({ Component, pageProps, router }) {
  
  const [isFirstMount, setIsFirstMount] = useState(true);
  useEffect(() => {
    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
  
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isFirstMount, router.events]);




return(
<>
{/* {isFirstMount && <InitialTransition />} */}
<CookiesNotice />
<Toaster />
<ParallaxProvider>
<Layout>
<TransitionPage>
  <AnimatePresence >
  <Component   {...pageProps} isFirstMount={isFirstMount} key={router.route}    />
  </AnimatePresence>
  </TransitionPage>
  </Layout>
  </ParallaxProvider>

</>
 ) 
}

export default appWithTranslation(MyApp)
