import React, { useState,useEffect } from "react";
import Select from "react-select";
import { db } from "../../utils/firebase/firebase.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

const sortOptions = [
  { value: "asc", label: "A-Z" },
  { value: "desc", label: "Z-A" },
  { value: "new", label: "New" },
  { value: "old", label: "Old" },
  // { value: "vanilla", label: "Vanilla" },
];

let queryParams = [];
let counter = 0;
let counterQuery = 0;
let defaultIndex = undefined;

export default function Filters(props) {
  const { locale } = useRouter();
  const { t } = useTranslation();
  let localisator = t(locale);
  const router = useRouter();

  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  //=================HANDLER FUNCTIONS======================
  function handleManufacturerChange(target) {
    if (counterQuery == 0)
      router.push("/products", undefined, { shallow: false, scroll: true});
    counterQuery += 1;

    setSubcategories([]);
    const manufacturer = target ? target.value : null;
    // const label = target ? target.label : null;

    setSelectedManufacturer(manufacturer);
    // console.log("selected m: ", manufacturer);

    getCategories(manufacturer);

    setManufacturerQuery(manufacturer);
  }

  function handleCategoryChange(target) {
    setSubcategories([]);
    let category = target ? target.value : null;
    const label = target ? target.label : null;

    setSelectedCategory(category);

    getSubcategories(category);

    setCategoryQuery(category);
  }

  function handleSubcategoryChange(target) {
    let subctg = target ? target.value : null;
    const label = target ? target.label : null;

    setSelectedSubcategory(subctg);

    setSubcategoryQuery(subctg);
  }
  function handleSortChange(target) {
    let sort = target ? target.value : null;
    const label = target ? target.label : null;
    console.log("Filter SORT BY: ", label, " ", sort);

    props.handleSortParams(sort);
    handleQueryParams();
  }

  function handleQueryParams() {
    console.log(queryParams);
    props.setQueryParams(queryParams);
  }

  //================GETTER FUNCTIONS======
  const getCategories = async (manufacturer) => {
    setCategories([]);
    if (manufacturer != null) {
      const categories = await db
        .collection("manufacturers")
        .doc(manufacturer)
        .collection("categories")
        .get();

      const ctgData = categories.docs.map((ctg) => ({
        value: ctg.id,
        label: localisator == "ro" ? ctg.data().ctgRo : ctg.data().ctgEn,
      }));

      setCategories(JSON.parse(JSON.stringify(ctgData)));
      // console.log("Filter categories\n", ctgData)
    } else {
    }
  };

  const getSubcategories = async (category) => {
    setSubcategories([]);
    if (category != null) {
      const subcategories = await db
        .collection("manufacturers")
        .doc(selectedManufacturer)
        .collection("categories")
        .doc(category)
        .collection("subcategorii")
        .get();

      const subCtgData = subcategories.docs.map((subctg) => ({
        value: subctg.id,
        label:
          localisator == "ro" ? subctg.data().subCtgRo : subctg.data().subCtgEn,
      }));

      setSubcategories(JSON.parse(JSON.stringify(subCtgData)));
      // console.log("Filter subcategories\n", subCtgData);
    }
  };

  //======SETTER FUNCTIONS================

  function setManufacturerQuery(manufacturer) {
    queryParams[0] = manufacturer;

    handleQueryParams();
  }
  function setCategoryQuery(category) {
    category
      ? (queryParams[0] = category)
      : (queryParams[0] = selectedManufacturer);
    handleQueryParams();
  }
  function setSubcategoryQuery(subcategory) {
    subcategory
      ? (queryParams[0] = subcategory)
      : (queryParams[0] = selectedCategory);
    handleQueryParams();
  }
  //======================================
 
  function checkQueryManufacturer() {
    const { manufacturer } = router.query;
    console.log("MANUFACTURER DIN QUERY", manufacturer);

    if (manufacturer != undefined && counter <= 10) {
      props.manufacturers.forEach((man, index) => {
        if (man.value == manufacturer) {
          // console.log("FOUND QUERY IN LIST");
          // console.log("INDEX: ", index)
          if (counter <= 0) {
            defaultIndex = index;
            console.log("INDEX: ", index);
          }

          counter += 1;
          queryParams[0] = man.value;
          handleQueryParams();
        }
      });
    }
  }
  checkQueryManufacturer();

  const [hydrated, setHydrated] = useState(false);
  const isDesktop = useMediaQuery(
    { query: "(min-width: 814px)" },
    hydrated ? undefined : { deviceWidth: 814 }
  );
  useEffect(() => {
    setHydrated(true);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });


  return (
    <>
      <section className="filter_container">
        {/* ========= A-Z, Z-A=============*/}
        <div className="filter">
          <Select
            placeholder={t("common:sort")}
            defaultValue={sortOptions[3].value}
            onChange={handleSortChange}
            options={sortOptions}
            isClearable={false}
            isSearchable={isTabletOrMobile ? false : true}
          />
        </div>

        {/* ========= MANUFACTURER + CATEGORY + SUBCATEGORY=============*/}
        <div className="filter">
          <Select
            placeholder={t("common:frunizor")}
            options={props.manufacturers}
            defaultValue={
              defaultIndex != undefined
                ? props.manufacturers[defaultIndex]
                : selectedManufacturer
            }
            onChange={handleManufacturerChange}
            isClearable={true}
            isSearchable={isTabletOrMobile ? false : true}

          />
        </div>
        {
          //TO DO:
          // - ADD ANIMATIONS WHEN this section appears
          categories.length != 0 ? (
            <div className="filter">
              <Select
               placeholder={t("common:furnizor_sub")}
                defaultValue={selectedCategory}
                onChange={handleCategoryChange}
                options={categories}
                isClearable={true}
                isSearchable={isTabletOrMobile ? false : true}

              />
            </div>
          ) : (
            true
          )
        }

        {subcategories.length != 0 ? (
          <div className="filter">
            <Select
             placeholder={t("common:furnizor_sub_sub")}
              defaultValue={selectedSubcategory}
              onChange={handleSubcategoryChange}
              options={subcategories}
              isClearable={true}
              isSearchable={isTabletOrMobile ? false : true}

            />
          </div>
        ) : (
          true
        )}
        {/* ========= =============*/}

        {/*  
        <div className="filter">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            isClearable={isClearable}
          />
        </div> */}
      </section>
    </>
  );
}
