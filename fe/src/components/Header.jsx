import React, { useRef, useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';



const nav__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path:'/services',
    display:'Services'
  },
  {
    path: '/about',
    display: 'AboutUs'
  },
  {
    path: '/contact',
    display: 'ContactUs'
  },
]


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {  
    setMenuOpen(prev=>!prev)
  }

  useEffect(()=> {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);


  const isHome = location.pathname === '/' || location.pathname === '/home';

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <header className='sticky flex h-[80px] 2xl:h-[100px] w-full z-50 px-4'>
      <div className="flex items-center justify-between mx-auto xl:px-[120px] h-[50%] w-full my-auto ">
        {/* logo start*/}
        <div className="logo content-center px-0">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* logo end*/}
        {/* menu desktop start*/}
        <div className="menu flex space-between gap-4 items-center">
          <div className="nagavition">
            <ul className="sub__nav hidden lg:flex flex items-center gap-8" >
              {
                nav__links.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass => {
                        return navClass.isActive ? "" : ""
                      }}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* button start*/}
          <div className="button__group hidden lg:flex gap-4 items-center">
            {/* <div className="md:hidden"><LanguageSwitcher /></div> */}
            <LanguageSwitcher/> 

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center cursor-pointer gap-2"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-[var(--text-color)] font-medium">
                    {user?.name || user?.displayName || user?.username || 'User'}
                  </span>
                  <svg
                    className="w-4 h-4 text-[var(--text-color)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[120%] z-50 bg-white border rounded-md shadow-md w-40 py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Hồ sơ của tôi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="border-[1.5px] rounded-[5px] px-4 py-2 text-center block">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-[1.5px] rounded-[5px] !bg-[var(--text-color)] !text-white px-4 py-2 text-center block"
                >
                  Signup
                </Link>
              </>
            )}

          </div>
          {/* button end */}
        </div>
        {/* menu end */}
        <div className=" lg:hidden flex items-center">
          <LanguageSwitcher />
          <span className='block lg:hidden' onClick={toggleMenu}>
            <i className="ri-menu-line"></i>
          </span>
        </div>
      </div>
      {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={toggleMenu}
          />
          )}    
      {/* mobile menu start */}
      <div 
        ref={menuRef}
        className={`fixed right-0 top-0 w-[25%] h-full bg-[var(--bg-color)] pt-16 mb-0 transition-transform duration-300 z-50
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={toggleMenu}>  

        <ul className="sub__nav flex flex-col items-center gap-8" >
          {
            nav__links.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}                 
                  className={navClass => {
                    return navClass.isActive ? "!font-extrabold" : ""
                  }}
                >
                  {item.display}
                </NavLink>
              </li>
            ))
          }
        </ul>
        {/* button start*/}
        <div className="block lg:hidden button__group flex flex-col gap-5 my-12 items-center ">
          {isAuthenticated ? (
            <>
              <span className="text-sm">
                Xin chào, {user?.name || user?.displayName || user?.username || 'User'}
              </span>

              <button
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('token');
                  navigate('/');
                }}
                className="border-[1.5px] rounded-[5px] px-4 py-2 text-red-600 border-red-600"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border-[1.5px] rounded-[5px] px-4 py-2 text-center block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-[1.5px] rounded-[5px] !bg-[var(--text-color)] !text-white px-4 py-2 text-center block"
              >
                Signup
              </Link>  
            </>
          )}
        </div>

        {/* button end */}
      </div>     

      {/* mobile menu end */}
    </header>

  )
}

export default Header