import {Portal, Box, useDisclosure} from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import {SidebarContext} from 'contexts/SidebarContext';
import React, {useState, useEffect, useCallback} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import routes from 'routes.js';

// Custom Chakra theme
export default function Dashboard(props) {
    const {...rest} = props;
    // states and functions
    const [fixed] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [activeRoute, setActiveRoute] = useState('Default Brand Text');
    const [activeSubRoute, setActiveSubRoute] = useState('');
    const [activeNavbar, setActiveNavbar] = useState(false);
    const [activeNavbarText, setActiveNavbarText] = useState('');

    // Get current location (URL path)
    const location = useLocation();

    // Callback versions of functions to prevent re-creation on each render
    const getActiveRoute = useCallback((routes) => {
        let activeRoute = 'Default Brand Text';
        // console.log(routes);
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = getActiveRoute(routes[i].items);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else if (routes[i].category) {
                let categoryActiveRoute = getActiveRoute(routes[i].items);
                if (categoryActiveRoute !== activeRoute) {
                    return categoryActiveRoute;
                }
            } else {
                if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    }, [location.pathname]);  // Depend on location.pathname

    const getActiveSubRoute = useCallback((routes) => {
        let activeSubRoute = '';
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse || routes[i].category) {
                let collapseActiveSubRoute = getActiveSubRoute(routes[i].items);
                if (collapseActiveSubRoute !== activeSubRoute) {
                    return collapseActiveSubRoute;
                }
            } else if (routes[i].children) {
                const foundRoute = routes[i].children.find((child) => location.pathname.indexOf(child.layout + child.path) !== -1);
                if (foundRoute) {
                    return foundRoute.name;
                }
            } else {
                if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].name;
                }
            }
        }
        return activeSubRoute;
    }, [location.pathname]);

    const getActiveNavbar = useCallback((routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveNavbar = getActiveNavbar(routes[i].items);
                if (collapseActiveNavbar !== activeNavbar) {
                    return collapseActiveNavbar;
                }
            } else if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbar(routes[i].items);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            } else {
                if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].secondary;
                }
            }
        }
        return activeNavbar;
    }, [location.pathname]);  // Depend on location.pathname

    const getActiveNavbarText = useCallback((routes) => {
        let activeNavbarText = '';
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveNavbarText = getActiveNavbarText(routes[i].items);
                if (collapseActiveNavbarText !== activeNavbarText) {
                    return collapseActiveNavbarText;
                }
            } else if (routes[i].category) {
                let categoryActiveNavbarText = getActiveNavbarText(routes[i].items);
                if (categoryActiveNavbarText !== activeNavbarText) {
                    return categoryActiveNavbarText;
                }
            } else {
                if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].messageNavbar;
                }
            }
        }
        return activeNavbarText;
    }, [location.pathname]);  // Depend on location.pathname

    // Update states based on the current route when location (URL path) changes
    useEffect(() => {
        setActiveRoute(getActiveRoute(routes));
        setActiveSubRoute(getActiveSubRoute(routes));
        setActiveNavbar(getActiveNavbar(routes));
        setActiveNavbarText(getActiveNavbarText(routes));
    }, [location.pathname, getActiveRoute, getActiveSubRoute, getActiveNavbar, getActiveNavbarText]);  // Depend on location.pathname and the callback functions

    const getRoute = () => {
        return location.pathname !== '/admin/full-screen-maps';
    };

    const getRoutes = (routes) => {
        return routes.map((route, key) => {
            if (route.layout === '/admin') {
                return (
                    <Route path={route.path} element={route.component} key={key}>
                        {route.children && route.children.map((child, childKey) => (
                            <Route path={child.path} element={child.component} key={childKey}/>
                        ))}
                    </Route>
                );
            }
            if (route.collapse) {
                return getRoutes(route.items);
            } else {
                return null;
            }
        });
    };

    document.documentElement.dir = 'ltr';
    const {onOpen} = useDisclosure();

    return (
        <Box>
            <Box>
                <SidebarContext.Provider
                    value={{
                        toggleSidebar,
                        setToggleSidebar,
                    }}
                >
                    <Sidebar routes={routes} display="none" {...rest} />
                    <Box
                        float="right"
                        minHeight="100vh"
                        height="100%"
                        overflow="auto"
                        position="relative"
                        maxHeight="100%"
                        w={{base: '100%', xl: 'calc( 100% - 290px )'}}
                        maxWidth={{base: '100%', xl: 'calc( 100% - 290px )'}}
                        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                        transitionDuration=".2s, .2s, .35s"
                        transitionProperty="top, bottom, width"
                        transitionTimingFunction="linear, linear, ease"
                    >
                        <Portal>
                            <Box>
                                <Navbar
                                    onOpen={onOpen}
                                    logoText={'Horizon UI Dashboard PRO'}
                                    brandText={activeRoute}
                                    subBrandText={activeSubRoute}
                                    secondary={activeNavbar}
                                    message={activeNavbarText}
                                    fixed={fixed}
                                    {...rest}
                                />
                            </Box>
                        </Portal>

                        {getRoute() ? (
                            <Box
                                mx="auto"
                                p={{base: '20px', md: '30px'}}
                                pe="20px"
                                minH="100vh"
                                pt="50px"
                            >
                                <Routes>
                                    {getRoutes(routes)}
                                    <Route
                                        path="/"
                                        element={<Navigate to="/admin/default" replace/>}
                                    />
                                </Routes>
                            </Box>
                        ) : null}
                        <Box>
                            <Footer/>
                        </Box>
                    </Box>
                </SidebarContext.Provider>
            </Box>
        </Box>
    );
}
