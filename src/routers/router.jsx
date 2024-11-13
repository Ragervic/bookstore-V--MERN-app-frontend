import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import Home from '../pages/home/Home.jsx';
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Cart from "../pages/user/Cart.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import SingleBook from "../pages/book/SingleBook.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import OrderPage from "../pages/book/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/index',
                element: <div>Index page</div>,
            },
            {
                path: '/orders',
                element: <PrivateRoute><OrderPage /></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout /></PrivateRoute>,
            },
            {
                path: '/books/:id',
                element: <SingleBook />
            }

        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />
    },
    {
        path: '/dashboard',
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddBook /></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks /></AdminRoute>
            }

        ]
    }
]);

export default router;