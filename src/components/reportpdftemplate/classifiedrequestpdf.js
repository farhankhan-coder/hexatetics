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


class ClassifiedRequestPdf extends React.Component {

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
            <>
                <div id="my-html-template">
                    <div>
                        <div id="outline">
                        </div>
                    </div>
                    <div id="page-container">
                        <div id="pf1" class="pf w0 h0" data-page-no="1">
                            <div class="pc pc1 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src={bg1} />
                                <div class="c x1 y1 w2 h2">
                                    <div class="t m0 x0 h3 y2 ff1 fs1 fc0 sc0 ls0 ws0">DIRECTIONS: This form is to be completed and routed accourding to the approval signature(s) sequence below 
                                    <br/>when requesting a Classified Substitute.</div>
                                </div>
                                <div class="t m0 mt-2 x4 h3 y3 ff1 fs0 fc0 sc0 ls0 ws0 font-bold">CLASSIFIED</div>
                                <div class="t m0 ml-9 mt-2 x9 h3 y3 ff1 fs0 fc0 sc0 ls0 ws0 font-bold">FORM 3</div>
                                <div class="t m0 ml-3 x3 h3 y4 ff2 fs1 fc0 sc0 ls0 ws0">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                <div class="t m0 x4 h4 y5 ff2 fs1 fc0 sc0 ls0 ws0">Glendale, California</div>
                                <div class="t m0 x2 mr-5 h3 y6 ff1 fs1 fc0 sc0 ls0 ws0 font-bold">ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</div>

                                <div class="t m0 x7 h4 y7 ff1 fs1 fc0 sc0 ls0 ws0">THIS CONTRACT <span class="ff2">made and entered
                                    <span class="_ _0"></span> into <span class="_ _1"></span>thi<span class="_ _2"></span>s <span
                                        class="_ _3"> </span>day <span class="_ _1"></span>of</span></div>
                                <div class="t m2 x8 h4 y7 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x9 h4 y7 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m2 xa h4 y7 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x7 h4 y8 ff2 fs1 fc0 sc0 ls0 ws0">by and <span class="_ _0"></span>between </div>
                                <div class="t m3 xb h4 y8 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x7 h4 y9 ff2 fs1 fc0 sc0 ls0 ws0">hereinafter called the <span class="ff1">PROVIDER and
                                    the GLENDALE UNIFIED SCHOOL DISTRICT, </span>hereinafter called the <span
                                        class="ff1">DISTRICT.</span></div>
                                <div class="t m0 x7 h4 ya ff2 fs1 fc0 sc0 ls0 ws0">WITNESSETH; The parties do hereby contract and agree
                                    as follows:</div>
                                
                                <div class="t m0 x0 h4 yb ff2 fs1 fc0 sc0 ls0 ws0">The <span class="_ _2"></span><span
                                    class="ff1">PROVIDER <span class="_ _4"></span></span>shall <span class="_ _4"></span>furnish
                                    the <span class="_ _2"></span><span class="ff1">DISTRICT <span class="_ _4"></span></span>for a
                                    <span class="_ _2"></span>total <span class="_ _2"></span>contract <span class="_ _4"></span>price
                                    <span class="_ _4"></span>of:</div>
                                <div class="t m3 x0 h4 yc ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 xd h4 yc ff2 fs1 fc0 sc0 ls0 ws0">Dollars <span class="_ _5"> </span>$ </div>
                                <div class="t m3 xe h4 yc ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 xf h4 yc ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x0 h4 yd ff2 fs1 fc0 sc0 ls0 ws0">the following <span class="_ _2"></span>services:
                                </div>
                                
                                
                            </div>

                        </div>
                    </div>
                </div>

                {/* <button onClick={this.generatePDF}>Generate PDF</button> */}
            </>

        );
    }
}

export default ClassifiedRequestPdf;