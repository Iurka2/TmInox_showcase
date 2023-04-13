import Marquee from "react-fast-marquee";
import Image from "next/image";
import image1 from '../../public/Photos/marqueeImages/image1.jpg'
import image2 from '../../public/Photos/marqueeImages/image2.jpg'
import image3 from '../../public/Photos/marqueeImages/img3.jpeg'
import image4 from '../../public/Photos/marqueeImages/img4.jpeg'
import image5 from '../../public/Photos/marqueeImages/img5.jpeg'
import image6 from '../../public/Photos/marqueeImages/img6.jpg'
import image7 from '../../public/Photos/marqueeImages/img7.jpg'
import image11 from '../../public/Photos/marqueeImages/img11.JPG'
import image10 from '../../public/Photos/marqueeImages/img10.JPG'




const MarqueImg2 = () => {
  return ( 

   <Marquee gradient={false} className="marqueimgcontainer2" direction="right" speed='32' >

<div className="marqueimg">
 <Image src={image1} layout="responsive" objectFit="contain"  alt="recent inox project " />
 </div>
 
 <div className="marqueimg">
 <Image src={image2} layout="responsive" objectFit="contain"  alt="recent automated / automatizat project " />
 </div>
 
 <div className="marqueimg">
 <Image src={image3} layout="responsive" objectFit="contain"  alt="recent stainless stell project" />
 </div>
 
 <div className="marqueimg">
 <Image src={image4} layout="responsive" objectFit="contain"  alt="recent rezervor project" />
 </div>

 <div className="marqueimg">
 <Image src={image5} layout="responsive" objectFit="contain" alt="recent capac flotant project"  />
 </div>

 <div className="marqueimg">
<Image src={image6} layout="responsive" objectFit="contain"  alt="recent enginerie project " />
</div>

<div className="marqueimg">
<Image src={image7} layout="responsive" objectFit="contain"  alt="recent project" />
</div>

<div className="marqueimg">
<Image src={image11} layout="responsive" objectFit="contain"  alt="recent project" />
</div>

<div className="marqueimg">
<Image src={image10} layout="responsive" objectFit="contain"  alt="recent project" />
</div>
  </Marquee>
   );
}
 
export default MarqueImg2;