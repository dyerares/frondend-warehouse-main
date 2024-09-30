import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/sadp-cream.png";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";
import axios from "axios";

function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {

            // Replace with your actual API endpoint
            const response = await axios.post(
                'http://localh:8080/v1/login',
                {
                    email,
                    password,
                }
            );

            console.log(response);
            // console.log(response.data);
            // console.log(response.data.data.token);
            // Assume the token is received from the API
            const token = response.data.data.token;
            const user = response.data.data.name;

            // Save token to localStorage
            localStorage.setItem('token', token);

            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(user));

            if (token && user) {
                toast({
                    title: "Login successful",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });

                // Navigate to admin dashboard
                navigate("/admin");
            } else {

                if (response.data.code === 200) {

                    toast({
                        title: "Login failed , Call you IT Team",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                    });
                }

            }


        } catch (error) {
            toast({
                title: "Login failed",
                description: error.response?.data?.message || "An error occurred. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{base: "100%", md: "max-content"}}
                w='100%'
                mx={{base: "auto", lg: "0px"}}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{base: "30px", md: "60px"}}
                px={{base: "25px", md: "0px"}}
                mt={{base: "40px", md: "14vh"}}
                flexDirection='column'>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{base: "100%", md: "420px"}}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{base: "auto", lg: "unset"}}
                    me='auto'
                    mb={{base: "20px", md: "auto"}}>
                    <Box mb='24px'/>
                    <img src={`${process.env.PUBLIC_URL}/logosinaralam.png`} alt="Logo Sinar Alam"/>
                    <Box mb='64px'/>
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Email<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{base: "0px", md: "0px"}}
                            type='email'
                            placeholder='mail@simmmple.com'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Min. 8 characters'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='4px'>
                                <Icon
                                    color={textColorSecondary}
                                    _hover={{cursor: "pointer"}}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <Flex justifyContent='space-between' align='center' mb='24px'>
                            <FormControl display='flex' alignItems='center'>
                                <Checkbox
                                    id='remember-login'
                                    colorScheme='brandScheme'
                                    me='10px'
                                />
                                <FormLabel
                                    htmlFor='remember-login'
                                    mb='0'
                                    fontWeight='normal'
                                    color={textColor}
                                    fontSize='sm'>
                                    Keep me logged in
                                </FormLabel>
                            </FormControl>
                            <NavLink to='/auth/forgot-password'>
                                <Text
                                    color={textColorBrand}
                                    fontSize='sm'
                                    w='124px'
                                    fontWeight='500'>
                                    Forgot password?
                                </Text>
                            </NavLink>
                        </Flex>
                        {/*<NavLink to='/admin'>*/}
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            type="submit"
                            isLoading={isLoading}
                            onClick={handleLogin}>
                            Sign In
                        </Button>
                        {/*</NavLink>*/}
                    </FormControl>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            Not registered yet?
                            <NavLink to='/auth/sign-up'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>
                                    Create an Account
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
