import { useState } from "react";
import Overlay from "./Overlay";
import Modal from "./Modal";
import Listing from "./Listing";
import { useTranslation } from 'next-i18next'
import Drawer from "react-modern-drawer";
import { FiX,FiArrowLeft } from "react-icons/fi";
import styles from "../../../styles/Components/Cards.module.css";
import Image from "next/image";



const Card = ({modalImge,modaldescription1,modaldescription2,modaldescription3,modaldescription4,modalTitle,Imageurl,paragraphh,titlee}) => {

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

 
  return (
    <>
      <Listing imageUrl={Imageurl} paragraph={paragraphh} title={titlee}  open={openModal} />
   
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
       <Image  src={modalImge} alt='Modern Tehnologie software showcase' layout="fill" objectFit="cover" />
     </div>
     <div className={styles.topText}>
       <h1>
 {modalTitle}
       </h1>
   </div>
 </div>
 


 
 <div className={styles.drawerFlex}>
 <p>{modaldescription1}</p>
 <p>{modaldescription2}</p>
 <p>{modaldescription3}</p>
 <p>{modaldescription4}</p>
 <div className={styles.back_container} onClick={ () =>setIsOpen((prevState) => !prevState)} >
        <FiArrowLeft  className={styles.icon}/>
</div>
 </div>
 
    </Drawer>

    </>
  );
};

export default Card;