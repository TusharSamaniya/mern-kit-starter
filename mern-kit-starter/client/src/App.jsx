import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
// import layouts
import Layout from './components/Layout.jsx';
import LayoutUser from './components/LayoutUser.jsx';

// private route 
import PrivateRoute from './utils/PrivateRoute.jsx'; // check the user is logged in or not
import AdminRoute from './utils/AdminRoute.jsx'; // check the admin is logged in or not

// import context api providers
import { AlertProvider } from './contexts/AlertContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

// import utils components
import Alert from './components/Alert.jsx';
import Loader from './components/Loader.jsx';


// static components for the company
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Support from './pages/Support.jsx';


// user based components 
const Login = React.lazy(() => import('./pages/auth/Login.jsx'));
const Dahsboard = React.lazy(() => import('./pages/auth/Dahsboard.jsx'));
const Signup = React.lazy(() => import('./pages/auth/Signup.jsx'));
const Profile = React.lazy(() => import('./pages/auth/Profile.jsx'));
const ChangePassword = React.lazy(() => import('./pages/auth/ChangePassword.jsx'));
const Settings = React.lazy(() => import('./pages/auth/Settings.jsx'));
const ForgotPasswordRequest = React.lazy(() => import('./pages/auth/ForgotPasswordRequest.jsx'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword.jsx'));
const VerifyUser = React.lazy(() => import('./pages/auth/VerifyUser.jsx'));



// import admin components
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout.jsx'));
const AdminSendNotification = React.lazy(() => import('./pages/admin/AdminSendNotification.jsx'));
const AdminGetAllUsers = React.lazy(() => import('./pages/admin/AdminGetAllUsers.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminGetUserById = React.lazy(() => import('./pages/admin/AdminGetUserById.jsx'));
const OTPLogin = React.lazy(() => import('./pages/auth/OTPLogin.jsx'));
const CreateAdmin = React.lazy(() => import('./pages/admin/CreateAdmin.jsx'));
const GetAllMessages = React.lazy(() => import('./pages/admin/GetAllMessages.jsx'));
const GetMessageById = React.lazy(() => import('./pages/admin/GetMessageById.jsx'));

// import 404 page 
import PageNotFound from './pages/PageNotFound.jsx';
import Plans from './pages/Plans.jsx';

function App() {


  return (
    <>
      {/* wrapping app in theme to change theme */}
      <ThemeProvider>
        {/* wrapping app in alert to send on screen notification */}
        <AlertProvider>
          {/* alert component */}
          <Alert />
          <Router>
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* public route */}
                <Route element={<Layout />} >
                  <Route path="/" element={<Home />} />
                  <Route path="/support" element={<Support />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgotPasswordRequest" element={<ForgotPasswordRequest />} />
                  <Route path="/forgotPassword/:token" element={<ForgotPassword />} />
                  <Route path="/verify/:token" element={<VerifyUser />} />
                  <Route path="/otpLogin" element={<OTPLogin />} />
                </Route>
                {/* user protected routes */}
                <Route element={<LayoutUser />} >
                  <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dahsboard />} />}
                  />

                  <Route
                    path="/profile"
                    element={<PrivateRoute element={<Profile />} />}
                  />

                  <Route
                    path="/changePassword"
                    element={<PrivateRoute element={<ChangePassword />} />}
                  />

                  <Route
                    path="/settings"
                    element={<PrivateRoute element={<Settings />} />}
                  />

        

                </Route>

                {/* admin protected routes */}
                <Route element={<AdminLayout />}>
                  <Route path="/adminLogin" element={<AdminLogin />} />
                  <Route path="/createAdmin" element={<CreateAdmin />} />
                  <Route
                    path="/adminDashboard"
                    element={<AdminRoute element={<AdminDashboard />} />}
                  />
                  <Route
                    path="/getUser/:id"
                    element={<AdminRoute element={<AdminGetUserById />} />}
                  />
                  <Route path="/sendNotification" element={<AdminSendNotification />} />
                  <Route
                    path="/getAllUsers"
                    element={<AdminRoute element={<AdminGetAllUsers />} />}
                  />

                  <Route
                    path="/getAllMessages"
                    element={<AdminRoute element={<GetAllMessages />} />}
                  />
                  <Route
                    path="/message/:id"
                    element={<AdminRoute element={<GetMessageById />} />}
                  />



                </Route>

                {/* 404 page */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </Router >
        </AlertProvider >
      </ThemeProvider >
    </>
  )
}

export default App
