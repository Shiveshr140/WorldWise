// import AppLayout from "./AppLayout";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Logo from "./Logo"
import styles from "./Sidebar.module.css"
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        {/* <p>List of cities</p> */}
        <Outlet />

        <Footer />
    </div>
  )
}

export default Sidebar;