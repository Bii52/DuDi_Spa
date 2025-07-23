import React, { useRef } from 'react';
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
  const { user, isAuthenticated } = useSelector((state) => state.auth); // đảm bảo slice này tồn tại

  const overlayRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('translate-x-full');
  };

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
          <img src={logo} alt="" />
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
          <div className="button__group hidden md:flex gap-4 items-center">
            <div className="md:hidden"><LanguageSwitcher /></div>

            {isAuthenticated ? (
              <>
                <span className="text-sm">Xin chào, {user?.name || 'User'}</span>
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
          <span className='block lg:hidden' onClick={toggleMenu}>
            <i className="ri-menu-line"></i>
          </span>
        </div>

      </div>
      {/* mobile menu start */}
      <div
        ref={menuRef}
        className="fixed w-[25%] h-full bg-[var(--bg-color)] top-0 right-0 pt-16 mb-0 translate-x-full transition-transform duration-300"
        onClick={toggleMenu}>

        <ul className="sub__nav flex flex-col items-center gap-8" >
          {
            nav__links.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
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
        {/* button start*/}
        <div className="block md:hidden button__group flex flex-col gap-5 my-12 items-center ">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Xin chào, {user?.name || 'User'}</span>
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
              <button className="border-[1.5px] rounded-[5px] px-4 py-2">
                <Link to="/login">Login</Link>
              </button>
              <button className="border-[1.5px] rounded-[5px] !bg-[var(--text-color)] text-white px-4 py-2">
                <Link to="/register">Signup</Link>
              </button>
            </>
          )}
        </div>

        {/* button end */}
      </div>
      {/* </div> */}


      {/* mobile menu end */}
    </header>

  )
}

export default Header