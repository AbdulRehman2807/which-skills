import React from "react";
import DrawerAppBar from "../../component/naveBar";
import { Box } from "@mui/material";

export default function MainApp() {
  return (
    <>
      <Box style={{ background: "black", height: "100%" }}>
        <DrawerAppBar />
      </Box>
    </>
  );
}
