import { db } from "./firebase.js";
import { useEffect, useState } from "react";

const SearchEngine = (props) => {
  const sort = props.sort;
  const type = props.type;
  const name = props.name;
  const selectedIndustries = props.selectedIndustries;

  const trigger = props.trigger;
  console.log(
    "Search Engine props:" + sort + " " + type + " " + name + " " + trigger
  );
  console.log("SE selected industries: \n", selectedIndustries);

  useEffect(() => {
    if (trigger) {
      SEARCH();
    }
  }, [trigger]);

  const SEARCH = async () => {
    //========QUERIES, TYPE==FALSE ========================
    // const queryNew = db
    //   .collectionGroup("products")
    //   .orderBy("lastModifiedTS")
    //   .limit(18);

    // const queryOld = db
    //   .collectionGroup("products")
    //   .orderBy("lastModifiedTS", "desc")
    //   .limit(18);

    // const queryAsc = db.collectionGroup("products").orderBy(name).limit(18);

    // const queryDesc = db
    //   .collectionGroup("products")
    //   .orderBy(name, "desc")
    //   .limit(18);
    // //========================================================

    // //========QUERIES, TYPE==IND ========================
    // const queryIndNew = db
    //   .collectionGroup("products")
    //   .where("tags", "in", props.selectedIndustries)
    //   .orderBy("lastModifiedTS")
    //   .limit(18);

    // const queryIndOld = db
    //   .collectionGroup("products")
    //   .where("tags", "in", props.selectedIndustries)
    //   .orderBy("lastModifiedTS", "desc")
    //   .limit(18);

    // const queryIndAsc = db
    //   .collectionGroup("products")
    //   .where("tags", "in", props.selectedIndustries)
    //   .orderBy(name)
    //   .limit(18);

    // const queryIndDesc = db
    //   .collectionGroup("products")
    //   .where("tags", "in", props.selectedIndustries)
    //   .orderBy(name, "desc")
    //   .limit(18);

    // //========================================================
    // //========QUERIES, TYPE==MAN ============================
    // const queryManNew = db
    //   .collectionGroup("products")
    //   .where("manufacturer", "in", props.selectedManufs)
    //   .orderBy("lastModifiedTS")
    //   .limit(18);

    // const queryManOld = db
    //   .collectionGroup("products")
    //   .where("manufacturer", "in", props.selectedManufs)
    //   .orderBy("lastModifiedTS", "desc")
    //   .limit(18);

    // const queryManAsc = db
    //   .collectionGroup("products")
    //   .where("manufacturer", "in", props.selectedManufs)
    //   .orderBy(name)
    //   .limit(18);

    // const queryManDesc = db
    //   .collectionGroup("products")
    //   .where("manufacturer", "in", props.selectedManufs)
    //   .orderBy(name, "desc")
    //   .limit(18);
    // //========================================================

    // //========QUERIES, TYPE==CTG ============================
    // const queryCtgNew = db
    //   .collectionGroup("products")
    //   .where(
    //     name == "nameRo" ? "categoriesRo" : "categoriesEn",
    //     "in",
    //     props.selectedCTGS
    //   )
    //   .orderBy("lastModifiedTS")
    //   .limit(18);

    // const queryCtgOld = db
    //   .collectionGroup("products")
    //   .where(
    //     name == "nameRo" ? "categoriesRo" : "categoriesEn",
    //     "in",
    //     props.selectedCTGS
    //   )
    //   .orderBy("lastModifiedTS", "desc")
    //   .limit(18);

    // const queryCtgAsc = db
    //   .collectionGroup("products")
    //   .where(
    //     name == "nameRo" ? "categoriesRo" : "categoriesEn",
    //     "in",
    //     props.selectedCTGS
    //   )
    //   .orderBy(name)
    //   .limit(18);

    // const queryCtgDesc = db
    //   .collectionGroup("products")
    //   .where(
    //     name == "nameRo" ? "categoriesRo" : "categoriesEn",
    //     "in",
    //     props.selectedCTGS
    //   )
    //   .orderBy(name, "desc")
    //   .limit(18);
    //========================================================

    let query = db
      .collectionGroup("products")
      .orderBy("lastModifiedTS")
      .limit(18);
    if (!type) {
      if (sort == "new") {
        query = db
          .collectionGroup("products")
          //   .orderBy("asc")
          .limit(18);
      } else if (sort == "old") {
        query = db.collectionGroup("products").orderBy("desc").limit(18);
      } else if (sort == "asc") {
        query = db.collectionGroup("products").orderBy(name).limit(18);
      } else if (sort == "desc") {
        query = db.collectionGroup("products").orderBy(name, "desc").limit(18);
      }
    }

    if (type == "ind") {
      if (sort == "new") {
        query = db
          .collectionGroup("products")
          .where("tags", "array-contains-any", props.selectedIndustries)
          //   .orderBy("lastModifiedTS")
          .limit(18);
      } else if (sort == "old") {
        query = db
          .collectionGroup("products")
          .where("tags", "array-contains-any", props.selectedIndustries)
          //   .orderBy("lastModifiedTS", "desc")
          .limit(18);
      } else if (sort == "asc") {
        query = db
          .collectionGroup("products")
          .where("tags", "array-contains-any", props.selectedIndustries)
          .orderBy(name)
          .limit(18);
      } else if (sort == "desc") {
        query = db
          .collectionGroup("products")
          .where("tags", "array-contains-any", props.selectedIndustries)
          .orderBy(name, "desc")
          .limit(18);
      }
    }

    if (type == "man") {
      if (sort == "new") {
        query = db
          .collectionGroup("products")
          .where("manufacturer", "in", props.selectedManufs)
          //   .orderBy("lastModifiedTS")
          .limit(18);
      } else if (sort == "old") {
        query = db
          .collectionGroup("products")
          .where("manufacturer", "in", props.selectedManufs)
          .orderBy("lastModifiedTS", "desc")
          .limit(18);
      } else if (sort == "asc") {
        query = db
          .collectionGroup("products")
          .where("manufacturer", "in", props.selectedManufs)
          .orderBy(name)
          .limit(18);
      } else if (sort == "desc") {
        query = db
          .collectionGroup("products")
          .where("manufacturer", "in", props.selectedManufs)
          .orderBy(name, "desc")
          .limit(18);
      }
    }

    if (type == "ctg") {
      if (sort == "new") {
        query = db
          .collectionGroup("products")
          .where(
            name == "nameRo" ? "categoriesRo" : "categoriesEn",
            "in",
            props.selectedCTGS
          )
          //   .orderBy("lastModifiedTS")
          .limit(18);
      } else if (sort == "old") {
        query = db
          .collectionGroup("products")
          .where(
            name == "nameRo" ? "categoriesRo" : "categoriesEn",
            "in",
            props.selectedCTGS
          )
          .orderBy("lastModifiedTS", "desc")
          .limit(18);
      } else if (sort == "asc") {
        query = db
          .collectionGroup("products")
          .where(
            name == "nameRo" ? "categoriesRo" : "categoriesEn",
            "in",
            props.selectedCTGS
          )
          .orderBy(name)
          .limit(18);
      } else if (sort == "desc") {
        query = db
          .collectionGroup("products")
          .where(
            name == "nameRo" ? "categoriesRo" : "categoriesEn",
            "in",
            props.selectedCTGS
          )
          .orderBy(name, "desc")
          .limit(18);
      }
    }

    const products = await query.get();

    const productsQueried = products?.docs.map((prod) => ({
      id: prod.id,
      ...prod.data(),
      params: { id: prod.id.toString() },
    }));

    products = JSON.parse(JSON.stringify(productsQueried));

    props.setProducts(products);
  };

  //----------------------------------------------------
  //   const getProductsByCategories = async () => {
  //     setProducts([]);
  //     let name = localisator == "ro" ? "nameRo" : "nameEn";

  //     // console.log("Manufacturers in get prods: ", manuf);
  //     //========================================

  //     console.log("sort by what name: ", name);
  //     console.log("searchbar text: ", search);

  //     const queryAsc = db
  //       .collection("productsRO_EN")
  //       .where(
  //         "manufacturer",
  //         "in",
  //         Array.isArray(manuf) && manuf.length ? manuf : allIndustriesValues
  //       )
  //       .orderBy(name)
  //       .limit(20);

  //     const queryDesc = db
  //       .collection("productsRO_EN")
  //       .where("manufacturer", "in", manuf ? manuf : true)
  //       .orderBy(name, "desc")
  //       .limit(20);

  //     console.log("Sort asc: ", sort);

  //     const products = sort ? await queryAsc.get() : await queryDesc.get();

  //     const productsQueried = products?.docs.map((prod) => ({
  //       id: prod.id,
  //       ...prod.data(),
  //       params: { id: prod.id.toString() },
  //     }));

  //     //aici e sortarea dupa industrie, din firebase query nu se permite, am citit in docuri
  //     const industryFilterSet = new Set(industries);

  //     const filteredProds = productsQueried.filter((prod) =>
  //       prod.tags.some((tag) => industryFilterSet.has(tag))
  //     );

  //     //=============================

  //     products = JSON.parse(JSON.stringify(filteredProds));

  //     console.log("Filtre setate: ", industries);
  //     console.log("Produse filtrate dupa industrie: \n", filteredProds);

  //     setProducts(products);
  //   };
  //   //=====================================================

  //   //=====================================================
  //   const getProductsByIndustry = async () => {
  //     props.setProducts([]);
  //     let name = localisator == "ro" ? "nameRo" : "nameEn";

  //     const queryAsc = db
  //       .collectionGroup("products")
  //       .where("tags", "array-contains-any", industries)
  //       .orderBy(name)
  //       .limit(20);

  //     const products = await queryAsc.get();

  //     const productsQueried = products?.docs.map((prod) => ({
  //       id: prod.id,
  //       ...prod.data(),
  //       params: { id: prod.id.toString() },
  //     }));

  //     products = JSON.parse(JSON.stringify(productsQueried));

  //     props.setProducts(products);
  //   };
  //=====================================================
};

export default SearchEngine;

let allIndustriesValues = [
  "wine",
  "beer",
  "food",
  "essential_oils",
  "chemical_industry",
  "evaporation_drying",
];
