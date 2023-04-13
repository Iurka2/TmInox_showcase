import Image from "next/image";
import logo from '/public/Resources/logo.png'
import { useTranslation } from 'next-i18next'
import Link from "next/link";
const Footer = () => {
  const { t } = useTranslation();
  
  
  return ( 
  <>
<div className="footerContainer">
<div className="footerContainer2">
   <div className="footerImg">
    <Image src={logo} layout='responsive' objectFit="cover" alt="Tm Inox Logo" />

 </div>


<div className="pageslists">
 <div className="pageslist">
  <div className="footerItem">
    <Link href='/products'>
      <h2 className="footerHeading">{t('common:1_heder')}</h2>
    </Link>
  </div>
  
  <div className="footerItem">
    <Link href='/projects'>
      <h2 className="footerHeading">{t('common:2_heder')}</h2>
    </Link>
  </div>
  
  <div className="footerItem">
    <Link href='/services'>
      <h2 className="footerHeading">{t('common:3_heder')}</h2>
    </Link>
  </div>
 </div>

 <div className="pageslist">
  <div className="footerItem">
    <Link href='/ContactPage'>
      <h2 className="footerHeading">{t('common:5_heder')}</h2>
    </Link>
  </div>
  
  <div className="footerItem">
    <Link href='/aboutUs'>
      <h2 className="footerHeading">{t('common:4_heder')}</h2>
    </Link>
  </div>
  
  <div className="footerItem">
    <Link href='/tehno'>
      <h2 className="footerHeading">{t('common:tehno')}</h2>
    </Link>
  </div>
 </div>
</div>


<div className="pageslist2">

  <div className="footerItem">
    <h2 className="footerHeading">Str. Fundătura Hărmanului 4, 500240 Brașov</h2>
  </div>

  <div className="footerItem">
    <h2 className="footerHeading">office@tminox.com.ro</h2>
  </div>

  <div className="footerItem">
   <h2 className="footerHeading">{t("common:phone")}</h2>
  </div>
</div>

</div>
<div className="footerbottom">
  <p>© 2022 TM INOX SRL Romania. Toate drepturile rezervate </p>
  <Link href='/PrivacyPolicy'>
  <p style={{cursor:"pointer", }}>Privacy & Policy</p>
  </Link>
</div>

</div>





  
  </> 
  );}
 
export default Footer;

// <div className="iconsContainer">
// <FiMapPin className="footerIcon" />
// <>Str. Fundătura Hărmanului 4, 500240 Brașov</>
// </div>

//    <div className="iconsContainer">
//      <FiPhone className="footerIcon"/>
//    <>+40 368 44 10 90</>
//    </div>
        
//         <div className="iconsContainer">
//           <FiMail className="footerIcon"/>
//         <>office@tminox.com.ro</>
//         </div>