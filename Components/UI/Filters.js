import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";
import styles from "../../styles/product.module.css";

let allManufs = ["TM Inox", "Ebara", "Manufacturer"];
let allIndustries = [
  "wine",
  "beer",
  "food",
  "essential_oils",
  "chemical_industry",
  "evaporation_drying",
];

const DropMenu = (props) => {
  //press functions===================================================
  function onSelectSort({ key, selectedKeys }) {
    // console.log(`${title} ${key} selected:`);
    // console.log(selectedKeys);
    props.handleSortBy(selectedKeys == "ASC" ? true : false);
  }
  //==========================
  function onManufacturerSelect({ key, selectedKeys }) {
    console.log(`${key} selected:`);
    console.log(selectedKeys);

    props.handleManufacturer(selectedKeys);
  }
  function onManufacturerDeselect({ key, selectedKeys }) {
    console.log(`${key} DE-selected:`);
    console.log(selectedKeys);
    props.handleManufacturer(
      Array.isArray(selectedKeys) && selectedKeys.length
        ? selectedKeys
        : allManufs
    );
  }
  //==========================
  function onIndustrySelect({ key, selectedKeys }) {
    console.log(`${key} selected:`);
    console.log(selectedKeys);

    props.handleIndustry(selectedKeys);
  }
  function onIndustryDeselect({ key, selectedKeys }) {
    console.log(`${key} DE-selected:`);
    console.log(selectedKeys);

    props.handleIndustry(
      Array.isArray(selectedKeys) && selectedKeys.length
        ? selectedKeys
        : allIndustries
    );
  }
  //====================================================================

  //What happens when you open drop down
  function onVisibleChange(visible) {
    // console.log(visible);
  }

  function onDeselect({ key, selectedKeys }) {
    console.log(`${key} DE-selected:`);
    console.log(selectedKeys);
  }

  //Drop down items
  const sortBy = (
    <Menu defaultActiveFirst={true} onSelect={onSelectSort}>
      <MenuItem className={styles.menuItem} key="ASC">
        A-Z
      </MenuItem>
      <Divider />
      <MenuItem className={styles.menuItem} key="DESC">
        Z-A
      </MenuItem>
      <Divider />
      {/* <MenuItem className={styles.menuItem} key="NEW">
        Newest
      </MenuItem>
      <Divider />
      <MenuItem className={styles.menuItem} key="OLD">
        Oldest
      </MenuItem> */}
    </Menu>
  );

  const manufacturers = (
    <Menu
      onSelect={onManufacturerSelect}
      multiple={true}
      onDeselect={onManufacturerDeselect}
      subMenuCloseDelay={1000}
    >
      <MenuItem className={styles.menuItem} key="Ebara">
        Ebara
      </MenuItem>
      <Divider />
      <MenuItem className={styles.menuItem} key="TM Inox">
        TM Inox
      </MenuItem>
      <Divider />
      {/* <MenuItem className={styles.menuItem} key="Mă-ta">
        Mă-ta
      </MenuItem> */}
      <Divider />
      <MenuItem className={styles.menuItem} key="Manufacturer">
        Manufacturer
      </MenuItem>
    </Menu>
  );

  const industries = (
    <Menu onSelect={onIndustrySelect} multiple={true} onDeselect={onIndustryDeselect}>
      <MenuItem className={styles.menuItem} key="wine">
        Wine
      </MenuItem>
      <Divider />
      <MenuItem className={styles.menuItem} key="beer">
        Beer
      </MenuItem>
      <Divider />
      <MenuItem className={styles.menuItem} key="food">
        Food
      </MenuItem>
      <Divider />
      <MenuItem className={styles.menuItem} key="essential_oils">
        Essential oils
      </MenuItem>
      <MenuItem className={styles.menuItem} key="chemical_industry">
        Chemical industry
      </MenuItem>
      <MenuItem className={styles.menuItem} key="evaporation_drying">
        Evaporation and drying
      </MenuItem>
    </Menu>
  );




  let menu;

  // am creat mai multe tipuri de menu mai sus
  // si ca props eu primesc un ”type”
  // in dependenta de type, eu intorc ce tip de menu mie imi trebuie

  switch (props.type) {
    case 1:
      menu = sortBy;

      break;

    case 2:
      menu = manufacturers;
      break;

    case 3:
      menu = industries;
      break;

    default:
      break;
  }

  return (
    <>
      <div className={styles.filter}>
        <Dropdown
          trigger={["click"]}
          overlay={menu}
          animation="slide-up"
          onVisibleChange={onVisibleChange}
        >
          <button className={styles.menuButton2}>
            <span className={styles.buttonSpan2}>{props.title}</span>
            <FiChevronDown className={styles.iconStyle} />
          </button>
        </Dropdown>
      </div>
    </>
  );
};

export default DropMenu;
