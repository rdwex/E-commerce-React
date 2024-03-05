import './App.css';
import { Offline } from "react-detect-offline";
import Categories from './Components/Categories/Categories';
import Home from './Components/Home/Home';
import Brand from './Components/Brands/Brand';
import Products from './Components/Products/Products';
import Carts from './Components/Cart/Carts';
import Mainlayout from './Components/MainLayout/Mainlayout';
import Navbr from './Components/Navbar/Navbr';
import Sliders from './Components/Sliders/Sliders';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthLayout from './Components/MainLayout/AuthLayout';
import Signin from './Components/SignIn/Signin';
import SignUp from './Components/SignUp/SignUp';
import Notfound from './Components/Notfound/Notfound';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './ProductDetails/ProductDetails';
import StoreContextProvider from './Components/Context/storeContext';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Verify from './Components/Verify/Verify';
import { ToastContainer } from "react-toastify";
import Address from './Components/address/Address';
import AddOrders from './Components/allorders/AddOrders';
import RestPassword from './Components/restpassword/RestPassword';
import WishList from './Components/WishList/WishList';

function App() {
  let routes = createBrowserRouter([
    {
      path: '/', element: <Mainlayout />, children: [
        { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes > },
        { path: 'home', element: <ProtectedRoutes> <Home /> </ProtectedRoutes > },
        { path: 'products', element: <ProtectedRoutes> <Products /> </ProtectedRoutes > },
        { path: 'categories', element: <ProtectedRoutes> <Categories /> </ProtectedRoutes > },
        { path: 'brand', element: <ProtectedRoutes> <Brand /> </ProtectedRoutes > },
        { path: 'cart', element: <ProtectedRoutes> <Carts /> </ProtectedRoutes > },
        { path: 'product-details/:id', element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes > },
        { path: 'address/:id', element: <ProtectedRoutes> <Address /> </ProtectedRoutes > },
        { path: 'allorders', element: <ProtectedRoutes> <AddOrders /> </ProtectedRoutes > },
        { path: 'wishlist', element: <ProtectedRoutes> <WishList /> </ProtectedRoutes > },
        { path: '*', element: <Notfound /> }

      ]
    },

    {
      path: '/', element: <AuthLayout />, children: [
        { path: 'signup', element: <SignUp /> },
        { path: 'signin', element: <Signin /> },
        { path: 'forgotPassword', element: <ForgotPassword /> },
        { path: 'verify', element: <Verify /> },
        { path: 'restPassword', element: <RestPassword /> },


      ]
    }
  ])

  return (
    <>
      <StoreContextProvider>
        <RouterProvider router={routes} />

      </StoreContextProvider>
      <ToastContainer theme='colored' autoClose='700' />


      <Offline>
        <div className='offline'>
          You Are Offline!!
        </div>
      </Offline>


    </>
  );
}

export default App;
