import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import s from "./DrawerMenu.module.css";

const DrawerMenu = ({ isOpen, toggleDrawer, links }) => {
  const handleLinkClick = () => {
    toggleDrawer();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className={s.drawer}
    >
      <div className={s.drawerContent}>
        <h2>Menu</h2>
        <div className={s.linkContainer}>
          {links.map((link, index) => (
            <Link
              key={index}
              className={s.links}
              to={link.to}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
