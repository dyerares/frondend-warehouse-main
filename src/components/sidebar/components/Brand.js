import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  // let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/*<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />*/}
        <div style={{ fontSize: "26px", fontWeight: "700", color: "black", display: "flex", alignItems: "center", textAlign: "center"}}>
          <img src={process.env.PUBLIC_URL + "/logosadp.png"} alt="logo" width="32" height="32" style={{ marginRight: "10px" }} />
          Warehouse
          <br/>System
        </div>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
