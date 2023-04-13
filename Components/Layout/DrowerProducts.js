import { useTranslation } from "next-i18next";
import Link  from "next/link";
import { FiX,FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useRouter } from "next/router";



export const myFunction = () => {
  const [isOpen3, setIsOpen3] = useState(false);
  const toggleDrawer3 = () => {
    setIsOpen3((prevState) => !prevState);
  };
}

export const getServerSideProps = async () => {
  const products = await db.collectionGroup("products").limit(20).get();

  const productsData = products.docs.map((prod) => ({
    id: prod.id,
    ...prod.data(),
    params: { id: prod.id.toString() },
  }));

  const props = {
    products: JSON.parse(JSON.stringify(productsData)),
  };

  console.log( 'wow', props.products);

  return { props };
};

const DrawerProducts = (props) => {
  

  const { locale } = useRouter();
  const { t } = useTranslation();
  const localisator = t(locale);
  const prods = props.products



  const [isOpen3, setIsOpen3] = useState(false);
  const toggleDrawer3 = () => {
    setIsOpen3((prevState) => !prevState);
  };

  const [isOpen4, setIsOpen4] = useState(false);
  const toggleDrawer4 = () => {
    setIsOpen4((prevState) => !prevState);
  };


  const closeDrawer = () =>{
    toggleDrawer3()
    toggleDrawer4()
  }
  let specificTag = 'hot'

  return ( 
  <>

<Drawer
   open={isOpen4}
   zIndex='3'
   enableOverlay={true}
   onClose={toggleDrawer4}
   direction="left"
   size="35vw"
   style={{
   backgroundColor: "#191716",
   display: "flex",
   flexDirection: "column",
  

   }}>

<div className="arrow" onClick={toggleDrawer4}>
  <FiArrowLeft />
  </div>

  <div className="DrawerTop2">
            <h1 className="DrawerTopText">{t("common:1_heder")}</h1>
          </div>


             <div className="prductsContainer">
        
        <Link scroll={false}  href="/products">
          <h1  onClick={closeDrawer} className="hover-midline-animation ">
          {t('common:wine')}
          </h1>
      </Link>
                    <Link scroll={false}  href="/products">
                        <h1  onClick={closeDrawer} className="hover-midline-animation ">
                        {t('common:beer')}
                        </h1>
                    </Link>
     

                        <Link scroll={false}  href="/products">
                          <h1 onClick={closeDrawer}  className="hover-midline-animation ">
                          {t('common:food')}
                          </h1>
                        </Link>
                                <Link scroll={false}  href="/products">
                                  <h1 onClick={closeDrawer}  className="hover-midline-animation ">
                                  {t('common:oil')}
                                  </h1>
                                </Link>

                                      <Link scroll={false}  href="/products">
                                        <h1 onClick={closeDrawer}  className="hover-midline-animation ">
                                        {t('common:chemical')}
                                        </h1>
                                      </Link>

                              </div>  
    </Drawer>

  <Drawer
   open={isOpen3}
   onClose={toggleDrawer3}
   direction="left"
   size="35vw"
    zIndex='2'
   style={{
    boxShadow:'none',
     backgroundColor: "#191716",
    display: "flex",
   flexDirection: "column",  }}>
    <div className='x'  onClick={toggleDrawer3} >
    <FiX />
    </div>
 <div className="DrawerTop2">
            <h1 className="DrawerTopText">{t("common:1_heder")}</h1>
          </div>  
   <div className="prductsContainer">
        
        <Link scroll={false}  href="/products">
          <h1  onClick={toggleDrawer3} className="hover-midline-animation ">
          {t('common:shop_all')}
          </h1>
      </Link>
          
                    <h1 onClick={toggleDrawer4}  className="hover-midline-animation ">
                    {t('home:industry')}
                    </h1>
     

                    

                              </div>
                               


<div className="prductsContainer2"  >   
  {prods
  ?.filter((product) =>  product.tags?.includes(specificTag))
  .map((product) => (
  <Link scroll={false} key={product.id} href={"/products" + product.id}>
    <h1 onClick={toggleDrawer3}  className="hover-midline-animation link">
    {localisator == "ro" ? product.nameRo : product.nameEn}
    </h1>
  </Link>
 ))}
</div> 
</Drawer>












<div>
     <h1>Anywhere in your app!</h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
      
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
   </div>
  

  </> );
}
 
export default DrawerProducts;