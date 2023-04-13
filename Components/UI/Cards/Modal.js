import { motion } from "framer-motion";
import styles from '../../../styles/Components/Cards.module.css'
import { FiXCircle } from "react-icons/fi";
import Image from "next/image";
const Modal = ({ modalimage,modaltitle,modaldescription, close }) => {


  const modalVariants = {
    open: {
      opacity: 1,
      transition: { type: "spring", stiffness: 100  },
    },
    closed: { opacity: 0 },
  };

  const imageVariants = {
    open: { opacity: 1},
    closed: { opacity: 0 },
  };

  const modalInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.3 } },
    closed: { opacity: 0 },
  };

  const modalRowVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 15},
  };

  return (
    <motion.div
      className={styles.modal}
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >


      <motion.div className={styles.modal__info} variants={modalInfoVariants}>
        <motion.div className={styles.modal__row} variants={modalRowVariants}>
          <span className={styles.modal__price}>{modaltitle}</span>
        </motion.div>
  
        <motion.div
          className={styles.modal__description_wrapper}
          variants={modalRowVariants}
        >
          <p className={styles.modal__description}>{modaldescription}</p>
        </motion.div>
        <motion.button
          className={styles.modal__close_wrapper}
          whileHover={{ scale: 1.2 }}
          onClick={close}
        >
          
          <FiXCircle className={styles.modal__close_icon} />
        </motion.button>
      </motion.div>
      <motion.div variants={imageVariants} className={styles.modal__imageCont}>
      <Image
        className={styles.modal__image}
        alt="Tehnolgie for automatization"
        src={modalimage}
      />
      </motion.div>
    </motion.div>
  );
};

export default Modal;
