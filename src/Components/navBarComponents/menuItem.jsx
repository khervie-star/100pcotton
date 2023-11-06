import * as React from "react";
import { motion } from "framer-motion";
import Link from "../../utility/Link";
import { useRouter } from "next/router";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    visibility: "visible",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    visibility: "hidden",
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MobileMenuItem = ({ i, key, name, link, toggle }) => {
  const router = useRouter();
  const handleClick = (link) => {
    toggle();
    router.push(link);
  };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={
        router.pathname === { link } ? "navItemSelected" : "navToggleListItem"
      }
      onClick={() => {
        handleClick(link);
      }}
      key={key}>
      {name}
    </motion.li>
  );
};
