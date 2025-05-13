import React from "react";
import "./SubMenu.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const subMenuVariants = {
  initial: { opacity: 0, scaleY: 0, originY: 0 },
  animate: { opacity: 1, scaleY: 1, originY: 0 },
  transition: { duration: 0.2, ease: "easeInOut" },
  exit: {
    opacity: 0,
    scaleY: 0,
    originY: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
const menuItemVariants = {

};
function SubMenu({ item, handleClick }) {
  return (
    <motion.ul
      className="subMenu"
      variants={subMenuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {item.submenu.map((subItem, index) => (
        <motion.li
          key={subItem.id.toString()}
          className="subMenu__item"
          variants={menuItemVariants}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 + index / 10,
          }}
          onClick={handleClick}
        >
          <NavLink to={subItem.href} className="subMenu__link">
            {subItem.name}
          </NavLink>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default SubMenu;
