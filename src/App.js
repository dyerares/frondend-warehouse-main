import './assets/css/App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import {ChakraProvider} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import {useState} from 'react';
import routes from './routes'; // Pastikan untuk mengimpor rute

export default function Main() {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);

    // Check if the user is authenticated by checking for token in localStorage
    const isAuthenticated = localStorage.getItem('token') !== null && localStorage.getItem('user') !== null;

    return (
        <ChakraProvider theme={currentTheme}>
            <Routes>
                {/* Route untuk layout autentikasi */}
                <Route path="auth/*" element={
                    isAuthenticated ? <Navigate to="/admin"/> :
                        <AuthLayout/>}/>

                {/* Route untuk layout admin, hanya bisa diakses jika sudah login */}
                <Route
                    path="admin/*"
                    element={
                        isAuthenticated ? (
                            <AdminLayout
                                theme={currentTheme}
                                setTheme={setCurrentTheme}
                                routes={routes} // Pass routes as a prop
                            />
                        ) : (
                            <Navigate to="/auth"/>
                        )
                    }
                />

                {/* Route default yang akan redirect ke login jika belum login */}
                <Route path="/" element={<Navigate to="auth"/>}/>
            </Routes>
        </ChakraProvider>
    );
}
