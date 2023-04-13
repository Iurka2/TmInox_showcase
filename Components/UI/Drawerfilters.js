import Drawer from "react-modern-drawer";
import { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import "react-modern-drawer/dist/index.css";
import styles from "../../styles/product.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import SearchEngine from "../../utils/firebase/queryFunctionality.js";


let CTGS = [];

let selectedIndustries = [];
let selectedCTGS = [];
let selectedManufs = [];


let indSearch = false;
let manufSearch = false;
let ctgSearch = false;

let sortBY = "new";
let type = false;
let name = "nameRo";

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      // products: JSON.parse(JSON.stringify(productsData)),
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
};

const DrawerFilter = (props) => {
  handleSearchType();

  const { locale } = useRouter();
  const { t } = useTranslation();
  let localisator = t(locale);
  localisator=="ro"?name = "nameRo": name="nameEn"

  const [isOpen, setIsOpen] = useState(false);
  const manufacturers = props.manufacturers;

  const [searchTrigger, setSearchTrigger] = useState(0);

  //========================================================
  const [hydrated, setHydrated] = useState(false);
  const isDesktop = useMediaQuery(
    { query: "(min-width: 814px)" },
    hydrated ? undefined : { deviceWidth: 814 }
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //========================================================
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  //================================================================
  function showSelected() {
    console.log("SELECTED manufs:\n", checkedManufs);
  }

  function discardSelected() {
    setCheckedManufs(new Array(manufacturers.length).fill(false));
    setCategories(false);

    showSelected();

    toggleDrawer();
  }
  //=======================INDUSTRIES ====================
  let allIndustries = [
    { indName: "wine", value: "wine" },
    { indName: "beer", value: "beer" },
    { indName: "food", value: "food" },
    { indName: "oil", value: "essential_oils" },
    { indName: "chemical", value: "chemical_industry" },
    { indName: "evapor", value: "evaporation_drying" },
  ];



  const [checkedIndustries, setCheckedInudstries] = useState(
    new Array(allIndustries.length).fill(false)
  );

  const handleOnIndustryChange = (position) => {
    selectedIndustries = [];
    const updatedCheckedIndustries = checkedIndustries.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedInudstries(updatedCheckedIndustries);

    for (let i = 0; i <= updatedCheckedIndustries.length; i++) {
      updatedCheckedIndustries[i]
        ? selectedIndustries.push(allIndustries[i].value)
        : true;
    }

    console.log("selected industries: \n", selectedIndustries);
    selectedIndustries.length == 0 ? (indSearch = false) : (indSearch = true);

    handleIndustry(selectedIndustries);
  };
  //=======================MANUFACTURERS =================
  const [checkedManufs, setCheckedManufs] = useState(
    new Array(manufacturers.length).fill(false)
  );

  const handleOnManufChange = (position) => {
    const updatedCheckedManufs = checkedManufs.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedManufs(updatedCheckedManufs);

    for (let i = 0; i <= updatedCheckedManufs.length; i++) {
      updatedCheckedManufs[i]
        ? selectedManufs.push(props.manufacturers[i].name)
        : true;
    }
    console.log("selected manufs: \n", selectedManufs);
    if (selectedManufs.length == 0) {
      manufSearch = false;
      ctgSearch = false;
    } else {
      manufSearch = true;
    }
    //SET CATEGORIES
    setCategories(updatedCheckedManufs);

    console.log("categories: \n", CTGS);
  };

  //=====================CATEGORIES-MANUFS================================
  function setCategories(manuf) {
    CTGS = [];
    for (let i = 0; i < manuf.length; i++) {
      if (manuf[i] && manufacturers[i].categoriesRo) {
        for (let j = 0; j < manufacturers[i].categoriesRo.length; j++) {
          {
            localisator == "ro"
              ? CTGS.push({ ctgName: manufacturers[i].categoriesRo[j] })
              : CTGS.push({ ctgName: manufacturers[i].categoriesEn[j] });
          }
        }
      }
    }
    //-------------
    setSelectedCategories(new Array(CTGS.length).fill(false));
  }

  const [selectedCategories, setSelectedCategories] = useState(
    new Array(manufacturers.length).fill(false)
  );
  const handleOnCtgChange = (position) => {
    const updatedCtg = selectedCategories.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedCategories(updatedCtg);

    for (let i = 0; i <= updatedCtg.length; i++) {
      updatedCtg[i] ? selectedCTGS.push(CTGS[i].ctgName) : true;
    }
    console.log("selected categories: \n", selectedCTGS);
    selectedCTGS.length == 0 ? (ctgSearch = false) : (ctgSearch = true);
  };

  //=====================================================
  const getProductsBySearch = async () => {
    props.setProducts([]);
    let name = localisator == "ro" ? "nameRo" : "nameEn";

    // console.log("Manufacturers in get prods: ", manuf);
    //========================================

    console.log("sort by what name: ", name);
    console.log("searchbar text: ", search);

    const queryAsc = db
      .collectionGroup("products")
      .where("nameroLower", "array-contains-any", search)
      .orderBy(name)
      .limit(20);

    const queryDesc = db
      .collection("productsRO_EN")
      .where("nameroLower", "array-contains-any", search)
      .orderBy(name, "desc")
      .limit(20);

    const products = sort ? await queryAsc.get() : await queryDesc.get();

    const productsQueried = products?.docs.map((prod) => ({
      id: prod.id,
      ...prod.data(),
      params: { id: prod.id.toString() },
    }));

    products = JSON.parse(JSON.stringify(productsQueried));

    props.setProducts(products);
  };
  ////===============SEARCH FUNCTIONALITY================
  function handleSearchType() {
    type = false;
    if (ctgSearch == true && manufSearch == true) {
      type = "ctg";
    }

    if (manufSearch == true && ctgSearch == false) {
      type = "man";
    }
    //----------------------------------------
    if (indSearch == true) {
      type = "ind";
      // manufSearch = ctgSearch = false
    }

    console.log("Search type: " + type);
  }

  function handleSort(event) {
    sortBY = event.target.value.toString();

    console.log("Sort type: ", sortBY);
  }
  //=====================================================
  let allIndustriesValues = [
    "wine",
    "beer",
    "food",
    "essential_oils",
    "chemical_industry",
    "evaporation_drying",
  ];
  //======================================

  let [sort, setSortBy] = useState(true);
  let [industries, setIndustry] = useState([]);

  let [manuf, setManufacturer] = useState([]);
  let [search, setSearch] = useState(false);

  function handleSortBy(value) {
    setSortBy(value);
  }

  function handleManufacturer(value) {
    setManufacturer(value);
  }

  function handleIndustry(value) {
    setIndustry(value);
  }

  function handleInputSearcher(event) {
    if (event.target.value == "") {
      setSearch(false);
    } else {
      let str = event.target.value.toLowerCase();
      console.log("searchbar array: ", str.split(" "));
      setSearch(str.split(" "));
    }
  }

  function handleTypeOfSearching() {
    toggleDrawer();
    setSearchTrigger((searchTrigger) => searchTrigger + 1)
  }

  return (
    <>
      <SearchEngine
        sort={sortBY}
        type={type}
        name={name}
        selectedIndustries={selectedIndustries}
        selectedCTGS={selectedCTGS}
        selectedManufs={selectedManufs}
        setProducts={props.setProducts}
        trigger={searchTrigger}
      />
      <div className={styles.tagContainer}>
        <div className={styles.basic_flex2} >
          <div  className={styles.filterContainer} onClick={toggleDrawer}>
          <FiFilter className={styles.filterIcon} />
          <p className={styles.filterText}>{t("common:filter")}</p>
          </div> 
          <div>
          <button className={`${styles.button3} hover-underline-animation `}> {t("common:reset")}</button>
          </div>
        </div>

        <div className={styles.basic_flex}>
    
          <input
            className={styles.search}
            type="text"
            placeholder={t("common:search") + "..."}
            onChange={handleInputSearcher}>
            </input>
                <div className={styles.buttonContainer} onClick={props.getProductsByIndustry}>
            <span className={`${styles.button2} hover-underline-animation `}
              onClick={getProductsBySearch}
            >
              {t("common:search")}
            </span>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------ */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="top"
        size={isTabletOrMobile ? "80vh" : "55vh"}
        className={styles.drawer}
      >
        <div className="x" onClick={toggleDrawer}>
          <FiX />
        </div>

        <div className={styles.drawerFilters}>
          <div className={styles.smallfilter}>
            <div className={styles.idustrytag}>
              <h1>{t("common:sort")}</h1>

              {/* <div className={styles.tag}>
                <input
                  type="radio"
                  name="radio"
                  value="new"
                  onChange={handleSort}
                />
                <label className={styles.labelee}>{t("common:New-old")}</label>
              </div>

              <div className={styles.tag}>
                <input
                  type="radio"
                  name="radio"
                  value="old"
                  onChange={handleSort}
                />
                <label className={styles.labelee}>{t("common:Old-new")}</label>
              </div> */}

              <div className={styles.tag}>
                <input
                  type="radio"
                  name="radio"
                  value="asc"
                  onChange={handleSort}
                />
                <label className={styles.labelee}>A-Z</label>
              </div>

              <div className={styles.tag}>
                <input
                  type="radio"
                  name="radio"
                  value="desc"
                  onChange={handleSort}
                />
                <label className={styles.labelee}>Z-A</label>
              </div>
            </div>
            {/* ------------------------- INDUSTRIES ----------------------------------- */}
            <div className={styles.idustrytag}>
              <h1>{t("common:indstrt")}</h1>
              {allIndustries.map(({ indName }, index) => {
                return (
                  <div className={styles.tag}>
                    <input
                      type="checkbox"
                      id={`ind-check-${index}`}
                      name={indName}
                      value={indName}
                      checked={checkedIndustries[index]}
                      onChange={() => {
                        handleOnIndustryChange(index);
                      }}
                    />
                    <label
                      htmlFor={`ind-check-${index}`}
                      className={styles.labelee}
                    >
                      {t(indName)}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ------------------MANUFACTURERS HERE -------------------------------- */}
          <div className={styles.smallfilter}>
            <div className={styles.idustrytag}>
              <h1>{t("common:frunizor")}</h1>

              {manufacturers.map(({ name }, index) => {
                return (
                  <div className={styles.tag}>
                    <input
                      type="checkbox"
                      id={`manuf-check-${index}`}
                      name={name}
                      value={name}
                      checked={checkedManufs[index]}
                      onChange={() => {
                        handleOnManufChange(index);
                      }}
                    />
                    <label
                      htmlFor={`manuf-check-${index}`}
                      className={styles.labelee}
                    >
                      {name}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* ------------------CATEGORIES HERE -------------------------------- */}
            {checkedManufs ? (
              <div className={styles.idustrytag2}>
                <h1>{t("common:categori")}</h1>
                <div className={styles.categorytag}>
                  {CTGS.map(({ ctgName }, index) => {
                    return (
                      <>
                        <div
                          htmlFor={`ctg-check-${index}`}
                          className={styles.tag2}
                        >
                          <input
                            type="checkbox"
                            id={`ctg-check-${index}`}
                            name={ctgName}
                            value={ctgName}
                            checked={selectedCategories[index]}
                            onChange={() => {
                              handleOnCtgChange(index);
                            }}
                          />
                          <label
                            htmlFor={`ctg-check-${index}`}
                            className={styles.labelee}
                          >
                            {ctgName}
                          </label>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            ) : (
              {}
            )}
          </div>
        </div>

        {/* ------------------------FORM BUTTONS HERE ------------------------------- */}
        <div className={styles.buttonsCont}>
          <div className={styles.buttonContainer}>
            <span className={`${styles.button1}`} onClick={discardSelected}>
              {t("common:reset")}
            </span>
          </div>

          <div className={styles.buttonContainer}>
            <span
              className={`${styles.button2} hover-underline-animation `}
              onClick={handleTypeOfSearching}
            >
              {t("common:apply")}
            </span>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerFilter;
