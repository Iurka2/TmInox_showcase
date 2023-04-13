import styles from "../../styles/product.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { db } from "../../utils/firebase/firebase.js";
// import { user } from "../../utils/firebase/firebase.js";
import { useRouter } from "next/router";
import { useState } from "react";
import mainImg from "../../public/Photos/topImages/bigImage1.jpg";
import mainImgmobile from "../../public/Photos/topImages/bigImage1mobile.jpg";
import "react-modern-drawer/dist/index.css";
import Head from "next/head";
// import DrawerFilter from "../../Components/UI/Drawerfilters";
import TopPart from "../../Components/toppart";
import Filters from "../../Components/UI/NewFilters";
import { FiCheck } from "react-icons/fi";
const _LIMIT = 6;
let LAST_PRODUCT = null;

export const getServerSideProps = async (context) => {
  const products = await db
    .collection("manufacturers/tm_inox/products")
    .orderBy("tags", "desc")
    .orderBy("lastModifiedTs", "desc")
    .limit(_LIMIT)
    .get();

  const productsData = products.docs.map((prod) => ({
    id: prod.id,
    ...prod.data(),
    params: { id: prod.id.toString() },
  }));

  const manufs = await db.collection("manufacturers").orderBy("index").get();

  const manufData = manufs.docs.map((man) => ({
    value: man.id,
    label: man.data().name,

    // params: { value: man.id.toString() },
  }));

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=6000, stale-while-revalidate=10000"
  );

  return {
    props: {
      products: JSON.parse(JSON.stringify(productsData)),
      manufacturers: JSON.parse(JSON.stringify(manufData)),
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
    },
    
  };
};

const Products = (props) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  let localisator = t(locale);
  console.log("Translation locale: ", localisator);

  //==========================================

  //==========================================

  const [products, setProducts] = useState(props.products);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [productsEnd, setProductsEnd] = useState(false);

  const [queryParams, setQueryParams] = useState([]);
  const [sortParam, setSortParam] = useState(false);
  // queryParams[3] = "not null"
  //=====================GET PRODUCTS FUNCS===============
  const getQueryChangeProducts = async () => {
    queryParams[-1] = "not null";
    // console.log("INDEX queryParams ", queryParams);
    let query;
    if (
      (queryParams[0] || queryParams[1]) &&
      (sortParam == "new" || !sortParam)
    ) {
      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs", "desc")
        .limit(_LIMIT);
    } else if ((queryParams[0] || queryParams[1]) && sortParam == "old") {
      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs")
        .limit(_LIMIT);
    } else if ((queryParams[0] || queryParams[1]) && sortParam == "asc") {
      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn")
        .limit(_LIMIT);
    } else if ((queryParams[0] || queryParams[1]) && sortParam == "desc") {
      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn", "desc")
        .limit(_LIMIT);
    } else if (sortParam == "new") {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs", "desc")
        .limit(_LIMIT);
    } else if (sortParam == "old") {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs")
        .limit(_LIMIT);
    } else if (sortParam == "asc") {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn")
        .limit(_LIMIT);
    } else if (sortParam == "desc") {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn", "desc")
        .limit(_LIMIT);
    } else {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs", "desc")
        .limit(_LIMIT);
    }

    const newProducts = await query.get();

    const productsData = newProducts.docs.map((prod) => ({
      id: prod.id,
      ...prod.data(),
      params: { id: prod.id.toString() },
    }));

    LAST_PRODUCT = productsData[productsData.length - 1];

    setProducts(JSON.parse(JSON.stringify(productsData)));
    setSortedProducts(JSON.parse(JSON.stringify(productsData)));
    // sortProducts(products)
  };

  const getNewProducts = async () => {
    const last = products[products.length - 1];
    // const last = LAST_PRODUCT ? LAST_PRODUCT : products[products.length - 1];

    const cursor = last.lastModifiedTs;
    console.log("INDEX queryParams ", queryParams);
    console.log("LAST = ", last.nameRo);
    let query;
    if (
      (queryParams[0] || queryParams[1]) &&
      (sortParam == "new" || !sortParam)
    ) {
      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs", "desc")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if ((queryParams[0] || queryParams[1]) && sortParam == "old") {
      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if ((queryParams[0] || queryParams[1]) && sortParam == "asc") {
      cursor = localisator == "ro" ? last.nameRo : last.nameEn;

      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if ((queryParams[0] || queryParams[1]) && sortParam == "desc") {
      cursor = localisator == "ro" ? last.nameRo : last.nameEn;

      query = db
        .collection("manufacturers/tm_inox/products")
        .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn", "desc")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if (sortParam == "new") {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs", "desc")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if (sortParam == "old") {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if (sortParam == "asc") {
      cursor = localisator == "ro" ? last.nameRo : last.nameEn;
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else if (sortParam == "desc") {
      cursor = localisator == "ro" ? last.nameRo : last.nameEn;
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy(localisator == "ro" ? "nameRo" : "nameEn", "desc")
        .startAfter(cursor)
        .limit(_LIMIT);
    } else {
      query = db
        .collection("manufacturers/tm_inox/products")
        // .where("prodIdentifiers", "array-contains-any", queryParams)
        .orderBy("lastModifiedTs", "desc")
        .startAfter(cursor)
        .limit(_LIMIT);
    }

    const newProducts = await query.get();

    const productsData = newProducts.docs.map((prod) => ({
      id: prod.id,
      ...prod.data(),
      params: { id: prod.id.toString() },
    }));

    LAST_PRODUCT = productsData[productsData.length - 1];

    setProducts(products.concat(JSON.parse(JSON.stringify(productsData))));
    // setSortedProducts(
    //   products.concat(JSON.parse(JSON.stringify(productsData)))
    // );

    console.log("new prods len ", productsData.length);

    if (productsData.length < _LIMIT) {
      setProductsEnd(true);
    }
    // sortProducts(sortParam, sortedProducts);
  };

  //============HANDLER FUNCTIONS==============
  function handleQueryParamsChange(params) {
    // queryParams = params;
    setQueryParams(params);
    getQueryChangeProducts();

    setProductsEnd(false);
  }

  function handleSortParams(param) {
    sortParam = param;
    setSortParam(param);
    sortProducts(param, products);
  }

  //=======SORT PRODUCTS FUNCTIONS==============
  function sortProducts(param, array) {
    switch (param) {
      case "asc":
        {
          array.sort(function (a, b) {
            a =
              localisator == "ro"
                ? a.nameRo.toLowerCase()
                : a.nameEn.toLowerCase();
            b =
              localisator == "ro"
                ? b.nameRo.toLowerCase()
                : b.nameEn.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
          });
          array.forEach((prod) => {
            console.log(localisator == "ro" ? prod.nameRo : prod.nameEn);
          });
        }
        break;

      case "desc":
        {
          array.sort(function (a, b) {
            a =
              localisator == "ro"
                ? a.nameRo.toLowerCase()
                : a.nameEn.toLowerCase();
            b =
              localisator == "ro"
                ? b.nameRo.toLowerCase()
                : b.nameEn.toLowerCase();
            return a < b ? 1 : a > b ? -1 : 0;
          });
          array.forEach((prod) => {
            console.log(localisator == "ro" ? prod.nameRo : prod.nameEn);
          });
        }
        break;

      case "new":
        {
          array.sort(function (a, b) {
            a = a.lastModifiedTs;
            b = b.lastModifiedTs;
            return a < b ? 1 : a > b ? -1 : 0;
          });
          array.forEach((prod) => {
            console.log(localisator == "ro" ? prod.nameRo : prod.nameEn);
          });
        }
        break;

      case "old":
        {
          array.sort(function (a, b) {
            a = a.lastModifiedTs;
            b = b.lastModifiedTs;
            return a < b ? -1 : a > b ? 1 : 0;
          });
          array.forEach((prod) => {
            console.log(localisator == "ro" ? prod.nameRo : prod.nameEn);
          });
        }
        break;

      default: {
      }
    }

    setProducts(array);
  }

  return (
    <>
      {/* //===========CREATE COMPONENT + PRODUCT SHOWING ================================================*/}
      <Head>
        <title>TM INOX | {t("common:1_heder")} </title>
        <meta
          name="description"
          content="Gama largă de produse din Inox TM INOX,EBARA,INOXPA rezervoare, capace și funduri"
        />
        <meta property="og:title" content={t("common:1_heder")} key="ogtitle" />
        <meta
          property="og:description"
          content="Gama largă de produse din Inox TM INOX,EBARA,INOXPA rezervoare, capace și funduri"
          key="ogdesc"
        />
      </Head>
      <TopPart
        img={mainImg}
        imgmobile={mainImgmobile}
        text={t("common:1_heder")}
        alt="Abstract stainless steel "
      />

      {/* //======================FILTERS============= */}
      
<div className={styles.container_input}>
  <input type="text" placeholder={t("common:search")} name={t("common:search")} className={styles.input} />
    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
    </svg>
</div>

      <Filters
        manufacturers={props.manufacturers}
        setQueryParams={handleQueryParamsChange}
        handleSortParams={handleSortParams}
      />

      {/* //======================PRODUCTS SHOWING HERE============= */}
      {products.length > 0 ? (
      <div className={styles.prodGrid} id="#products">
        {products.map((product) => (
         <Link
         href={"products/" + product.id}
         key={product.id}
       >
         <a className={styles.prodCont}>
           <motion.div
             key={product.id}
             variants={scaleUp}
             whileHover="animate"
           >
             <div className={styles.prodImgCont}>
               <Image
                 src={product.image[0]?.downloadURL}
                 alt="Stainless steel product"
                 layout="responsive"
                 objectFit="contain"
                 width={"100%"}
                 height={"100%"}
                 className={styles.prodImg}
               />
             </div>
             <p className={styles.prodText}>
               {localisator == "ro" ? product.nameRo : product.nameEn}
             </p>
           </motion.div>
           {product.tags?.includes("LICHIDARE STOC") ? (
               <motion.div
               className={styles.lichidare} // set the style of the text here
               >
                Lichidare stoc
               </motion.div>
             ) : null}
         </a>
       </Link>
       
        ))}
        {/* //=====================prod */}
        <br />

    
        <></>
      </div>
      ):(
      <div className={styles.noFilter}>
        <h1>
        {t("common:no_prod")}
        </h1>
        <button onClick={handleQueryParamsChange} className={`${styles.button3} hover-underline-animation2 `} >
        {t("common:reset")}
        </button>
        </div>
      )}
      <div className={styles.loadmore}>
          {productsEnd == false ? (
          <div >
            <button  onClick={getNewProducts} className={styles.loadmore_button}>
            {t("common:show_moreee")}
            </button>
          </div>
        ) : (
          <div className={styles.loadmore_done} >
          <FiCheck  className={styles.loadmore_icon}  />
          <p  className={styles.loadmore_txt} >
          {t("common:end")}
          
          </p>
         
        </div>
        )}
        </div>
    </>
  );
};

//=============================Animations================//
const scaleUp = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 0.97,

    transition: {
      type: "spring",
    },
  },
};

const fadeEffect = {
  hidden: {
    y: 50,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 50,
      type: "spring",
      stiffness: 200,
    },
  },
};

export default Products;
