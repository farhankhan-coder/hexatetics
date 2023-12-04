import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './base.min.css'
import './fancy.min.css'
import './main.css'
import bg1 from './bg1.png'
import bg2 from './bg2.png'
import bg3 from './bg3.png'
import bg4 from './bg4.png'
import bg5 from './bg5.png'
import bg6 from './bg6.png'
import bg7 from './bg7.png'
import bg8 from './bg8.png'
import bg9 from './bg9.png'


class BasicInfo extends React.Component {

    generatePDF = () => {
        const input = document.getElementById('my-html-template');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF(
                    {
                        orientation: "landscape",
                        unit: "in",
                        // format: [4, 6]
                    }
                );
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.setDisplayMode('fullwidth', 'continuous');

                pdf.save('myPDF.pdf');
            });
    }

    render() {
        
        return (
            <div>
                
                <body lang="EN-US style='word-wrap:break-word">
                    

                    <div class="WordSection1" >

                        <p class="MsoNormal" align="center" style='text-align:center'><span lang="EN"
                            style='font-size:13.0pt;line-height:115%;font-family:"EB Garamond Medium"'>CLASSIFIED</span></p>

                        <p class="MsoNormal" align="center" style='text-align:center;line-height:normal'><span
                            lang="EN" style='font-family:"EB Garamond Medium"'>GLENDALE UNIFIED SCHOOL
                            DISTRICT</span></p>

                        <p class="MsoNormal" align="center" style='text-align:center;line-height:normal'><span
                            lang="EN" style='font-family:"EB Garamond Medium"'>FORM 3</span></p>

                        <p class="MsoNormal" align="center" style='text-align:center;line-height:normal'><span
                            lang="EN" style='font-family:"EB Garamond Medium"'>Glendale, Califormia</span></p>

                        <p class="MsoNormal" align="center" style='text-align:center;line-height:normal'><span
                            lang="EN" style='font-family:"EB Garamond Medium"'>ADVANCE REQUEST FOR CLASSIFIED
                            SUBSTITUTE</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><b><span lang="EN" style='font-family:"EB Garamond"'>&nbsp;</span></b></p>

                        <p class="MsoNormal"><b><span lang="EN" style='font-family:"EB Garamond"'>&nbsp;</span></b></p>

                        <table class="1" border="1" cellspacing="0" cellpadding="0" width={624} style='border-collapse:
 collapse;border:none'>
                            <tr>
                                <td width={624} valign="top" style='width:6.5in;border:solid black 1.0pt;
  padding:5.0pt 5.0pt 5.0pt 5.0pt'>
                                    <p class="MsoNormal"><b><span lang="EN" style='font-family:"EB Garamond"'>DIRECTIONS:
                                        This form is to be completed and routed according to the approval signatures)
                                        sequence below when requesting a Classified Substitute.</span></b></p>
                                </td>
                            </tr>
                        </table>

                        <p class="MsoNormal"><b><span lang="EN" style='font-family:"EB Garamond"'>&nbsp;</span></b></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>CLASSIFICATION_______________________________DATES
                            From:_________Thru:________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>Type
                            of Sub Request Object Code:</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>Absent
                            Employee's Legal Name (if applicable)__________________________________________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>Total
                            Working Hours______________________________  From___________ To___________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>Location____________________________________________________________________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>Reason
                            for Absence Request ____________________________________________________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>If
                            possible, we would like to
                            have__________________________________________________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>
                            (Name of Substitute) Confirmed</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal" style='text-indent:.5in'><span lang="EN" style='font-family:
"EB Garamond Medium"'>Account Number(s) To Be Charged</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>________________________________________</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>&nbsp;</span></p>

                        <p class="MsoNormal"><span lang="EN" style='font-family:"EB Garamond Medium"'>_______________________________________</span></p>

                    </div>

                </body >
            </div >



        );
    }
}

export default BasicInfo;