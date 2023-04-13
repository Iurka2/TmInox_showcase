import { FiChevronDown } from "react-icons/fi";
import Collapsible from "react-collapsible";
import styles from "../../styles/services.module.css"

const Trigg = ({trigger}) =>{
  return(
    <div className={styles.icon}>
  <p>
  {trigger}
  </p>
<FiChevronDown className={styles.icon2} />
      </div>
  )
}


const Drop = ({newtirgger,content}) => {


const trig = <Trigg  trigger={newtirgger}/>

  return ( 

    <div className={styles.flexcolum}>
    <div className={styles.iconcont}>
      <Collapsible
        trigger={trig}
        transitionTime="300"
        triggerStyle={{
          fontSize:'1.7rem',
          cursor: "pointer",
          order: "0",
        }}
        easing="ease-in"
      >
        <p className={styles.colapseP}>
          {content}
        </p>
      </Collapsible>
    </div>
  </div>

   );
}
 
export default Drop;