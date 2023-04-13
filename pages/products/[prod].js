import styles from "../../styles/Components/productDetail.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiChevronsRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, FreeMode,Pagination } from "swiper";
import { useRouter } from "next/router";
import Link from "next/link";
import { db } from "../../utils/firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Head from "next/head";
import "react-medium-image-zoom/dist/styles.css";
import pdfImage from "../../public/Resources/pdf.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const scaleUp = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 0.98,

    transition: {
      type: "spring",
    },
  },
};

//===============================================Components for tehnical info==============//

const Downloads = (props) => {
  const { product } = props;
  const { t } = useTranslation();

  return (
    <>
      {product.pdf && product.pdf.length > 0 ? (
        <>
          {product.pdf.map((pdf) => (
            <div className={styles.pdfBig} key={pdf.id}>
              <div className={styles.pdf_container}>
                <a
                  key={pdf.id}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.pdf}
                  href={pdf.downloadURL}
                >
                  <Image src={pdfImage} alt="pdf icon" width={34} height={34} />
                  {pdf.name}
                </a>
              </div>
            </div>
          ))}
        </>
      ) : (
<div className={styles.empty}>
  <p>
{t("common:contact_empty")}
</p>
</div>
      )}
    </>
  );
};

const Info = (props) => {
  const { t } = useTranslation();
  const { product } = props;

  // console.log(product);

  return (
    <>
      {product.dotareRo1 || product.caractRo || product.tehnicalData || product.materials || product.tabel ? (
        <>
          {product.dotareRo1 ? (
            <div className={styles.icon}>
              <h2>{t("common:dotare_standart")}</h2>
              <ReactMarkdown className={styles.list}>
                {product.dotareRo1}
              </ReactMarkdown>
            </div>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
  
          {product.caractRo ? (
            <div className={styles.icon}>
              <h2>{t("common:dotare_optional")}</h2>
              <ReactMarkdown className={styles.list}>
                {product.dotareRo2}
              </ReactMarkdown>
            </div>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
  
          {product.tehnicalData ? (
            <div className={styles.big_table_container}>
              <h2>{t("common:tehno_data")}</h2>
              <ReactMarkdown
                className={styles.table_container}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={rehypeRaw}
              >
                {product.tehnicalData}
              </ReactMarkdown>
            </div>
          ) : null}
  
          {product.materials ? (
            <div className={styles.big_table_container}>
              <h2>{t("common:materials")}</h2>
              <ReactMarkdown
                className={styles.table_container}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={rehypeRaw}
              >
                {product.materials}
              </ReactMarkdown>
            </div>
          ) : null}
  
          {product.tabel ? (
            <div className={styles.big_table_container}>
              <h2>{t("common:dotare_tehnic")}</h2>
              <ReactMarkdown
                className={styles.table_container}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={rehypeRaw}
              >
                {product.tabel}
              </ReactMarkdown>
            </div>
          ) : null}
        </>
      ) : 
      <div className={styles.empty}>
      <p>
    {t("common:contact_empty")}
    </p>
    </div>}
    </>
  );
};

const Serii = (props) => {
  const { serii } = props;
  const [showFullTable, setShowFullTable] = useState(false);
  const { t } = useTranslation();
  const { product } = props;
    // getProdSerii(product);
  return (
    <>

{serii && serii.length > 0 || product && product.tabelSerii ? (
  <> 
     <div>
  <div className={styles.serii_main_container}>
    {serii.map((serie) => (
        <motion.a   
        variants={scaleUp}
        whileHover="animate"
        key={serie.pdfFile.id}
        target="_blank"
        rel="noreferrer"
        href={serie.pdfFile && serie.pdfFile[0] ? serie.pdfFile[0].downloadURL : ''}
        className={styles.serii_container}>
          <div className={styles.serii_img} key={serie.id}>
            <Image
              src={serie.seriiPhoto && serie.seriiPhoto[0] ? serie.seriiPhoto[0].downloadURL : ''}
              layout="responsive"
              objectFit="contain"
              width={"100%"}
              height={"70%"}
              alt={serie.titlu}
            />
          </div>
          <p className={styles.serii_titlu}>
            {serie.titlu}
          </p>
        </motion.a>
    ))}

  </div>

  {product.tabelSerii ? (
        <>
          <div className={styles.big_table_container}>
          <h2 >{t("common:tabel_h1")}</h2>
            <ReactMarkdown
              className={styles.table_container}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={rehypeRaw}
            >
           
              {showFullTable
                    ? product.tabelSerii
                    : product.tabelSerii?.slice(0, product.tabelSerii.length / 10)}
            </ReactMarkdown>

            {product.tabelSerii && (
                    <button className={styles.serii_button} onClick={() => setShowFullTable(!showFullTable)}>
                      {showFullTable ? t("common:less") : t("common:tabel_show")}  <FiChevronsRight className={styles.icon4} />
                    </button>
                  )}
          </div>
        </>
      ) : 
       null
      }
    </div>
  </>
) : 
(
<div className={styles.empty}>
  <p>
{t("common:contact_empty")}
</p>
</div>
)

}

    </>
  );
};

//=============================PRODUCT============================
const Details = (props) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { product } = props;
   
  const allIngredients = [
    {icon:  <Serii product={product} serii={props.serii} /> , label: t("common:seria") },
    { icon: <Info product={product} />, label: t("common:info_tehno") },
    { icon: <Downloads product={product} />, label: t("common:downlod") }
  ];

   
  const [serii, info, downl] = allIngredients;
  const initialTabs = [product.manufacturer[0].name === "EBARA" ? serii : null, info, downl];

  const [selectedTab, setSelectedTab] = useState(initialTabs[1]);





  let localisator = t(locale);

  let description =
    localisator == "ro" ? product.descriptionRo : product.descriptionEn;

  const router = useRouter();
  //==========================================Hydration ==============//
  const [hydrated, setHydrated] = useState(false);
  const isDesktop = useMediaQuery(
    { query: "(min-width: 814px)" },
    hydrated ? undefined : { deviceWidth: 814 }
  );
  useEffect(() => {
    setHydrated(true);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //==========================================Get Prod ==============//
  const [products, setProducts] = useState(props.products);

  //==========================================Show more ==============//
  const [showFullText, setShowFullText] = useState(true);

  const descriptString = showFullText ? description.slice(0, 300) : description;

  function toggleFullText() {
    setShowFullText(!showFullText);
  }

  return (
    <>
      <Head>
        <title>
          TM INOX | {t("common:1_heder")} |{" "}
          {localisator == "ro" ? product.nameRo : product.nameEn}{" "}
        </title>
        <meta
          name="description"
          content={
            localisator == "ro" ? product.descriptionRo : product.descriptionEn
          }
        />
        <meta property="og:title" content={t("common:1_heder")} key="ogtitle" />
        <meta
          property="og:description"
          content={localisator == "ro" ? product.nameRo : product.nameEn}
          key="ogdesc"
        />
      </Head>

      <div className={styles.flexCont}>
        {product.image.length === 1 ? (
          <>
            <div className={styles.img}>
              <Image
                src={product.image[0].downloadURL}
                layout="fill"
                objectFit="contain"
                alt={localisator == "ro" ? product.nameRo : product.nameEn}
              />
            </div>
          </>
        ) : (
          <>
            <Swiper
              spaceBetween={1}
              navigation={isTabletOrMobile ? false : true}
              pagination={isTabletOrMobile ? true : false}
              modules={[Navigation,Pagination]}
              className={styles.mySwiper2}
            >
              {product.image.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className={styles.img}>
                    <Image
                      src={image.downloadURL}
                      layout="fill"
                      objectFit="contain"
                      alt={product.name}
                      key={image.id}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
        <div className={styles.flex2}>
          <h1 className={styles.heading}>
            {localisator == "ro" ? product.nameRo : product.nameEn}
          </h1>

          <hr className={styles.divider}></hr>

          <div className={styles.flexcolum}>
            <span className={styles.tag}>{product.manufacturer[0].name}</span>
            {product.categorii && product.categorii[0]?.name && (
              <span className={styles.tag}>{product.categorii[0].name}</span>
            )}
          </div>
          <ReactMarkdown className={styles.descript}>
            {descriptString}
          </ReactMarkdown>

          <span className={`${styles.show_more} `} onClick={toggleFullText}>
            {showFullText ? t("common:more") : t("common:less")}
            <FiChevronsRight className={styles.icon4} />
          </span>

          <div className={styles.buttonContainer}>
            <a href="#contactSection">
              <span className={`${styles.button} hover-underline-animation `}>
                {t("common:button_heder")}
              </span>
            </a>
            <FiArrowUpRight className={styles.icon3} />
          </div>
        </div>
      </div>

      {/* //=====================================Tehno description===================// */}

      {/* //-----------------------------------------------------Pentru Vladuske cisti vilkoi------------------ */}

     
      <div className={styles.tehno_container}>
        <div className={styles.window}>
        <div className={styles.top_bar}>
  <ul className={styles.tehno_lists}>
    {initialTabs.filter(item => item !== null).map(item => (
      <li
        key={item.label}
        className={styles.tehno_li}
        onClick={() => setSelectedTab(item)}
      >
        {item.label}
        {item.label === selectedTab.label ? (
          <motion.div
            className={styles.underline}
            layoutId="underline"
          />
        ) : 
        null}
      </li>
    ))}
  </ul>
</div>

            <div className={styles.main_tehno}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab ? selectedTab.label : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.mini_tehno}
              >
                {selectedTab.icon}
              </motion.div>
            </AnimatePresence>
           </div>
     
        </div>
      </div>


      {/* /================================== Partea cu Recomended ==============// */}
      {products ? (
      <div className={styles.swiper}>
        <h1>{t("common:recomended")}</h1>

        <Swiper
          slidesPerView={isTabletOrMobile ? 3.5 : 5}
          spaceBetween={10}
          loop={true}
          freeMode={{ enable: true, minimumVelocity: 0.05 }}
          navigation={isTabletOrMobile ? false : true}
          modules={[FreeMode, Navigation]}
        >
          {products
            ?.map((prod) => (
              <SwiperSlide key={prod.id} className={styles.mySwiper}>
                <Link
                  href={{
                    pathname: "" + prod.id,
                
                  }}
                >
                  <motion.div
                    className={styles.prodCont}
                    variants={scaleUp}
                    whileHover="animate"
                  >
                    <div className={styles.prodImgCont}>
                      <Image
                        src={prod.image[0].downloadURL}
                        layout="responsive"
                        objectFit="contain"
                        width={"100%"}
                        height={"100%"}
                        className={styles.prodImg}
                        alt="Related stainless steel product"
                      />
                    </div>
                    <p className={styles.prodText}>
                      {localisator == "ro" ? prod.nameRo : prod.nameEn}
                    </p>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      ):(
        <div style={{display:"none"}}></div>
      )}
    </>
  );
};

//=======================GET SERVER SIDE PROPS=============
export async function getServerSideProps(context) {
  const { locale } = context;
  // const { query } = context;
  const { params } = context;

  const { prod } = params;

  const docRef = doc(db, "manufacturers/tm_inox/products", prod);
  const docSnap = await getDoc(docRef);

  //
  const productData = docSnap.data();
  const product = JSON.parse(JSON.stringify(productData));

  console.log("SERVERSIDE_PRODUCT: " + product.toString());

  // const getProdSerii = async () => {
  //   if (product) {
  const prodSerii = await db
    .collection("manufacturers/tm_inox/products")
    .doc(prod)
    .collection("serii")
    .orderBy("order", "asc")
    .limit(30)
    .get();

  prodSerii.forEach((doc) => {
    console.log("PROD SERIES ", doc.data());
  });

  const seriiData = prodSerii.docs.map((serie) => ({
    id: serie.id,
    ...serie.data(),
  }));
  // console.log("PROD SERII\n", seriiData);

  const products = await db
    .collection("manufacturers/tm_inox/products")
    .where("nameRo", "!=", product.nameRo)
    .where("manufacturer",'==', product.manufacturer)
    .limit(7)
    .get();


    
  const productsData = products.docs.map((prod) => ({
    id: prod.id,
    ...prod.data(),
    params: { id: prod.id.toString() },
  }));

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=6000, stale-while-revalidate=10000"
  );

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale, ["common", "home"])),
      products: JSON.parse(JSON.stringify(productsData)),
      serii: JSON.parse(JSON.stringify(seriiData)),
    },
  };
}

export default Details;


