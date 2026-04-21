import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAlert } from '../contexts/AlertContext'
import { logout } from '../redux/auth/authServices'
import { useTheme } from '../contexts/ThemeContext'

const navigation = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Contact Us', to: '/support' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const { toggleTheme, theme } = useTheme()
    const { profileImage } = useSelector(state => state.auth.user) || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const dispatch = useDispatch()
    const location = useLocation() // Get current route path

    // function to handle logout event
    const handleLogout = () => {
        dispatch(logout(navigate, showAlert));
    }

    return (
        <Disclosure as="nav" className={`sticky inset-x-0 top-0 z-40 w-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                        <h1>LOGO</h1>
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    location.pathname === item.to
                                                        ? (theme === 'dark'
                                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                                                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg')
                                                        : (theme === 'dark'
                                                            ? 'text-gray-300 border-b-2 border-transparent hover:border-indigo-400 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-300'
                                                            : 'text-gray-800 border-b-2 border-transparent hover:border-blue-400 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 transition-all duration-300'),
                                                    'rounded-md px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105'
                                                )}
                                                aria-current={location.pathname === item.to ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* token */}
                                
                                {/* Theme Switcher */}
                                <button
                                    onClick={toggleTheme}
                                    className={classNames(
                                        'rounded-full p-2 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4',
                                        theme === 'dark'
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-indigo-500 focus:ring-offset-gray-900 shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-white shadow-md'
                                    )}
                                >
                                    <span className="sr-only">Toggle Theme</span>
                                    {theme === 'light' ? (
                                        <MoonIcon className="h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <SunIcon className="h-6 w-6" aria-hidden="true" />
                                    )}
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={profileImage}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={React.Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>

                                            <Menu.Item>
                                                <Link to="/profile" className="block px-4 py-2 text-sm">Profile</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to="/changePassword" className="block px-4 py-2 text-sm">Change Password</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to="/settings" className="block px-4 py-2 text-sm">Settings</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to="" onClick={handleLogout} className="block px-4 py-2 text-sm">Sign out</Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button key={item.name} as="div">
                                    <Link
                                        to={item.to}
                                        className="block rounded-md px-3 py-2 text-base font-medium"
                                        aria-current={location.pathname === item.to ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
