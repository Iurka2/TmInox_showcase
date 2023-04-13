import styles from '../../../styles/Components/Cards.module.css'
import { motion } from "framer-motion";
import Image from 'next/image';
import { useTranslation } from 'next-i18next'
import { FiArrowUpRight } from "react-icons/fi";


const Listing = ({ imageUrl,paragraph,title , open }) => {

  const { t } = useTranslation();

  return (
    <motion.div className={styles.listing} onClick={open} whileHover={{ scale: 0.985 }}>
      <div className={styles.listing__content}>
        <div className={styles.listing__image_container}>
          <Image
            className={styles.listing__image}
            alt="Close up of specific tehnologie"
            src={imageUrl}
          />
        </div>
        <div className={styles.listing__details}>
     
          <div className={styles.listing__row}>
            <span className={styles.listing__price}>{title}</span>
          </div>
          <div className={styles.listing__row}>
            <span className={styles.listing__address}>{paragraph}</span>
          </div>

         <div className={styles.buttonContainer}>
           <span className={`${styles.button} hover-underline-animation2 `}>
               {t("common:read")}
            </span>
             <FiArrowUpRight className={styles.icon3} />
         </div>
        </div>
  
      </div>
    </motion.div>
  );
};

export default Listing;
