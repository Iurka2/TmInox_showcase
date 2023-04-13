
import Contact from "./Contact";
import Footer from "./Footer";
import Heder from "./Heder";

  


const Layout = ({children}) => {

  return ( 
    <>
 
<Heder />
{children}
<Contact />
<Footer />


   
    </>
   );
}
 
export default Layout;