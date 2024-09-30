// chakra imports
import {Box, Flex, Stack} from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
// import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
    const {routes} = props;
    // SIDEBAR

    // Filter rute yang akan ditampilkan di sidebar
  const sidebarRoutes = routes.filter(route => route.showInSidebar !== false);

    return (
        <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
            <Brand/>
            <Stack direction='column' mb='auto' mt='8px'>
                <Box ps='20px' pe={{md: "16px", "2xl": "1px"}}>
                    <Links routes={sidebarRoutes}/>
                </Box>
            </Stack>
        </Flex>
    );
}

export default SidebarContent;
