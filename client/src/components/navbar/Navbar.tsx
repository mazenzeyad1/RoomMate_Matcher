import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../utils";
import { signOut } from "../../slices/AuthSlice";
import profile from "../../assets/profile.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = !!useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutUser = () => {
    dispatch(signOut());
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href={Routes.LISTINGS}
                  className={`${
                    isActive(Routes.LISTINGS)
                      ? "text-gray-500"
                      : "text-white hover:text-gray-300"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Listings
                </a>
                {auth && (
                  <>
                    <a
                      href={Routes.MY_LISTINGS}
                      className={`${
                        isActive(Routes.MY_LISTINGS)
                          ? "text-gray-500"
                          : "text-white hover:text-gray-300"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      My Listings
                    </a>
                    <a
                      href={Routes.MY_APPLICATIONS}
                      className={`${
                        isActive(Routes.MY_APPLICATIONS)
                          ? "text-gray-500"
                          : "text-white hover:text-gray-300"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      My Applications
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 space-x-4 flex items-center md:ml-6">
              {auth ? (
                <>
                  <img
                    width="32"
                    className={`cursor-pointer object-contain ${isActive(Routes.MY_PROFILE) ? "fill-gray-500" : ""}`}
                    onClick={() => navigate(Routes.MY_PROFILE)}
                    src={profile}
                  />
                  <a
                    href={Routes.LISTINGS}
                    onClick={logoutUser}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={Routes.LOGIN}
                    className={`${
                      isActive(Routes.LOGIN)
                        ? "text-gray-500"
                        : "text-white hover:text-gray-300"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Login
                  </a>
                  <a
                    href={Routes.SIGN_UP}
                    className={`${
                      isActive(Routes.SIGN_UP)
                        ? "text-gray-500"
                        : "text-white hover:text-gray-300"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className={isOpen ? "hidden h-6 w-6" : "block h-6 w-6"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={isOpen ? "block h-6 w-6" : "hidden h-6 w-6"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={isOpen ? "block md:hidden" : "hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href={Routes.LISTINGS}
            className={`${
              isActive(Routes.LISTINGS)
                ? "text-gray-500"
                : "text-white hover:text-gray-300"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Listings
          </a>
          <a
            href={Routes.MY_APPLICATIONS}
            className={`${
              isActive(Routes.MY_APPLICATIONS)
                ? "text-gray-500"
                : "text-white hover:text-gray-300"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            My Applications
          </a>
          {auth ? (
            <>
              <a
                href={Routes.MY_LISTINGS}
                className={`${
                  isActive(Routes.MY_LISTINGS)
                    ? "text-gray-500"
                    : "text-white hover:text-gray-300"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                My Listings
              </a>
              <a
                onClick={logoutUser}
                href={Routes.LISTINGS}
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </a>
              <a
                onClick={logoutUser}
                href={Routes.LISTINGS}
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href={Routes.LOGIN}
                className={`${
                  isActive(Routes.LOGIN)
                    ? "text-gray-500"
                    : "text-white hover:text-gray-300"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Login
              </a>
              <a
                href={Routes.SIGN_UP}
                className={`${
                  isActive(Routes.SIGN_UP)
                    ? "text-gray-500"
                    : "text-white hover:text-gray-300"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
