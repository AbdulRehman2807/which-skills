import React, { useEffect, useState } from "react";
import DrawerAppBar from "../../component/naveBar";
import { Box, Button } from "@mui/material";
import MultiSelect from "../../component/formComponents/multiSelect";
import options from "../../assets/data/options.json";
import levels from "../../assets/data/levels.json";
// Import the html2canvas and jspdf libraries
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function MainApp() {
  const [selectedSkills, setSelectedSkills] = useState([])
  const [skills, setSkills] = useState([]);

  const selectLevel = (e, skillLevel) => {
    e.level = skillLevel;
    setSkills([...skills]);
  }

  // Define the downloadPdfScreenshot function
  function downloadPdfScreenshot() {
    // Use html2canvas to take a screenshot of the current page
    html2canvas(document.body).then(function (canvas) {
      // Convert the canvas to an image data URL
      var imgData = canvas.toDataURL('image/png');

      // Calculate the dimensions of the PDF page based on the canvas size
      var imgWidth = 210; // A4 width in mm
      var pageHeight = imgWidth * canvas.height / canvas.width;
      var imgHeight = pageHeight > 297 ? 297 : pageHeight; // A4 height in mm (max)

      // Create a new PDF document
      var doc = new jsPDF('p', 'mm', 'a4');

      // Add the screenshot image to the PDF document
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download the PDF document
      doc.save('screenshot.pdf');
      console.log("in download")
    });
  }



  useEffect(() => {
    skills.length = 0;
    setSkills([...skills]);
    selectedSkills.map((e, i) => {
      skills.push({
        skill: e,
        level: ""
      })
    })
    setSkills([...skills])
  }, [selectedSkills])

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
          <h3 className="first" >Skill Levels</h3>
          {
            skills && skills.length > 0 &&
            skills.map((e, i) => {
              return (
                <div key={i} className="main" >
                  <div className="heading" style={{ color: 'white', fontSize: '16px', padding: '0px 15px' }}  >{e.skill}</div>
                  <div className="levelBox">
                    {levels && levels.length > 0 &&
                      levels.map((event, index) => {
                        return (
                          <div onClick={() => selectLevel(e, event)} className={e.level === event ? "selectedSkillItem" : "skillItem"} key={index}>{event}</div>
                        )
                      })
                    }
                  </div>

                </div>
              )
            })
          }
          <button className="btn" onClick={downloadPdfScreenshot} >Download Report</button>
        </Box>
      </Box>
    </>
  );
}
