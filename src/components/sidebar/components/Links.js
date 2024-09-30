import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Text, useColorModeValue, Collapse } from "@chakra-ui/react";

export function SidebarLinks(props) {
  const location = useLocation();
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");
  const activeIcon = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;
  const [openRoute, setOpenRoute] = useState(null); // To keep track of the open route

  const activeRoute = (routeName) => location.pathname.includes(routeName);

  // Function to handle submenu toggle
  const toggleSubmenu = (routeName) => {
    setOpenRoute(openRoute === routeName ? null : routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        // For routes with submenus
        return (
          <Box key={index}>
            <Box onClick={() => toggleSubmenu(route.path)}>
              <HStack
                spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
                py="5px"
                ps="10px"
                cursor="pointer"
              >
                <Flex w="100%" alignItems="center">
                  <Box
                    color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
                    me="18px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                    fontWeight={activeRoute(route.path.toLowerCase()) ? "bold" : "normal"}
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  bg={activeRoute(route.path.toLowerCase()) ? brandColor : "transparent"}
                  borderRadius="5px"
                />
              </HStack>
            </Box>
            {/* Submenu Collapse */}
            <Collapse in={openRoute === route.path}>
              {route.children.map((child, idx) => (
                <NavLink key={idx} to={child.layout + child.path}>
                  <HStack
                    spacing="26px"
                    py="5px"
                    ps="40px" // Indentation for submenu
                  >
                    <Text
                      color={activeRoute(child.path.toLowerCase()) ? activeColor : inactiveColor}
                      fontWeight={activeRoute(child.path.toLowerCase()) ? "bold" : "normal"}
                    >
                      {child.name}
                    </Text>
                  </HStack>
                </NavLink>
              ))}
            </Collapse>
          </Box>
        );
      } else {
        // For routes without submenus
        return (
          <NavLink key={index} to={route.layout + route.path}>
            <HStack
              spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
              py="5px"
              ps="10px"
            >
              <Flex w="100%" alignItems="center">
                <Box
                  color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
                  me="18px"
                >
                  {route.icon}
                </Box>
                <Text
                  color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                  fontWeight={activeRoute(route.path.toLowerCase()) ? "bold" : "normal"}
                >
                  {route.name}
                </Text>
              </Flex>
              <Box
                h="36px"
                w="4px"
                bg={activeRoute(route.path.toLowerCase()) ? brandColor : "transparent"}
                borderRadius="5px"
              />
            </HStack>
          </NavLink>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>; // Return the links
}

export default SidebarLinks;
