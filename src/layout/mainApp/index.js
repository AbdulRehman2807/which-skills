import React, { useEffect, useState } from "react";
import DrawerAppBar from "../../component/naveBar";
import { Box } from "@mui/material";
import MultiSelect from "../../component/formComponents/multiSelect";
import options from "../../assets/data/options.json";

export default function MainApp() {
  const [selectedSkills, setSelectedSkills] = useState([])


  return (
    <>
      <Box style={{ height: "100vh" }}>
        <DrawerAppBar />

        <Box sx={{ marginTop: '100px', padding: '10px', width: '90%', marginX: 'auto' }}>
          <h3 className="first">Skills</h3>
          <MultiSelect
            items={options}
            selected={selectedSkills}
            setSelected={setSelectedSkills}
          />
          <h3 className="first">Skill Levels</h3>
          {
            selectedSkills && selectedSkills.length > 0 &&
            selectedSkills.map((e, i) => {
              return (
                <div key={i} style={{ margin: "20px 0px" }} >
                  <div style={{ color: 'white', fontSize: '16px', padding: '0px 15px' }}  >{e}</div>

                </div>
              )
            })
          }
        </Box>
      </Box>
    </>
  );
}

// const mainBox = {

// }