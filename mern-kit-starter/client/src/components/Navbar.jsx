import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authServices';
import logo from '../assets/logo.png'
import { useAlert } from '../contexts/AlertContext';
import { useTheme } from '../contexts/ThemeContext';
// array of objects of navigations elements
const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Plans', to: '/plans' },
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Support', to: '/support' },
];


const Navbar = () => {
  const { theme } = useTheme();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout(navigate, showAlert))
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className={`sticky inset-x-0 top-0 z-40 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>

      <nav aria-label="Global" className="flex items-center justify-between lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
          <span className="text-2xl text-white">Logo</span>

          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? <Link
            to="/login"
            onClick={handleLogout}
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
          >
            Log Out
          </Link> : <Link
            to="/login"
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
          >
            Log in
          </Link>}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40" />
        <DialogPanel className={`fixed inset-y-0 right-0 z-40 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl text-white">Logo</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated ? <Link
                  to="/login"
                  onClick={handleLogout}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                >
                  Log Out
                </Link> : <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                >
                  Log in
                </Link>}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

  )
}

export default Navbar