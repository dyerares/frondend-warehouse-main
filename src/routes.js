import React from 'react';

import {Icon} from '@chakra-ui/react';
import {
    // MdBarChart,
    // MdPerson,
    MdHome,
    MdLock,
    MdOutlineShoppingCart, MdPerson,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
// import Profile from 'views/admin/profile/profile';
// import DataTables from 'views/admin/profile/dataTables';
// import Marketplace from "./views/admin/marketplace";

// Custom Import
import Karyawan from "views/admin/master/karyawan";
import Truck from "views/admin/master/truck";


// Auth Imports
import SignInCentered from 'views/auth/signIn';
// import Marketplace from "views/admin/marketplace";

const routes = [
    {
        name: 'Main Dashboard',
        layout: '/admin',
        path: '/default',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit"/>,
        component: <MainDashboard/>,
    },
    {
        name: 'Master Data',
        layout: '/admin',
        path: '/master',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit"/>,
        children: [
            {
                name: 'Master Karyawan',
                layout: '/admin',
                path: '/master/karyawan',
                component: <Karyawan/>,
            },
            {
                name: 'Master Truck',
                layout: '/admin',
                path: '/master/truck',
                component: <Truck/>
            }
        ],
    },
    {
        name: 'Sign In',
        layout: '/auth',
        path: '/sign-in',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit"/>,
        component: <SignInCentered/>,
        showInSidebar: false,
    },
];

export default routes;
