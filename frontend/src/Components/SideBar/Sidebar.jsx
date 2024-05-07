import React from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import Authenticate from "../../Store/Authenticate";
import Toaster from "../../Utils/Constants/Toaster";
import LocalStore from "../../Store/LocalStore";
import logo from "../../../public/assets/images/logos/dark-logo.svg";

export default function Sidebar() {
  const location = useLocation();
  const userHome = location.pathname === "/main/user";
  const adminHome = location.pathname === "/main/admin";

  const navigate = useNavigate();

  const isAdmin = () => {
    const tokenData = LocalStore.getToken();
    return tokenData && tokenData.role === "admin";
  };
  if (userHome) return <Navigate to={"/main/user/products"} />;
  if (adminHome) return <Navigate to={"/main/user/employee"} />;

  return (
    <aside className="left-sidebar shadow-sm">
      {/* Sidebar scroll*/}
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <NavLink to={"/main"} className="text-nowrap logo-img">
            <img src={logo} alt="logo" width={180} />
          </NavLink>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8" />
          </div>
        </div>
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav scroll-sidebar" data-simplebar>
          <ul id="sidebarnav" className="h-100 my-0 overflow-hidden">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4" />
              <span className="hide-menu">Home</span>
            </li>
            {isAdmin() ? (
              <>
                <li className="sidebar-item">
                  <NavLink
                    to={"/main/admin/employee"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-user" />
                    </span>
                    <span className="hide-menu">Employee Management</span>
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink
                    to={"/main/admin/delivery"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg>
                    </span>
                    <span className="hide-menu">Delievery Management</span>
                  </NavLink>
                </li>

                <li className="sidebar-item">
                  <NavLink
                    to={"/stocks"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-building-warehouse" />
                    </span>
                    <span className="hide-menu">Stock Management</span>
                  </NavLink>
                </li>

                <li className="sidebar-item">
                  <NavLink
                    to={"/pay"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
  <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
</svg>
                    </span>
                    <span className="hide-menu">Payment Management</span>
                  </NavLink>
                </li>

                <li className="sidebar-item">
                  <NavLink
                    to={"/flist"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>
                    </span>
                    <span className="hide-menu">Cus.affair Management</span>
                  </NavLink>
                </li>

                <li className="sidebar-item">
                  <NavLink
                    to={"/main/admin/Manager"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                      </svg>
                    </span>
                    <span className="hide-menu">Repair Managemenet</span>
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink
                    to={"/main/admin/technician"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                      </svg>
                    </span>
                    <span className="hide-menu">Technician Dashboard</span>
                  </NavLink>
                </li>

                <li className="sidebar-item">
                  <NavLink
                    to={"/list"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-building-warehouse" />
                    </span>
                    <span className="hide-menu">Leaves Management</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="sidebar-item">
                  <NavLink
                    to={"/main/user/products"}
                    className="sidebar-link"
                    aria-expanded="false"
                    end={true}
                  >
                    <span>
                      <i className="ti ti-layout-dashboard" />
                    </span>
                    <span className="hide-menu">Products</span>
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink
                    to={"/main/user/notification"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-bell" />
                    </span>
                    <span className="hide-menu">Notifications</span>
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink
                    to={"/main/user/repair/form"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                      </svg>
                    </span>
                    <span className="hide-menu">Repairing</span>
                  </NavLink>
                </li>


              </>
            )}
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4" />
              <span className="hide-menu">AUTH</span>
            </li>
            <li className="sidebar-item">
              <button
                type="button"
                onClick={() => {
                  Toaster.justToast("info", "   Logging You Out ......", () => {
                    Authenticate.logoutUser();
                    navigate("/login");
                  });
                }}
                className="sidebar-link bg-transparent border-0"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-login" />
                </span>
                <span className="hide-menu">Logout</span>
              </button>

              <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4" />
              <span className="hide-menu">Notifications</span>
            </li>

              <li className="sidebar-item">
                  <NavLink
                    to={"/cnoti"}
                    className="sidebar-link"
                    aria-expanded="false"
                  >
                    <span>
                      
                    </span>
                    <span className="hide-menu">Leave info</span>
                  </NavLink>
                </li>
            
            
            </li>
          </ul>
        </nav>
        {/* End Sidebar navigation */}
      </div>
    </aside>
  );
}
