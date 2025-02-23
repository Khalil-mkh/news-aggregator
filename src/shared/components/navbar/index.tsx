import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSearchStore } from "../../store/searchStore";
import debounce from "lodash/debounce";
import { usePreferencesModalStore } from "../../store/preferencesModalStore";

type Props = {
  showUpdatePreferences: boolean;
};

const Navbar: FC<Props> = ({ showUpdatePreferences }) => {
  const { searchValue, setSearchValue } = useSearchStore();
  const { setOpen } = usePreferencesModalStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const trackSearch = debounce(() => {
      setSearchValue(searchValue);
    }, 500);
    trackSearch();

    return () => trackSearch.cancel();
  }, [searchValue, setSearchValue]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-tarawera-950 fixed w-full z-20 top-0 border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src="/src/assets/logo.svg"
            className="h-8"
            alt="Innoscripta Logo"
          />
        </NavLink>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0">
            <li>
              <NavLink
                to="/home"
                className={`block py-2 px-3 md:p-0 ${
                  location.pathname === "/home"
                    ? "text-tarawera-300 font-bold"
                    : "text-white"
                }`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/for-you"
                className={`block py-2 px-3 md:p-0 ${
                  location.pathname === "/for-you"
                    ? "text-tarawera-300 font-bold"
                    : "text-white"
                }`}
              >
                For You
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center md:order-2">
          {showUpdatePreferences && (
            <button
              className="bg-tarawera-300 px-4 mx-4 font-semibold rounded-lg"
              onClick={() => setOpen(true)}
            >
              Update preferences
            </button>
          )}

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-tarawera-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-tarawera-900 border border-tarawera-300 rounded-lg bg-gray-50"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMenuOpen && (
        <div className="p-4 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-tarawera-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-2 ps-10 text-sm text-tarawera-900 border border-tarawera-300 rounded-lg bg-gray-50"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;