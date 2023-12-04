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


class ServiceAgreementPdf extends React.Component {

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
                                    <div class="t m0 x2 h3 y2 ff1 fs0 fc0 sc0 ls0 ws0">PERSONAL SERVICES AGREEMENT</div>
                                </div>
                                <div class="t m0 x3 h3 y3 ff1 fs0 fc0 sc0 ls0 ws0">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                <div class="t m0 x4 h4 y4 ff2 fs1 fc0 sc0 ls0 ws0">223 North Jackson Street </div>
                                <div class="t m0 x5 h4 y5 ff2 fs1 fc0 sc0 ls0 ws0">Glendale, CA 91206</div>
                                <div class="t m1 x6 h5 y6 ff2 fs2 fc0 sc0 ls0 ws0">(818) 241-3111</div>
                                <div class="t m0 x7 h4 y7 ff1 fs1 fc0 sc0 ls0 ws0">THIS CONTRACT <span class="ff2">made and entered
                                    <span class="_ _0"></span>into <span class="_ _1"></span>thi<span class="_ _2"></span>s <span
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
                                <div class="t m4 x7 h4 yb ff2 fs1 fc0 sc0 ls0 ws0">1.</div>
                                <div class="t m0 xc h4 yb ff2 fs1 fc0 sc0 ls0 ws0">The <span class="_ _2"></span><span
                                    class="ff1">PROVIDER <span class="_ _4"></span></span>shall <span class="_ _4"></span>furnish
                                    the <span class="_ _2"></span><span class="ff1">DISTRICT <span class="_ _4"></span></span>for a
                                    <span class="_ _2"></span>total <span class="_ _2"></span>contract <span class="_ _4"></span>price
                                    <span class="_ _4"></span>of:</div>
                                <div class="t m3 xc h4 yc ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 xd h4 yc ff2 fs1 fc0 sc0 ls0 ws0">Dollars <span class="_ _5"> </span>$ </div>
                                <div class="t m3 xe h4 yc ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 xf h4 yc ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 xc h4 yd ff2 fs1 fc0 sc0 ls0 ws0">the following <span class="_ _2"></span>services:
                                </div>
                                <div class="t m4 x7 h5 ye ff2 fs2 fc0 sc0 ls0 ws0">2.</div>
                                <div class="t m0 xc h4 ye ff2 fs2 fc0 sc0 ls0 ws0">The term of this contract shall <span
                                    class="_ _4"></span>beg<span class="_ _2"></span>in <span class="_ _6"> </span><span
                                        class="fs1">and will <span class="_ _1"></span>terminate on <span class="_ _0"></span>or <span
                                            class="_ _1"></span>before </span></div>
                                <div class="t m3 x10 h4 ye ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m4 x7 h4 yf ff2 fs1 fc0 sc0 ls0 ws0">3.</div>
                                <div class="t m0 xc h4 yf ff2 fs1 fc0 sc0 ls0 ws0">The Provider shall not commence work under this
                                    Contract until the insurance required under Paragraph 17 of the <span class="ff1">Terms and </span>
                                </div>
                                <div class="t m0 xc h4 y10 ff1 fs1 fc0 sc0 ls0 ws0">Conditions <span class="ff2">and <span
                                    class="_ _1"></span>satisfactory <span class="_ _1"></span>proof <span
                                        class="_ _1"></span>of <span class="_ _7"></span>such <span class="_ _8"></span>insurance
                                    has <span class="_ _8"></span>been <span class="_ _8"></span>submitted to <span
                                        class="_ _8"></span>the <span class="_ _1"></span>District <span class="_ _8"></span>and
                                    <span class="_ _1"></span>said <span class="_ _1"></span>insurance has <span
                                        class="_ _8"></span>been <span class="_ _8"></span>approved by </span></div>
                                <div class="t m0 xc h4 y11 ff2 fs1 fc0 sc0 ls0 ws0">the <span class="_ _1"></span>District.</div>
                                <div class="t m4 x7 h4 y12 ff2 fs1 fc0 sc0 ls0 ws0">4.</div>
                                <div class="t m0 xc h4 y12 ff2 fs1 fc0 sc0 ls0 ws0">Payment <span class="_ _1"></span>Schedule <span
                                    class="_ _5"> </span>- <span class="_ _0"></span>Payment <span class="_ _1"></span>for <span
                                        class="_ _1"></span>the <span class="_ _8"></span>work <span class="_ _8"></span>shall be <span
                                            class="_ _8"></span>made <span class="_ _1"></span>upon <span class="_ _8"></span>submission
                                    <span class="_ _1"></span>of <span class="_ _7"></span>monthly statements <span
                                        class="_ _1"></span>and the <span class="_ _7"></span>District&apos;s written </div>
                                <div class="t m0 xc h4 y13 ff2 fs1 fc0 sc0 ls0 ws0">approval of the work (which approval shall not be
                                    unreasonably <span class="_ _5"> </span>withheld).</div>
                                <div class="t m4 x7 h4 y14 ff2 fs1 fc0 sc0 ls0 ws0">5.</div>
                                <div class="t m1 xc h5 y15 ff2 fs2 fc0 sc0 ls0 ws0">Approvals for payment shall be authorized by a
                                    responsible District administrator.</div>
                                <div class="t m4 x7 h4 y16 ff2 fs1 fc0 sc0 ls0 ws0">6.</div>
                                <div class="t m0 xc h4 y16 ff2 fs1 fc0 sc0 ls0 ws0">The <span class="_ _8"></span>Contract includes the
                                    <span class="_ _1"></span>general terms <span class="_ _8"></span>and conditions <span
                                        class="_ _1"></span>as <span class="_ _1"></span>printed and <span class="_ _1"></span>set <span
                                            class="_ _8"></span>forth <span class="_ _1"></span>on <span class="_ _1"></span>the <span
                                                class="_ _1"></span>reverse <span class="_ _1"></span>side <span class="_ _1"></span>of <span
                                                    class="_ _1"></span>this <span class="_ _8"></span>page, <span class="_ _1"></span>and the <span
                                                        class="_ _7"></span>Provider, </div>
                                <div class="t m0 xc h4 y17 ff2 fs1 fc0 sc0 ls0 ws0">by executing this Contact, agrees to comply with all
                                    such general terms and <span class="_ _5"> </span>conditions.</div>
                                <div class="t m4 x7 h4 y18 ff2 fs1 fc0 sc0 ls0 ws0">7.</div>
                                <div class="t m0 xc h4 y18 ff2 fs1 fc0 sc0 ls0 ws0">The <span class="_ _7"></span>Provider <span
                                    class="_ _8"></span>shall <span class="_ _1"></span>guarantee that <span class="_ _7"></span>all
                                    <span class="_ _1"></span>professional services rendered <span class="_ _1"></span>in <span
                                        class="_ _8"></span>the <span class="_ _1"></span>performance of <span class="_ _8"></span>this
                                    Contract <span class="_ _1"></span>are <span class="_ _8"></span>in <span
                                        class="_ _8"></span>keeping with </div>
                                <div class="t m0 xc h4 y19 ff2 fs1 fc0 sc0 ls0 ws0">current generally accepted practices for an
                                    educational institution.</div>
                                <div class="t m4 x7 h4 y1a ff2 fs1 fc0 sc0 ls0 ws0">8.</div>
                                <div class="t m0 xc h4 y1a ff2 fs1 fc0 sc0 ls0 ws0">The Provider will complete and provide the necessary
                                    documentation in order for the District to submit claims under the LEA </div>
                                <div class="t m0 xc h4 y1b ff2 fs1 fc0 sc0 ls0 ws0">Medi-Cal <span class="_ _8"></span>Billing <span
                                    class="_ _8"></span>Option <span class="_ _7"></span>Program. Provider <span
                                        class="_ _7"></span>will <span class="_ _1"></span>be <span class="_ _8"></span>advised <span
                                            class="_ _8"></span>by <span class="_ _1"></span>the <span class="_ _8"></span>District&apos;s
                                    <span class="_ _1"></span>representative <span class="_ _8"></span>responsible for <span
                                        class="_ _7"></span>facilitating this <span class="_ _8"></span>billing </div>
                                <div class="t m0 xc h4 y1c ff2 fs1 fc0 sc0 ls0 ws0">process.</div>
                                <div class="t m4 x7 h4 y1d ff2 fs1 fc0 sc0 ls0 ws0">9.</div>
                                <div class="t m0 xc h4 y1e ff2 fs1 fc0 sc0 ls0 ws0">IN <span class="_ _7"></span>WITNESS <span
                                    class="_ _1"></span>WHEREOF, the <span class="_ _8"></span>parties <span
                                        class="_ _1"></span>hereunto <span class="_ _1"></span>have <span class="_ _8"></span>subscribed
                                    to <span class="_ _8"></span>this <span class="_ _1"></span>Contract, including <span
                                        class="_ _8"></span>all <span class="_ _8"></span>Contract <span class="_ _1"></span>Docmnents
                                    <span class="_ _1"></span>as <span class="_ _1"></span>listed</div>
                                <div class="t m0 x11 h4 y1d ff2 fs1 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 xc h4 y1f ff2 fs1 fc0 sc0 ls0 ws0">below:</div>
                                <div class="t m0 x12 h4 y20 ff2 fs1 fc0 sc0 ls0 ws0">Scope of <span class="_ _0"></span>Work <span
                                    class="_ _1"></span>Statement<span class="_ _9"> </span>Addendum <span
                                        class="_ _0"></span>Containing <span class="_ _8"></span>Specific <span
                                            class="_ _7"></span>Terms <span class="_ _0"></span>and <span class="_ _7"></span>Conditions
                                </div>
                                <div class="t m0 x12 h4 y21 ff2 fs1 fc0 sc0 ls0 ws0">Insurance <span class="_ _1"></span>Forms<span
                                    class="_ _a"> </span>Attached Addendwn <span class="_ _b"></span>No.</div>
                                <div class="t m0 x13 h4 y20 ff2 fs1 fc0 sc0 ls0 ws0">Purchase Order No.</div>
                                <div class="t m1 x14 h5 y22 ff2 fs2 fc0 sc0 ls0 ws0">Page 1 of 4</div>
                                <div class="t m1 x15 h6 y23 ff2 fs3 fc0 sc0 ls0 ws0">Revised 12/14/2022</div>
                                <div class="c x16 y24 w3 h7">
                                    <div class="t m0 x17 h8 y25 ff2 fs4 fc0 sc0 ls0 ws0">Submit Completed <span class="_ _4"></span>form
                                        <span class="_ _4"></span>to: <span class="_ _c"> </span>Reference <span class="_ _7"></span>#:
                                    </div>
                                    <div class="t m2 x18 h8 y25 ff2 fs4 fc0 sc0 ls0 ws0"> </div>
                                </div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                        <div id="pf2" class="pf w0 h0" data-page-no="2">
                            <div class="pc pc2 w0 h0"><img class="bi x0 y26 w4 h9" alt="" src={bg2} />
                                <div class="c x1 y27 w2 ha">
                                    <div class="t m1 x19 h4 y28 ff1 fs1 fc0 sc0 ls0 ws0">NOTE: <span class="_ _d"> </span><span
                                        class="ff2">Federal <span class="_ _d"> </span>Regulations <span class="_ _d"> </span>(Code
                                        <span class="_ _d"> </span>Sections <span class="_ _d"> </span>6041 <span class="_ _d">
                                        </span>and <span class="_ _d"> </span>6209) <span class="_ _d"> </span>require <span
                                            class="_ _d"> </span>non-corporate <span class="_ _d"> </span>recipients <span
                                                class="_ _d"> </span>of <span class="_ _d"> </span>$600.00 <span class="_ _d"> </span>or
                                        <span class="_ _d"> </span>more <span class="_ _d"> </span>to </span></div>
                                    <div class="t m1 x19 h4 y29 ff2 fs1 fc0 sc0 ls0 ws0">furnish <span class="_ _4"></span>their <span
                                        class="_ _4"></span>taxpayer <span class="_ _4"></span>identification <span
                                            class="_ _b"></span>number <span class="_ _4"></span>to <span class="_ _4"></span>the <span
                                                class="_ _4"></span>payer. <span class="_ _b"></span>The <span
                                                    class="_ _4"></span>regulations <span class="_ _4"></span>also <span
                                                        class="_ _4"></span>provide <span class="_ _4"></span>that <span class="_ _b"></span>a <span
                                                            class="_ _4"></span>penalty <span class="_ _4"></span>may <span class="_ _4"></span>be <span
                                                                class="_ _b"></span>imposed <span class="_ _4"></span>for </div>
                                    <div class="t m1 x19 h4 y2a ff2 fs1 fc0 sc0 ls0 ws0">failure <span class="_ _4"></span>to <span
                                        class="_ _4"></span>furnish <span class="_ _b"></span>the <span class="_ _4"></span>taxpayer
                                        <span class="_ _4"></span>identification <span class="_ _4"></span>number. <span
                                            class="_ _b"></span>In <span class="_ _4"></span>order <span class="_ _4"></span>to <span
                                                class="_ _4"></span>comply <span class="_ _b"></span>with <span class="_ _4"></span>these
                                        <span class="_ _4"></span>regulations, <span class="_ _4"></span>the <span
                                            class="_ _b"></span>District <span class="_ _4"></span>requires <span
                                                class="_ _4"></span>your </div>
                                    <div class="t m1 x19 h4 y2b ff2 fs1 fc0 sc0 ls0 ws0">federal tax identification number or Social
                                        Security Number, whichever is <span class="_ _2"></span>applicable.</div>
                                </div>
                                <div class="c x1 y2c w2 hb">
                                    <div class="t m0 x19 hc y2d ff2 fs5 fc0 sc0 ls0 ws0">“I <span class="_ _7"></span>am <span
                                        class="_ _1"></span>aware <span class="_ _1"></span>of <span class="_ _1"></span>the <span
                                            class="_ _1"></span>provisions of <span class="_ _8"></span>Section <span
                                                class="_ _1"></span>3700 <span class="_ _8"></span>of <span class="_ _1"></span>the <span
                                                    class="_ _8"></span>Labor Code <span class="_ _1"></span>which require every <span
                                                        class="_ _8"></span>employer to <span class="_ _1"></span>be <span
                                                            class="_ _1"></span>insured against liability for Worker&apos;s </div>
                                    <div class="t m0 x19 hc y2e ff2 fs5 fc0 sc0 ls0 ws0">Compensation or to undertake self insurance in
                                        accordance with provisions of that code, and I will comply with such provisions before </div>
                                    <div class="t m0 x19 hc y2f ff2 fs5 fc0 sc0 ls0 ws0">commencing the performance of the work of this
                                        <span class="_ _1"></span>Contract.”</div>
                                </div>
                                <div class="t m0 x1a hd y30 ff1 fs1 fc0 sc0 ls0 ws0">TYPE OF BUSINESS ENTITY</div>
                                <div class="t m0 x1b h4 y31 ff2 fs1 fc0 sc0 ls0 ws0">Individual</div>
                                <div class="t m5 x1b h4 y32 ff2 fs1 fc0 sc0 ls0 ws0">Sole Partnership </div>
                                <div class="t m0 x1b h4 y33 ff2 fs1 fc0 sc0 ls0 ws0">Partnership </div>
                                <div class="t m0 x1b h4 y34 ff2 fs1 fc0 sc0 ls0 ws0">Corporation </div>
                                <div class="t m0 x1b h4 y35 ff2 fs1 fc0 sc0 ls0 ws0">Other</div>
                                <div class="t m1 x1c h4 y30 ff2 fs1 fc0 sc0 ls0 ws0">TAX IDENTIFICATION</div>
                                <div class="t m0 x1d h4 y36 ff2 fs1 fc0 sc0 ls0 ws0">Social Security Number</div>
                                <div class="t m0 x1e h4 y37 ff2 fs1 fc0 sc0 ls0 ws0">Employer Identification</div>
                                <div class="t m1 x1f h4 y38 ff2 fs1 fc0 sc0 ls0 ws0">Under penalty of perjury, I certify that the </div>
                                <div class="t m1 x1f h4 y39 ff2 fs1 fc0 sc0 ls0 ws0">number shown on this form is my correct </div>
                                <div class="t m1 x1f h4 y3a ff2 fs1 fc0 sc0 ls0 ws0">taxpayer identification number.</div>
                                <div class="t m1 x14 h5 y3b ff2 fs2 fc0 sc0 ls0 ws0">Page 2 of 4</div>
                                <div class="c x1 y3c w2 h2">
                                    <div class="t m1 x2 he y2 ff2 fs0 fc0 sc0 ls0 ws0">PERSONAL SERVICES AGREEMENT</div>
                                </div>
                                <div class="c x20 y3d w5 hf">
                                    <div class="t m1 x21 h4 y3e ff2 fs1 fc0 sc0 ls0 ws0">PROVIDER</div>
                                </div>
                                <div class="c x8 y3d w6 hf">
                                    <div class="t m0 x21 hd y3e ff1 fs1 fc0 sc0 ls0 ws0">GLENDALE <span class="_ _7"></span>UNIFIED
                                        <span class="_ _8"></span>SCHOOL <span class="_ _8"></span>DISTRICT</div>
                                </div>
                                <div class="c x22 y3f w7 h10">
                                    <div class="t m1 x21 h6 y40 ff2 fs3 fc0 sc0 ls0 ws0">Provider Name</div>
                                </div>
                                <div class="c x23 y41 w8 h10">
                                    <div class="t m1 x21 h6 y40 ff2 fs3 fc0 sc0 ls0 ws0">Superintendent, Assistant Superintendent or
                                        Chief HR &amp; Operations Officer</div>
                                </div>
                                <div class="c x24 y42 w9 h11">
                                    <div class="t m5 x21 h12 y43 ff2 fs6 fc0 sc0 ls0 ws0">Signature</div>
                                </div>
                                <div class="c x25 y44 w9 h11">
                                    <div class="t m5 x21 h12 y43 ff2 fs6 fc0 sc0 ls0 ws0">Signature</div>
                                </div>
                                <div class="c x26 y45 wa hf">
                                    <div class="t m0 x21 h4 y3e ff2 fs1 fc0 sc0 ls0 ws0">TITLE:</div>
                                </div>
                                <div class="c x27 y46 wb hf">
                                    <div class="t m0 x21 h4 y3e ff2 fs1 fc0 sc0 ls0 ws0">DATE:</div>
                                </div>
                                <div class="c x26 y47 wc hf">
                                    <div class="t m0 x21 h4 y3e ff2 fs1 fc0 sc0 ls0 ws0">LICENSE NO.:</div>
                                </div>
                                <div class="c x27 y48 wd h13">
                                    <div class="t m0 x21 h5 y49 ff2 fs2 fc0 sc0 ls0 ws0">ACCOUNT NO.:</div>
                                </div>
                                <div class="c x26 y4a we h13">
                                    <div class="t m0 x21 h5 y49 ff2 fs2 fc0 sc0 ls0 ws0">ADDRESS:</div>
                                </div>
                                <div class="c x27 y4b wf h14">
                                    <div class="t m0 x21 h4 y4c ff2 fs1 fc0 sc0 ls0 ws0">DATE OF BOARD </div>
                                    <div class="t m0 x21 h4 y4d ff2 fs1 fc0 sc0 ls0 ws0">MEETING:</div>
                                </div>
                                <div class="c x26 y4e w10 h15">
                                    <div class="t m0 x21 h4 y4f ff2 fs1 fc0 sc0 ls0 ws0">DATE:</div>
                                    <div class="t m0 x28 h4 y50 ff2 fs1 fc0 sc0 ls0 ws0">BOARD ITEM:</div>
                                    <div class="t m1 x21 h5 y51 ff2 fs2 fc0 sc0 ls0 ws0">PHONE:</div>
                                    <div class="t m0 x28 h4 y52 ff2 fs1 fc0 sc0 ls0 ws0">PAGE/ITEM .:</div>
                                </div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                        <div id="pf3" class="pf w0 h0" data-page-no="3">
                            <div class="pc pc3 w0 h0"><img class="bi x12 y53 w11 h16" alt="" src={bg3} />
                                <div class="t m0 x29 hd y54 ff1 fs1 fc0 sc0 ls0 ws0">GENERAL TERMS AND CONDITIONS</div>
                                <div class="t m0 x0 h17 y55 ff2 fs7 fc0 sc0 ls0 ws0">l. <span class="_ _2"></span><span
                                    class="ff1">PROPOSAL <span class="_ _2"></span>ACCEPTANCE. <span
                                        class="_ _4"></span></span>Proposals <span class="_ _2"></span>are <span
                                            class="_ _2"></span>subject <span class="_ _4"></span>to <span class="_ _2"></span>acceptance
                                    <span class="_ _2"></span>by <span class="_ _4"></span>the <span class="_ _2"></span>signing <span
                                        class="_ _2"></span>of <span class="_ _4"></span>a <span class="_ _2"></span>contract <span
                                            class="_ _2"></span>and <span class="_ _4"></span>issuance <span class="_ _2"></span>of <span
                                                class="_ _2"></span>an <span class="_ _4"></span>appropriate <span class="_ _2"></span>purchase
                                    <span class="_ _2"></span>order <span class="_ _2"></span>at <span class="_ _4"></span>any <span
                                        class="_ _2"></span>time </div>
                                <div class="t m0 x0 h17 y56 ff2 fs7 fc0 sc0 ls0 ws0">within <span class="_ _2"></span>sixty <span
                                    class="_ _2"></span>(60) <span class="_ _2"></span>days after <span class="_ _2"></span>the
                                    <span class="_ _2"></span>receipt <span class="_ _2"></span>of <span class="_ _2"></span>quotes
                                    <span class="_ _2"></span>unless <span class="_ _2"></span>otherwise <span
                                        class="_ _2"></span>stipulated. <span class="_ _2"></span>The <span class="_ _2"></span>District
                                    <span class="_ _2"></span>reserves <span class="_ _2"></span>the <span class="_ _2"></span>right
                                    <span class="_ _2"></span>to <span class="_ _2"></span>accept <span class="_ _2"></span>or <span
                                        class="_ _2"></span>reject <span class="_ _2"></span>any <span class="_ _2"></span>and all <span
                                            class="_ _2"></span>quotes <span class="_ _2"></span>and <span class="_ _2"></span>reserves
                                </div>
                                <div class="t m0 x0 h17 y57 ff2 fs7 fc0 sc0 ls0 ws0">the right to waive any informality in any quote.
                                </div>
                                <div class="t m1 x0 h17 y58 ff2 fs7 fc0 sc0 ls0 ws0">2.</div>
                                <div class="t m0 x16 h17 y58 ff1 fs7 fc0 sc0 ls0 ws0">EQUIPMENT AND <span class="_ _2"></span>LABOR.
                                    <span class="ff2">The <span class="_ _2"></span>Provider <span class="_ _2"></span>shall furnish
                                        <span class="_ _2"></span>all tools, <span class="_ _2"></span>equipment, <span
                                            class="_ _2"></span>apparatus, facilities, <span class="_ _2"></span>transportation, labor,
                                        <span class="_ _2"></span>and material <span class="_ _2"></span>necessary <span
                                            class="_ _2"></span>to furnish </span></div>
                                <div class="t m0 x0 h17 y59 ff2 fs7 fc0 sc0 ls0 ws0">the <span class="_ _4"></span>professional <span
                                    class="_ _4"></span>services <span class="_ _4"></span>herein <span
                                        class="_ _4"></span>described, <span class="_ _4"></span>the <span class="_ _4"></span>services
                                    <span class="_ _4"></span>to <span class="_ _4"></span>be <span class="_ _2"></span>performed <span
                                        class="_ _4"></span>at <span class="_ _4"></span>such <span class="_ _4"></span>time <span
                                            class="_ _4"></span>and <span class="_ _4"></span>places <span class="_ _4"></span>as <span
                                                class="_ _4"></span>directed <span class="_ _4"></span>by <span class="_ _4"></span>and <span
                                                    class="_ _4"></span>subject <span class="_ _4"></span>to <span class="_ _4"></span>the <span
                                                        class="_ _4"></span>approval <span class="_ _4"></span>of <span class="_ _4"></span>the <span
                                                            class="_ _4"></span>authorized </div>
                                <div class="t m0 x0 h17 y5a ff2 fs7 fc0 sc0 ls0 ws0">district representative indicated in the work
                                    specifications attached <span class="_ _5"> </span>hereto.</div>
                                <div class="t m1 x0 h17 y5b ff2 fs7 fc0 sc0 ls0 ws0">3.</div>
                                <div class="t m0 x16 h17 y5b ff1 fs7 fc0 sc0 ls0 ws0">SAFETY <span class="_ _b"> </span>AND <span
                                    class="_ _5"> </span>SECURITY. <span class="_ _b"> </span><span class="ff2">It <span
                                        class="_ _5"> </span>shall <span class="_ _b"></span>be <span class="_ _b"> </span>the <span
                                            class="_ _5"> </span>responsibility <span class="_ _b"></span>of <span class="_ _b">
                                        </span>the <span class="_ _5"> </span>Provider <span class="_ _b"> </span>to <span class="_ _b">
                                        </span>asceuain <span class="_ _5"> </span>from <span class="_ _b"> </span>the <span
                                            class="_ _5"> </span>District <span class="_ _b"></span>the <span class="_ _b"> </span>rules
                                        <span class="_ _5"> </span>and <span class="_ _b"></span>regulations <span class="_ _b">
                                        </span>pertaining <span class="_ _5"> </span>to <span class="_ _b"> </span>safety, </span></div>
                                <div class="t m0 x0 h17 y5c ff2 fs7 fc0 sc0 ls0 ws0">security and driving on school grounds, pauicularly
                                    when children <span class="_ _2"></span>are present.</div>
                                <div class="t m1 x0 h17 y5d ff2 fs7 fc0 sc0 ls0 ws0">4.</div>
                                <div class="t m0 x16 h17 y5d ff1 fs7 fc0 sc0 ls0 ws0">TERMINATION. <span class="ff2">This Contract may
                                    be terminated at any time by either pany with five (5) business days&apos; advance written <span
                                        class="_ _5"> </span>notice.</span></div>
                                <div class="t m1 x0 h17 y5e ff2 fs7 fc0 sc0 ls0 ws0">5.</div>
                                <div class="t m0 x2a h17 y5e ff1 fs7 fc0 sc0 ls0 ws0">DEFAULT BY <span class="_ _2"></span>PROVIDER.
                                    <span class="_ _2"></span><span class="ff2">When <span class="_ _2"></span>Provider shall <span
                                        class="_ _2"></span> <span class="_ _2"></span>fail <span class="_ _2"></span>to deliver
                                        <span class="_ _2"></span>any <span class="_ _2"></span>article <span class="_ _2"></span>or
                                        <span class="_ _2"></span>service <span class="_ _2"></span> or <span class="_ _2"></span>shall
                                        <span class="_ _2"></span> <span class="_ _2"></span>deliver <span class="_ _2"></span>any <span
                                            class="_ _2"></span>auicle <span class="_ _2"></span>or <span class="_ _2"></span>service
                                        <span class="_ _2"></span>which does <span class="_ _2"></span> <span class="_ _2"></span>not
                                        <span class="_ _2"></span> conform </span></div>
                                <div class="t m0 x0 h17 y5f ff2 fs7 fc0 sc0 ls0 ws0">to <span class="_ _2"></span>the <span
                                    class="_ _2"></span>work <span class="_ _2"></span>specifications, <span class="_ _2"></span>the
                                    <span class="_ _2"></span>District <span class="_ _2"></span>may, <span class="_ _2"></span>upon
                                    <span class="_ _4"></span>five <span class="_ _2"></span>(5) <span class="_ _2"></span>business
                                    <span class="_ _2"></span>days&apos; <span class="_ _2"></span>prior <span
                                        class="_ _2"></span>written <span class="_ _2"></span>notice <span
                                            class="_ _2"></span>describing <span class="_ _4"></span>the <span class="_ _2"></span>fault
                                    <span class="_ _2"></span>at <span class="_ _2"></span>in <span class="_ _2"></span>option, <span
                                        class="_ _2"></span>annul <span class="_ _2"></span>and <span class="_ _2"></span>set <span
                                            class="_ _4"></span>aside <span class="_ _2"></span>the <span class="_ _2"></span>contract
                                </div>
                                <div class="t m0 x0 h17 y60 ff2 fs7 fc0 sc0 ls0 ws0">entered <span class="_ _2"></span>into <span
                                    class="_ _2"></span>with <span class="_ _2"></span>said <span class="_ _2"></span>Provider <span
                                        class="_ _4"></span>and <span class="_ _2"></span>make <span class="_ _2"></span>and <span
                                            class="_ _2"></span>enter <span class="_ _2"></span>into <span class="_ _2"></span>a <span
                                                class="_ _4"></span>new <span class="_ _2"></span>contract <span class="_ _2"></span>in <span
                                                    class="_ _2"></span>such <span class="_ _2"></span>manner <span class="_ _2"></span>as <span
                                                        class="_ _4"></span>seems <span class="_ _2"></span>to <span class="_ _2"></span>the <span
                                                            class="_ _2"></span>Board <span class="_ _2"></span>of <span class="_ _2"></span>Education <span
                                                                class="_ _2"></span>to <span class="_ _4"></span>be <span class="_ _2"></span>to <span
                                                                    class="_ _2"></span>the <span class="_ _2"></span>best <span class="_ _2"></span>advantage <span
                                                                        class="_ _2"></span>of <span class="_ _4"></span>the </div>
                                <div class="t m0 x0 h17 y61 ff2 fs7 fc0 sc0 ls0 ws0">District. Any failure <span class="_ _2"></span>for
                                    furnishing <span class="_ _2"></span>such articles or <span class="_ _2"></span>services by <span
                                        class="_ _2"></span>reason of the <span class="_ _2"></span>failure of <span
                                            class="_ _2"></span>the Provider as <span class="_ _2"></span>above stated, <span
                                                class="_ _2"></span>shall be a <span class="_ _2"></span>liability against the <span
                                                    class="_ _2"></span>Provider and </div>
                                <div class="t m0 x0 h17 y62 ff2 fs7 fc0 sc0 ls0 ws0">his <span class="_ _4"></span>sureties. <span
                                    class="_ _4"></span>The <span class="_ _b"></span>Board <span class="_ _4"></span>of <span
                                        class="_ _4"></span>Education <span class="_ _4"></span>reserves <span class="_ _b"></span>the
                                    <span class="_ _4"></span>right <span class="_ _4"></span>to <span class="_ _4"></span>cancel <span
                                        class="_ _4"></span>any <span class="_ _b"></span>articles <span class="_ _4"></span>or <span
                                            class="_ _4"></span>services <span class="_ _4"></span>which <span class="_ _b"></span>the <span
                                                class="_ _4"></span>Provider <span class="_ _4"></span>may <span class="_ _4"></span>be <span
                                                    class="_ _b"></span>unable <span class="_ _4"></span>to <span class="_ _4"></span>furnish <span
                                                        class="_ _4"></span>because <span class="_ _b"></span>of <span class="_ _4"></span>economic
                                </div>
                                <div class="t m0 x0 h17 y63 ff2 fs7 fc0 sc0 ls0 ws0">conditions, <span class="_ _1"></span>governmental
                                    <span class="_ _2"></span>regulations or <span class="_ _7"></span>other <span
                                        class="_ _8"></span>similar <span class="_ _1"></span>causes <span class="_ _1"></span>beyond
                                    the <span class="_ _8"></span>control <span class="_ _1"></span>of <span class="_ _1"></span>the
                                    <span class="_ _8"></span>Provider <span class="_ _1"></span>provided satisfactory <span
                                        class="_ _8"></span>proof <span class="_ _8"></span>is <span class="_ _7"></span>furnished to
                                    <span class="_ _7"></span>the <span class="_ _8"></span>Board <span class="_ _8"></span>of <span
                                        class="_ _8"></span>Education, </div>
                                <div class="t m0 x0 h17 y64 ff2 fs7 fc0 sc0 ls0 ws0">if requested.</div>
                                <div class="t m1 x0 h17 y65 ff2 fs7 fc0 sc0 ls0 ws0">6.</div>
                                <div class="t m0 x16 h17 y65 ff1 fs7 fc0 sc0 ls0 ws0">CONTRACT CHANGES. <span class="ff2">No changes or
                                    alterations to this contract shall be made without specific prior written approval by the <span
                                        class="_ _1"></span>Diswict.</span></div>
                                <div class="t m1 x0 h12 y66 ff2 fs6 fc0 sc0 ls0 ws0">7.<span class="_ _e"> </span><span
                                    class="ff1">SUBSTITUTIONS. <span class="_ _2"></span></span>No <span
                                        class="_ _2"></span>substitutions <span class="_ _4"></span>of <span
                                            class="_ _2"></span>materials <span class="_ _4"></span>or <span class="_ _2"></span>service
                                    <span class="_ _2"></span>from <span class="_ _4"></span>those <span class="_ _2"></span>specified
                                    <span class="_ _2"></span>in <span class="_ _4"></span>the <span class="_ _2"></span>Scope <span
                                        class="_ _2"></span>of <span class="_ _4"></span>Work <span class="_ _2"></span>shall <span
                                            class="_ _4"></span>be <span class="_ _2"></span>made <span class="_ _2"></span>without <span
                                                class="_ _4"></span>the <span class="_ _2"></span>prior <span class="_ _2"></span>written <span
                                                    class="_ _4"></span>approval <span class="_ _2"></span>of </div>
                                <div class="t m1 x0 h12 y67 ff2 fs6 fc0 sc0 ls0 ws0">the <span class="_ _2"></span>District.</div>
                                <div class="t m1 x0 h17 y68 ff2 fs7 fc0 sc0 ls0 ws0">8.</div>
                                <div class="t m0 x16 h17 y68 ff1 fs7 fc0 sc0 ls0 ws0">ACCESS TO WORK. <span class="ff2">District
                                    representatives shall at all times have access to work wherever it is in preparation or <span
                                        class="_ _4"></span>progress.</span></div>
                                <div class="t m1 x0 h17 y69 ff2 fs7 fc0 sc0 ls0 ws0">9.</div>
                                <div class="t m0 x16 h17 y69 ff1 fs7 fc0 sc0 ls0 ws0">PROTECTION <span class="_ _2"></span>OF <span
                                    class="_ _4"></span>WORK <span class="_ _4"></span>AND <span class="_ _2"></span>PROPERTY. <span
                                        class="_ _4"></span><span class="ff2">The <span class="_ _2"></span>Provider <span
                                            class="_ _4"></span>shall <span class="_ _4"></span>maintain <span class="_ _2"></span>at
                                        <span class="_ _4"></span>all <span class="_ _4"></span>times, <span class="_ _2"></span>as
                                        <span class="_ _4"></span>required <span class="_ _2"></span>by <span
                                            class="_ _4"></span>conditions <span class="_ _4"></span>and <span
                                                class="_ _2"></span>progress <span class="_ _4"></span>of <span class="_ _4"></span>work,
                                        <span class="_ _2"></span>all <span class="_ _4"></span>necessary </span></div>
                                <div class="t m0 x0 h17 y6a ff2 fs7 fc0 sc0 ls0 ws0">safeguards <span class="_ _b"></span>for <span
                                    class="_ _b"></span>the <span class="_ _b"></span>protection <span class="_ _4"></span>of <span
                                        class="_ _b"> </span>employees <span class="_ _b"> </span>and <span class="_ _b"> </span>the
                                    <span class="_ _b"> </span>public. <span class="_ _b"> </span>In <span class="_ _b"> </span>an <span
                                        class="_ _b"> </span>emergency <span class="_ _b"></span>affecting <span
                                            class="_ _b"></span>life <span class="_ _b"></span>and <span class="_ _b"></span>safety <span
                                                class="_ _b"></span>of <span class="_ _4"></span>life <span class="_ _b"> </span>or <span
                                                    class="_ _b"> </span>of <span class="_ _b"> </span>work <span class="_ _b"> </span>or <span
                                                        class="_ _b"> </span>of <span class="_ _b"> </span>adjoining <span class="_ _b"> </span>propeuy,
                                    <span class="_ _b"> </span>Provider, </div>
                                <div class="t m0 x0 h17 y6b ff2 fs7 fc0 sc0 ls0 ws0">without special instruction or authorization from
                                    Diswict, is permitted to act at his discretion to prevent such threatened loss or <span
                                        class="_ _2"></span>injury.</div>
                                <div class="t m1 x0 h17 y6c ff2 fs7 fc0 sc0 ls0 ws0">10.</div>
                                <div class="t m0 x2b h17 y6c ff1 fs7 fc0 sc0 ls0 ws0">ASSIGNMENT OF CONTRACT <span
                                    class="_ _2"></span>AND PUCHASE ORDER. <span class="_ _2"></span><span class="ff2">The Provider
                                        shall <span class="_ _2"></span>not assign or <span class="_ _2"></span>transfer by operation
                                        <span class="_ _2"></span>of law or <span class="_ _2"></span>otherwise any or all <span
                                            class="_ _2"></span>of its </span></div>
                                <div class="t m0 x0 h17 y6d ff2 fs7 fc0 sc0 ls0 ws0">rights, burdens, duties, or obligations under this
                                    contract without the prior written consent of the <span class="_ _5"> </span>District.</div>
                                <div class="t m0 x0 h17 y6e ff2 fs7 fc0 sc0 ls0 ws0">I <span class="_ _2"></span>l. <span
                                    class="ff1">FORCE <span class="_ _2"></span>MAJEURE <span class="_ _2"></span>CLAUSE. <span
                                        class="_ _2"></span></span>The <span class="_ _2"></span>parties <span
                                            class="_ _2"></span>to <span class="_ _2"></span>the <span class="_ _2"></span>Contract <span
                                                class="_ _2"></span>shall be <span class="_ _2"></span>excused <span class="_ _2"></span>from
                                    <span class="_ _2"></span>performance <span class="_ _2"></span>thereunder <span
                                        class="_ _2"></span>during <span class="_ _2"></span>the <span class="_ _2"></span>time <span
                                            class="_ _2"></span>and to <span class="_ _2"></span>the <span class="_ _2"></span>extent <span
                                                class="_ _2"></span>that <span class="_ _2"></span>they <span class="_ _2"></span>are </div>
                                <div class="t m0 x0 h17 y6f ff2 fs7 fc0 sc0 ls0 ws0">prevented <span class="_ _5"> </span>from <span
                                    class="_ _5"> </span>obtaining, <span class="_ _5"> </span>delivering, <span class="_ _5">
                                    </span>or <span class="_ _5"> </span>performing <span class="_ _5"> </span>by <span class="_ _5">
                                    </span>act <span class="_ _5"> </span>of <span class="_ _5"> </span>God, <span class="_ _f">
                                    </span>fire, <span class="_ _5"> </span>strike, <span class="_ _5"> </span>loss, <span class="_ _5">
                                    </span>or <span class="_ _5"> </span>shouage <span class="_ _5"> </span>of <span class="_ _5">
                                    </span>wanspouation <span class="_ _5"> </span>facilities, <span class="_ _5"> </span>lock-out <span
                                        class="_ _5"> </span>commandeering <span class="_ _5"> </span>of </div>
                                <div class="t m0 x0 h17 y70 ff2 fs7 fc0 sc0 ls0 ws0">materials, products, plants or <span
                                    class="_ _7"></span>facilities by the <span class="_ _1"></span>government when satisfactory
                                    evidence thereof is <span class="_ _1"></span>presented <span class="_ _2"></span>to the other <span
                                        class="_ _1"></span>party(ies), <span class="_ _b"> </span>provided that <span
                                            class="_ _1"></span>it <span class="_ _8"></span>is <span class="_ _1"></span>satisfactorily
                                </div>
                                <div class="t m0 x0 h17 y71 ff2 fs7 fc0 sc0 ls0 ws0">established that the non-performance is not due to
                                    the fault or neglect of the party not <span class="_ _4"></span>performing.</div>
                                <div class="t m6 x0 h17 y72 ff2 fs7 fc0 sc0 ls0 ws0">12.</div>
                                <div class="t m0 x2b h17 y72 ff1 fs7 fc0 sc0 ls0 ws0">HOLD <span class="_ _4"></span>HARMLESS <span
                                    class="_ _b"> </span>AGREEMENT. <span class="_ _b"></span><span class="ff2">The <span
                                        class="_ _4"></span>Provider <span class="_ _b"></span>shall <span class="_ _4"></span>save,
                                        <span class="_ _b"></span>defend, <span class="_ _4"></span>hold <span class="_ _b">
                                        </span>harmless <span class="_ _b"></span>and <span class="_ _4"></span>indemnify <span
                                            class="_ _b"></span>the <span class="_ _4"></span>District <span class="_ _b"> </span>from
                                        <span class="_ _b"></span>and <span class="_ _4"></span>against <span class="_ _b"></span>any
                                        <span class="_ _4"></span>and <span class="_ _b"></span>all <span class="_ _4"></span>losses,
                                    </span></div>
                                <div class="t m0 x0 h17 y73 ff2 fs7 fc0 sc0 ls0 ws0">damages, <span class="_ _2"></span>liabilities,
                                    claims, <span class="_ _2"></span>and <span class="_ _2"></span>costs <span class="_ _2"></span>of
                                    <span class="_ _2"></span>whatsoever <span class="_ _2"></span>kind <span class="_ _2"></span> and
                                    <span class="_ _2"></span> <span class="_ _2"></span>nature <span class="_ _2"></span>for <span
                                        class="_ _2"></span>injury <span class="_ _2"></span> <span class="_ _2"></span>to <span
                                            class="_ _2"></span>or death <span class="_ _2"></span>of <span class="_ _2"></span>any <span
                                                class="_ _2"></span>person <span class="_ _2"></span> <span class="_ _2"></span>and <span
                                                    class="_ _2"></span>for <span class="_ _2"></span>loss or <span class="_ _2"></span>damage <span
                                                        class="_ _2"></span> <span class="_ _2"></span>to <span class="_ _2"></span>any <span
                                                            class="_ _2"></span>property <span class="_ _2"></span>occurring </div>
                                <div class="t m0 x0 h17 y74 ff2 fs7 fc0 sc0 ls0 ws0">in connection <span class="_ _2"></span>with <span
                                    class="_ _2"></span>or in <span class="_ _2"></span>any <span class="_ _2"></span>way incident
                                    <span class="_ _2"></span>to <span class="_ _2"></span>or arising <span class="_ _2"></span>out
                                    <span class="_ _2"></span>of <span class="_ _2"></span>the occupancy, <span class="_ _2"></span>use,
                                    <span class="_ _2"></span>service, operations, <span class="_ _2"></span>or <span
                                        class="_ _2"></span>performance of <span class="_ _2"></span>work <span class="_ _2"></span>on
                                    the <span class="_ _2"></span>property <span class="_ _2"></span>under the <span
                                        class="_ _2"></span>terms </div>
                                <div class="t m0 x0 h17 y75 ff2 fs7 fc0 sc0 ls0 ws0">of this contract, resulting in whole or <span
                                    class="_ _2"></span>in pan<span class="_ _10"> </span>negligent acts or <span
                                        class="_ _7"></span>omissions <span class="_ _4"></span>of the <span
                                            class="_ _1"></span>Provider, any subproviders, <span class="_ _2"></span>or <span
                                                class="_ _2"></span>any employee, agent <span class="_ _8"></span>or <span
                                                    class="_ _1"></span>representative <span class="_ _1"></span>of </div>
                                <div class="t m0 x0 h17 y76 ff2 fs7 fc0 sc0 ls0 ws0">Provider and/or its subproviders.</div>
                                <div class="t m6 x0 h17 y77 ff2 fs7 fc0 sc0 ls0 ws0">13.</div>
                                <div class="t m0 x2b h17 y77 ff1 fs7 fc0 sc0 ls0 ws0">PAYMENT. <span class="ff2">Unless otherwise <span
                                    class="_ _11"> </span>specified, the Provider <span class="_ _11"> </span>shall render
                                    invoices <span class="_ _11"> </span>in triplicate for <span class="_ _11"> </span>materials
                                    delivered or <span class="_ _11"> </span>services performed under <span class="_ _11">
                                    </span>the </span></div>
                                <div class="t m0 x0 h17 y78 ff2 fs7 fc0 sc0 ls0 ws0">ContracfPurchase<span class="_ _12"> </span>The
                                    <span class="_ _2"></span>District <span class="_ _4"></span>shall <span class="_ _4"></span>make
                                    <span class="_ _2"></span>payment <span class="_ _4"></span>for <span class="_ _2"></span>materials,
                                    <span class="_ _4"></span>supplies <span class="_ _4"></span>or <span class="_ _2"></span>other
                                    <span class="_ _4"></span>services <span class="_ _4"></span>furnished <span
                                        class="_ _2"></span>under <span class="_ _4"></span>this <span class="_ _2"></span>Contract
                                    <span class="_ _4"></span>as <span class="_ _4"></span>agreed <span class="_ _2"></span>within <span
                                        class="_ _4"></span>thirty <span class="_ _4"></span>(30) </div>
                                <div class="t m0 x0 h17 y79 ff2 fs7 fc0 sc0 ls0 ws0">days after delivery to <span
                                    class="_ _2"></span>and approval by the authorized <span class="_ _2"></span>District
                                    representative of all invoices <span class="_ _2"></span>and other documentary evidence reasonably
                                    <span class="_ _2"></span>required by the District </div>
                                <div class="t m0 x0 h17 y7a ff2 fs7 fc0 sc0 ls0 ws0">(which approval shall not be unreasonably <span
                                    class="_ _5"> </span>withheld).</div>
                                <div class="t m6 x0 h17 y7b ff2 fs7 fc0 sc0 ls0 ws0">14.</div>
                                <div class="t m0 x2b h17 y7b ff1 fs7 fc0 sc0 ls0 ws0">PERAI <span class="_ _b"></span>TS <span
                                    class="_ _8"></span>AND LICENSES. <span class="ff2">The <span class="_ _1"></span>Provider <span
                                        class="_ _8"></span>shall secure <span class="_ _8"></span>and maintain in <span
                                            class="_ _8"></span>force, <span class="_ _1"></span>at <span
                                                class="_ _8"></span>Provider&apos;s sole <span class="_ _1"></span>cost <span
                                                    class="_ _1"></span>and <span class="_ _8"></span>expense, such <span
                                                        class="_ _1"></span>licenses <span class="_ _1"></span>and <span class="_ _1"></span>permits
                                        <span class="_ _1"></span>as are <span class="_ _1"></span>required </span></div>
                                <div class="t m0 x0 h17 y7c ff2 fs7 fc0 sc0 ls0 ws0">by law, in connection with the furnishing of
                                    services, materials, or supplies herein <span class="_ _7"></span>listed.</div>
                                <div class="t m6 x0 h17 y7d ff2 fs7 fc0 sc0 ls0 ws0">15.</div>
                                <div class="t m0 x2b h17 y7d ff1 fs7 fc0 sc0 ls0 ws0">PROVIDER <span class="_ _2"></span>NOT <span
                                    class="_ _2"></span>OFFICER, <span class="_ _2"></span>EMPLOYEE, <span class="_ _4"></span>OR
                                    <span class="_ _2"></span>AGENT <span class="_ _2"></span>OF <span class="_ _2"></span>DISTRICT.
                                    <span class="_ _2"></span><span class="ff2">While <span class="_ _4"></span>engaged <span
                                        class="_ _2"></span>in <span class="_ _2"></span>carrying <span class="_ _2"></span>out
                                        <span class="_ _2"></span>other <span class="_ _4"></span>terms <span class="_ _2"></span>and
                                        <span class="_ _2"></span>conditions <span class="_ _2"></span>of <span class="_ _2"></span>the
                                        <span class="_ _4"></span>purchase </span></div>
                                <div class="t m0 x0 h17 y7e ff2 fs7 fc0 sc0 ls0 ws0">order, the Provider is an independent Provider, and
                                    not an officer, employee, agent, pauner, or joint venture of <span class="_ _2"></span>the District.
                                </div>
                                <div class="t m6 x0 h17 y7f ff2 fs7 fc0 sc0 ls0 ws0">16.</div>
                                <div class="t m0 x2b h17 y7f ff1 fs7 fc0 sc0 ls0 ws0">ANTI-DISCRIMINATION. <span
                                    class="_ _2"></span><span class="ff2">Pursuant <span class="_ _2"></span>to <span
                                        class="_ _2"></span>Board <span class="_ _2"></span>Policy <span class="_ _2"></span>4030,
                                        <span class="_ _2"></span>Glendale <span class="_ _2"></span>Unified <span
                                            class="_ _2"></span>School <span class="_ _2"></span>Diswict <span
                                                class="_ _4"></span>prohibits <span class="_ _2"></span>discrimination <span
                                                    class="_ _2"></span>and/or <span class="_ _2"></span>harassment <span class="_ _2"></span>of
                                        <span class="_ _2"></span>any <span class="_ _2"></span>person </span></div>
                                <div class="t m0 x0 h17 y80 ff2 fs7 fc0 sc0 ls0 ws0">based <span class="_ _5"> </span>on <span
                                    class="_ _f"> </span>race, <span class="_ _f"> </span>color, <span class="_ _f"> </span>national
                                    <span class="_ _f"> </span>origin, <span class="_ _5"> </span>ancestry, re<span
                                        class="_ _1"></span>ligious <span class="_ _f"> </span>creed, <span class="_ _f"> </span>age,
                                    <span class="_ _f"> </span>marital <span class="_ _f"> </span>status, <span class="_ _5">
                                    </span>pregnancy, <span class="_ _f"> </span>physical <span class="_ _f"> </span>or <span
                                        class="_ _f"> </span>mental <span class="_ _f"> </span>disability, <span class="_ _5">
                                    </span>medical <span class="_ _f"> </span>condition, <span class="_ _f"> </span>genetic </div>
                                <div class="t m0 x0 h17 y81 ff2 fs7 fc0 sc0 ls0 ws0">information, veteran <span
                                    class="_ _2"></span>status, gender, <span class="_ _2"></span>gender identity, <span
                                        class="_ _2"></span>gender expression, <span class="_ _2"></span>sex or <span
                                            class="_ _2"></span>sexual orientation. <span class="_ _2"></span>Therefore, the <span
                                                class="_ _2"></span>Provider <span class="_ _2"></span>agrees to <span
                                                    class="_ _2"></span>comply with <span class="_ _2"></span>the applicable </div>
                                <div class="t m0 x0 h17 y82 ff2 fs7 fc0 sc0 ls0 ws0">Federal and <span class="_ _2"></span>California
                                    <span class="_ _2"></span>Laws, including, <span class="_ _2"></span>but not <span
                                        class="_ _2"></span>limited <span class="_ _2"></span>to, the <span
                                            class="_ _2"></span>California Fair <span class="_ _2"></span>Employment <span
                                                class="_ _2"></span>Practice Act, <span class="_ _2"></span>beginning with <span
                                                    class="_ _2"></span>Labor <span class="_ _2"></span>Code, Section <span class="_ _2"></span>1410
                                    <span class="_ _2"></span>and Labor </div>
                                <div class="t m0 x0 h17 y83 ff2 fs7 fc0 sc0 ls0 ws0">Code, Section 1735. In addition, the Provider
                                    agrees to require such compliance by all subproviders employed on the Contract by <span
                                        class="_ _5"> </span>him.</div>
                                <div class="t m6 x0 h17 y84 ff2 fs7 fc0 sc0 ls0 ws0">17.</div>
                                <div class="t m0 x2b h17 y84 ff1 fs7 fc0 sc0 ls0 ws0">PROVIDER&apos;S <span class="_ _5">
                                </span>INSURANCE. <span class="_ _5"> </span><span class="ff2">The <span class="_ _f">
                                </span>Provider <span class="_ _5"> </span>shall <span class="_ _f"> </span>not <span
                                    class="_ _5"> </span>commence <span class="_ _5"> </span>work <span class="_ _f">
                                        </span>under <span class="_ _5"> </span>this <span class="_ _f"> </span>Contract <span
                                            class="_ _5"> </span>until <span class="_ _5"> </span>he <span class="_ _f"> </span>has
                                        <span class="_ _5"> </span>obtained <span class="_ _f"> </span>the <span class="_ _5">
                                        </span>insurance <span class="_ _5"> </span>required <span class="_ _f"> </span>under <span
                                            class="_ _5"> </span>this </span></div>
                                <div class="t m0 x0 h17 y85 ff2 fs7 fc0 sc0 ls0 ws0">paragraph <span class="_ _4"></span>and <span
                                    class="_ _2"></span>satisfactory <span class="_ _4"></span>proof <span class="_ _4"></span>of
                                    <span class="_ _4"></span>such <span class="_ _4"></span>insurance <span class="_ _4"></span>has
                                    <span class="_ _2"></span>been <span class="_ _4"></span>submitted <span class="_ _4"></span>to
                                    <span class="_ _4"></span>Diswict <span class="_ _4"></span>and <span class="_ _4"></span>said <span
                                        class="_ _2"></span>insurance <span class="_ _4"></span>has <span class="_ _4"></span>been <span
                                            class="_ _4"></span>approved <span class="_ _4"></span>by <span class="_ _4"></span>the <span
                                                class="_ _4"></span>District. <span class="_ _2"></span>Except <span class="_ _4"></span>for
                                    <span class="_ _4"></span>worker&apos;s </div>
                                <div class="t m0 x0 h17 y86 ff2 fs7 fc0 sc0 ls0 ws0">compensation <span class="_ _b"> </span>insurance,
                                    <span class="_ _5"> </span>the <span class="_ _b"> </span>policy <span class="_ _5"> </span>shall
                                    <span class="_ _b"> </span>not <span class="_ _5"> </span>be <span class="_ _b"> </span>amended
                                    <span class="_ _5"> </span>or <span class="_ _b"> </span>modified <span class="_ _5"> </span>and
                                    <span class="_ _b"> </span>the <span class="_ _5"> </span>coverage <span class="_ _b">
                                    </span>amounts <span class="_ _5"> </span>shall <span class="_ _b"> </span>not <span class="_ _5">
                                    </span>be <span class="_ _b"> </span>reduced <span class="_ _5"> </span>without <span
                                        class="_ _b"></span>the <span class="_ _5"> </span>District&apos;s <span
                                            class="_ _b"></span>prior <span class="_ _b"> </span>written </div>
                                <div class="t m0 x0 h17 y87 ff2 fs7 fc0 sc0 ls0 ws0">consent, <span class="_ _4"></span>and, <span
                                    class="_ _4"></span>the <span class="_ _4"></span>District <span class="_ _4"></span>shall <span
                                        class="_ _4"></span>be <span class="_ _4"></span>named <span class="_ _4"></span>as <span
                                            class="_ _4"></span>an <span class="_ _4"></span>additional <span class="_ _4"></span>insured
                                    <span class="_ _4"></span>and <span class="_ _4"></span>be <span class="_ _4"></span>furnished <span
                                        class="_ _4"></span>thirty <span class="_ _4"></span>(30) <span class="_ _4"></span>days <span
                                            class="_ _4"></span>written <span class="_ _4"></span>notice <span class="_ _4"></span>prior
                                    <span class="_ _4"></span>to <span class="_ _4"></span>cancellation. <span class="_ _4"></span>In
                                    <span class="_ _4"></span>the <span class="_ _b"></span>event <span class="_ _2"></span>that <span
                                        class="_ _4"></span>the </div>
                                <div class="t m0 x0 h17 y88 ff2 fs7 fc0 sc0 ls0 ws0">insurance requirements cannot be met, please turn
                                    in a signed &quot;Hold Harmless and Indemnification Agreement.&quot;</div>
                                <div class="t m1 x14 h5 y89 ff2 fs2 fc0 sc0 ls0 ws0">Page 3 of 4</div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                        <div id="pf4" class="pf w0 h0" data-page-no="4">
                            <div class="pc pc4 w0 h0"><img class="bi x0 y8a w12 h18" alt="" src={bg4} />
                                <div class="t m6 x2c h17 y8b ff2 fs7 fc0 sc0 ls0 ws0">a)</div>
                                <div class="t m0 x2d h17 y8b ff1 fs7 fc0 sc0 ls0 ws0">PROVIDER&apos;S <span class="_ _2"></span>PUBLIC
                                    <span class="_ _4"></span>LIABILITY <span class="_ _4"></span>AND <span class="_ _2"></span>PROPERTY
                                    <span class="_ _4"></span>DAMAGE <span class="_ _2"></span>INSUR<span class="_ _2"></span>ANCE.
                                    <span class="_ _2"></span><span class="ff2">The <span class="_ _4"></span>Provider <span
                                        class="_ _2"></span>shall <span class="_ _4"></span>procure <span class="_ _4"></span>and
                                        <span class="_ _2"></span>shall <span class="_ _4"></span>maintain <span
                                            class="_ _2"></span>during <span class="_ _4"></span>the <span class="_ _4"></span>life
                                    </span></div>
                                <div class="t m0 x7 h17 y8c ff2 fs7 fc0 sc0 ls0 ws0">of <span class="_ _1"></span>his <span
                                    class="_ _8"></span>contract, Provider&apos;s <span class="_ _1"></span>Public Liability <span
                                        class="_ _8"></span>Insurance <span class="_ _1"></span>in <span class="_ _1"></span>an <span
                                            class="_ _1"></span>amount <span class="_ _1"></span>not <span class="_ _8"></span>less <span
                                                class="_ _1"></span>than <span class="_ _1"></span>$1,000,000 for <span
                                                    class="_ _7"></span>injuries, including <span class="_ _8"></span>accidental death to <span
                                                        class="_ _7"></span>any <span class="_ _8"></span>one person, and <span
                                                            class="_ _1"></span>subject </div>
                                <div class="t m0 x7 h17 y8d ff2 fs7 fc0 sc0 ls0 ws0">to <span class="_ _2"></span>the <span
                                    class="_ _2"></span>limit <span class="_ _2"></span>for <span class="_ _2"></span>each <span
                                        class="_ _4"></span>person, <span class="_ _2"></span>in <span class="_ _2"></span>an <span
                                            class="_ _2"></span>amount <span class="_ _2"></span>not <span class="_ _4"></span>less <span
                                                class="_ _2"></span>than <span class="_ _2"></span>$1,000,000 <span class="_ _2"></span>on <span
                                                    class="_ _2"></span>account <span class="_ _4"></span>of <span class="_ _2"></span>one <span
                                                        class="_ _2"></span>accident, <span class="_ _2"></span>and <span
                                                            class="_ _2"></span>Provider&apos;s <span class="_ _4"></span>Property <span
                                                                class="_ _2"></span>Damage <span class="_ _2"></span>Insurance <span class="_ _2"></span>in
                                    <span class="_ _2"></span>an <span class="_ _4"></span>amount <span class="_ _2"></span>not </div>
                                <div class="t m0 x7 h17 y8e ff2 fs7 fc0 sc0 ls0 ws0">less than <span class="_ _2"></span>$1,000,000.
                                </div>
                                <div class="t m6 x7 h17 y8f ff2 fs7 fc0 sc0 ls0 ws0">18.</div>
                                <div class="t m0 x2c h17 y8f ff1 fs7 fc0 sc0 ls0 ws0">COMPLIANCE <span class="_ _2"></span>WITH <span
                                    class="_ _2"></span>LAWS. <span class="ff2">P<span class="_ _2"></span>rovider shall <span
                                        class="_ _2"></span>give <span class="_ _2"></span>all <span class="_ _2"></span>notices
                                        <span class="_ _2"></span>and <span class="_ _2"></span>comply <span class="_ _2"></span>with
                                        <span class="_ _2"></span>all <span class="_ _2"></span>laws, <span
                                            class="_ _2"></span>ordinances, <span class="_ _2"></span>rules <span
                                                class="_ _2"></span>and <span class="_ _2"></span>regulations bearing <span
                                                    class="_ _2"></span>on <span class="_ _2"></span>conduct <span class="_ _2"></span>or <span
                                                        class="_ _2"></span>work </span></div>
                                <div class="t m0 x7 h17 y90 ff2 fs7 fc0 sc0 ls0 ws0">as <span class="_ _1"></span>indicated <span
                                    class="_ _2"></span>or <span class="_ _1"></span>specified. <span class="_ _2"></span>If
                                    Provider observes <span class="_ _2"></span>that any <span class="_ _1"></span>of the work required
                                    by this contract is at <span class="_ _8"></span>variance <span class="_ _2"></span>with any <span
                                        class="_ _1"></span>such laws, ordinances, <span class="_ _4"></span>rules or regulations,
                                </div>
                                <div class="t m0 x7 h17 y91 ff2 fs7 fc0 sc0 ls0 ws0">Provider shall notify the District, <span
                                    class="_ _2"></span>in writing, and, at <span class="_ _1"></span>the sole option of the
                                    District, <span class="_ _2"></span>any necessary changes <span class="_ _2"></span>to the <span
                                        class="_ _1"></span>scope <span class="_ _2"></span>of <span class="_ _1"></span>work <span
                                            class="_ _2"></span>shall be <span class="_ _1"></span>made and this Contract </div>
                                <div class="t m0 x7 h17 y92 ff2 fs7 fc0 sc0 ls0 ws0">shall <span class="_ _b"> </span>be <span
                                    class="_ _b"> </span>appropriately <span class="_ _b"> </span>amended <span class="_ _5">
                                    </span>in <span class="_ _4"></span>writing, <span class="_ _b"> </span>or <span class="_ _5">
                                    </span>this <span class="_ _4"></span>Contract <span class="_ _5"> </span>shall <span
                                        class="_ _4"></span>be <span class="_ _5"> </span>terminated <span class="_ _4"></span>effective
                                    <span class="_ _5"> </span>upon <span class="_ _4"></span>Provider&apos;s <span class="_ _b">
                                    </span>receipt <span class="_ _5"> </span>of <span class="_ _4"></span>a <span class="_ _5">
                                    </span>written <span class="_ _4"></span>termination <span class="_ _5"> </span>notice <span
                                        class="_ _4"></span>from <span class="_ _b"> </span>the </div>
                                <div class="t m0 x7 h17 y93 ff2 fs7 fc0 sc0 ls0 ws0">District. <span class="_ _b"></span>If <span
                                    class="_ _b"></span>Provider <span class="_ _b"></span>performs <span class="_ _b"></span>any
                                    <span class="_ _b"></span>work <span class="_ _b"></span>knowing <span class="_ _b"></span>it <span
                                        class="_ _b"></span>to <span class="_ _b"></span>be <span class="_ _b"></span>in <span
                                            class="_ _b"></span>violation <span class="_ _b"></span> <span class="_ _b"></span>of <span
                                                class="_ _b"></span> <span class="_ _b"></span>such <span class="_ _b"></span> <span
                                                    class="_ _b"></span>laws, <span class="_ _b"></span> <span class="_ _b"></span>ordinances, <span
                                                        class="_ _4"></span> <span class="_ _b"> </span>rules <span class="_ _b"> </span> <span
                                                            class="_ _b"> </span>or <span class="_ _b"> </span> <span class="_ _b"> </span>regulations,
                                    <span class="_ _b"> </span>and <span class="_ _b"> </span>without <span class="_ _b"> </span>first
                                    <span class="_ _b"> </span>notifying <span class="_ _b"> </span>the </div>
                                <div class="t m0 x7 h17 y94 ff2 fs7 fc0 sc0 ls0 ws0">District of such violation, Provider shall bear all
                                    costs arising <span class="_ _5"> </span>therefrom.</div>
                                <div class="t m6 x7 h17 y95 ff2 fs7 fc0 sc0 ls0 ws0">19.</div>
                                <div class="t m0 x2c h17 y95 ff1 fs7 fc0 sc0 ls0 ws0">TIME IS OF THE ESSENCE. <span class="ff2">Time is
                                    of the essence in the performance of and compliance with each of the provisions and conditions
                                    of this <span class="_ _5"> </span>contract.</span></div>
                                <div class="t m6 x7 h17 y96 ff2 fs7 fc0 sc0 ls0 ws0">20.</div>
                                <div class="t m0 x2c h17 y96 ff1 fs7 fc0 sc0 ls0 ws0">GOVERNING LAW. <span class="ff2">This contract
                                    shall be governed by and construed in accordance with the laws of the State of <span
                                        class="_ _4"></span>California.</span></div>
                                <div class="t m6 x7 h17 y97 ff2 fs7 fc0 sc0 ls0 ws0">21.</div>
                                <div class="t m0 x2e h17 y97 ff1 fs7 fc0 sc0 ls0 ws0">ATTORNEYS&apos; <span class="_ _2"></span>FEES.
                                    <span class="_ _4"></span><span class="ff2">If <span class="_ _4"></span>any <span
                                        class="_ _4"></span>action <span class="_ _4"></span>is <span class="_ _2"></span>brought
                                        <span class="_ _4"></span>by <span class="_ _4"></span>either <span class="_ _4"></span>pany
                                        <span class="_ _2"></span>against <span class="_ _4"></span>the <span class="_ _4"></span>other
                                        <span class="_ _4"></span>party <span class="_ _4"></span>hereunder, <span
                                            class="_ _2"></span>each <span class="_ _4"></span>party <span class="_ _4"></span>shall
                                        <span class="_ _4"></span>be <span class="_ _2"></span>responsible <span class="_ _4"></span>for
                                        <span class="_ _4"></span>its <span class="_ _4"></span>own <span class="_ _2"></span>expenses,
                                    </span></div>
                                <div class="t m0 x7 h17 y98 ff2 fs7 fc0 sc0 ls0 ws0">including legal and accounting fees, in connection
                                    with the prosecution or defense of <span class="_ _b"></span>such action.</div>
                                <div class="t m6 x7 h12 y99 ff2 fs6 fc0 sc0 ls0 ws0">22.</div>
                                <div class="t m1 x2c h12 y99 ff2 fs6 fc0 sc0 ls0 ws0">NO <span class="_ _5"> </span>ORAL <span
                                    class="_ _5"> </span>MODIFICATION. <span class="_ _5"> </span>Any <span class="_ _5">
                                    </span>waiver, <span class="_ _5"> </span>amendment, <span class="_ _b"> </span>modification, <span
                                        class="_ _5"> </span>consent <span class="_ _5"> </span>or <span class="_ _5">
                                    </span>acquiescence <span class="_ _5"> </span>with <span class="_ _5"> </span>respect <span
                                        class="_ _5"> </span>to <span class="_ _5"> </span>this <span class="_ _5"> </span>contract
                                    <span class="_ _b"> </span>or <span class="_ _5"> </span>any <span class="_ _5"> </span>provision
                                    <span class="_ _5"> </span>of <span class="_ _5"> </span>this </div>
                                <div class="t m1 x7 h12 y9a ff2 fs6 fc0 sc0 ls0 ws0">contract <span class="_ _4"></span>or <span
                                    class="_ _b"> </span>with <span class="_ _4"></span>respect <span class="_ _b"> </span>to <span
                                        class="_ _4"></span>any <span class="_ _b"></span>failure <span class="_ _4"></span>to <span
                                            class="_ _b"></span>perform <span class="_ _4"></span>in <span class="_ _b"></span>accordance
                                    <span class="_ _4"></span>therewith <span class="_ _b"></span>shall <span class="_ _4"></span>be
                                    <span class="_ _b"></span>set <span class="_ _4"></span>fouh <span class="_ _b"></span>in <span
                                        class="_ _4"></span>writing <span class="_ _b"></span>and <span class="_ _4"></span>duly <span
                                            class="_ _b"></span>executed <span class="_ _4"></span>by <span class="_ _b"></span>or <span
                                                class="_ _4"></span>on <span class="_ _b"></span>behalf <span class="_ _4"></span>of <span
                                                    class="_ _b"></span>the <span class="_ _4"></span>party <span class="_ _b"></span>to <span
                                                        class="_ _4"></span>be </div>
                                <div class="t m1 x7 h12 y9b ff2 fs6 fc0 sc0 ls0 ws0">bound <span class="_ _4"></span>thereby.</div>
                                <div class="t m6 x7 h17 y9c ff2 fs7 fc0 sc0 ls0 ws0">23.</div>
                                <div class="t m0 x2c h17 y9c ff1 fs7 fc0 sc0 ls0 ws0">PROVISIONS <span class="_ _b"> </span>REQUIRED
                                    <span class="_ _5"> </span>BY <span class="_ _b"></span>LAW <span class="_ _b"> </span>DEEMED <span
                                        class="_ _b"> </span>INSERTED. <span class="_ _5"> </span><span class="ff2">Each <span
                                            class="_ _b"></span>and <span class="_ _b"> </span>every <span class="_ _5">
                                        </span>provision <span class="_ _b"></span>of <span class="_ _b"> </span>law <span class="_ _5">
                                        </span>a<span class="_ _1"></span>nd <span class="_ _5"> </span>clause <span
                                            class="_ _b"></span>required <span class="_ _b"> </span>by <span class="_ _5"> </span>law
                                        <span class="_ _b"></span>to <span class="_ _b"> </span>be <span class="_ _b"> </span>inseued
                                        <span class="_ _5"> </span>in <span class="_ _b"></span>this </span></div>
                                <div class="t m0 x7 h17 y9d ff2 fs7 fc0 sc0 ls0 ws0">contract shall be deemed to be inseued herein and
                                    this contract shall be read and enforced as though it <span class="_ _5"> </span>were included
                                    herein.</div>
                                <div class="t m6 x7 h17 y9e ff2 fs7 fc0 sc0 ls0 ws0">24.</div>
                                <div class="t m0 x2e h17 y9e ff1 fs7 fc0 sc0 ls0 ws0">FINGERPRINTING. <span class="ff2">The Provider
                                    shall be fingerprinted before commencing services of this Contract. The cost shall be covered by
                                    the <span class="_ _7"></span>District.</span></div>
                                <div class="t m6 x7 h17 y9f ff2 fs7 fc0 sc0 ls0 ws0">25.</div>
                                <div class="t m0 x2e h17 y9f ff1 fs7 fc0 sc0 ls0 ws0">TUBERCULOSIS <span class="_ _5"> </span>TESTING.
                                    <span class="_ _5"> </span><span class="ff2">Before <span class="_ _5"> </span>commencing <span
                                        class="_ _5"> </span>services, <span class="_ _5"> </span>Provider, <span class="_ _b">
                                        </span>if <span class="_ _5"> </span>working <span class="_ _5"> </span>with <span class="_ _5">
                                        </span>or <span class="_ _5"> </span>near <span class="_ _5"> </span>students, <span
                                            class="_ _5"> </span>shall <span class="_ _5"> </span>provide <span class="_ _5">
                                        </span>proof <span class="_ _5"> </span>of <span class="_ _5"> </span>Tuberculosis <span
                                            class="_ _5"> </span>(TB) </span></div>
                                <div class="t m0 x7 h17 ya0 ff2 fs7 fc0 sc0 ls0 ws0">testing at their own expense to the Human Resources
                                    <span class="_ _2"></span>Department. The TB test must have been conducted within the prior <span
                                        class="_ _8"></span>six months <span class="_ _2"></span>to the Contract effective </div>
                                <div class="t m0 x7 h17 ya1 ff2 fs7 fc0 sc0 ls0 ws0">date.</div>
                                <div class="t m6 x7 h12 ya2 ff2 fs6 fc0 sc0 ls0 ws0">26.</div>
                                <div class="t m1 x2e h12 ya2 ff2 fs6 fc1 sc0 ls0 ws0">COVID-19 <span class="_ _4"></span>VACCINATION
                                    <span class="_ _4"></span>STATUS. <span class="_ _b"> </span>Before <span
                                        class="_ _4"></span>commencing <span class="_ _4"></span>services, <span
                                            class="_ _b"></span>Provider, <span class="_ _4"></span>if <span class="_ _4"></span>working
                                    <span class="_ _b"></span>with <span class="_ _4"></span>or <span class="_ _4"></span>near <span
                                        class="_ _b"></span>students, <span class="_ _4"></span>shall <span class="_ _4"></span>provide
                                    <span class="_ _4"></span>proof <span class="_ _b"> </span>that <span class="_ _4"></span>they <span
                                        class="_ _4"></span>are <span class="_ _b"></span>fully </div>
                                <div class="t m1 x7 h12 ya3 ff2 fs6 fc1 sc0 ls0 ws0">vaccinated for COVID-19 within two weeks prior to
                                    starting to provide services at a District school site to the Human Resources <span
                                        class="_ _2"></span>Depaument.</div>
                                <div class="t m6 x7 h17 ya4 ff2 fs7 fc0 sc0 ls0 ws0">27.</div>
                                <div class="t m0 x2e h17 ya4 ff1 fs7 fc0 sc0 ls0 ws0">IF <span class="_ _4"></span>WORKING <span
                                    class="_ _b"> </span>WITH <span class="_ _b"></span>STUDENTS. <span class="_ _4"></span><span
                                        class="ff2">Any <span class="_ _b"> </span>Provider <span class="_ _b"></span>working <span
                                            class="_ _4"></span>with <span class="_ _b"> </span>a <span class="_ _b"></span>student(s)
                                        <span class="_ _4"></span>must <span class="_ _b"> </span>be <span
                                            class="_ _b"></span>supervised <span class="_ _4"></span>by <span class="_ _b"> </span>a
                                        <span class="_ _b"></span>credentialed <span class="_ _4"></span>person <span class="_ _b">
                                        </span>or <span class="_ _b"></span>must <span class="_ _4"></span>hold <span class="_ _b">
                                        </span>an <span class="_ _b"></span>Activity </span></div>
                                <div class="t m0 x7 h17 ya5 ff2 fs7 fc0 sc0 ls0 ws0">Supervisor Clearance Certificate issued through the
                                    California Commission on Teacher Credentialing <span class="_ _b"> </span>(CTC).</div>
                                <div class="t m6 x7 h17 ya6 ff2 fs7 fc0 sc0 ls0 ws0">28.</div>
                                <div class="t m0 x2e h17 ya6 ff1 fs7 fc0 sc0 ls0 ws0">TOBACCO/ALCOHOL/DRUG-FREE <span
                                    class="_ _b"></span>WORKPLACE. <span class="_ _b"></span><span class="ff2">Pursuant <span
                                        class="_ _b"></span>to <span class="_ _b"></span>Board <span class="_ _b"></span>Policies
                                        <span class="_ _b"></span>4020 <span class="_ _b"></span>and <span class="_ _b"></span>4021,
                                        <span class="_ _b"></span>Glendale <span class="_ _b"></span>Unified <span
                                            class="_ _b"></span>School <span class="_ _b"></span>District <span class="_ _b"></span>is
                                        <span class="_ _b"></span>a <span class="_ _b"></span>tobacco, </span></div>
                                <div class="t m0 x7 h17 ya7 ff2 fs7 fc0 sc0 ls0 ws0">alcohol, and <span class="_ _1"></span>drug-free
                                    <span class="_ _2"></span>district. The Provider <span class="_ _1"></span>shall not use or <span
                                        class="_ _7"></span>be under the influence <span class="_ _2"></span>of these substances while
                                    on District propeuy or <span class="_ _8"></span>during <span class="_ _b"> </span>the performance
                                    of </div>
                                <div class="t m0 x7 h17 ya8 ff2 fs7 fc0 sc0 ls0 ws0">the <span class="_ _1"></span>services of <span
                                    class="_ _1"></span>this Contract. <span class="_ _8"></span>Violation <span
                                        class="_ _2"></span>of this <span class="_ _8"></span>policy will <span
                                            class="_ _1"></span>result <span class="_ _1"></span>in <span class="_ _1"></span>immediate
                                    removal <span class="_ _2"></span>of the <span class="_ _1"></span>Provider <span
                                        class="_ _1"></span>from his <span class="_ _1"></span>or <span class="_ _1"></span>her <span
                                            class="_ _1"></span>duties <span class="_ _1"></span>and <span class="_ _2"></span>possible
                                    immediate <span class="_ _1"></span>termination </div>
                                <div class="t m0 x7 h17 ya9 ff2 fs7 fc0 sc0 ls0 ws0">of this Contract.</div>
                                <div class="t m6 x7 h17 yaa ff2 fs7 fc0 sc0 ls0 ws0">29.</div>
                                <div class="t m0 x2e h17 yaa ff1 fs7 fc0 sc0 ls0 ws0">GOVERNOR’S EXECUTIVE <span
                                    class="_ _2"></span>ORDER. <span class="_ _2"></span><span class="ff2">California Governor <span
                                        class="_ _2"></span>Newsom issued <span class="_ _2"></span>Order <span
                                            class="_ _2"></span>N-6-22 requiring <span class="_ _2"></span>compliance with <span
                                                class="_ _2"></span>the <span class="_ _2"></span>federal Economic <span
                                                    class="_ _2"></span>Sanction </span></div>
                                <div class="t m0 x7 h17 yab ff2 fs7 fc0 sc0 ls0 ws0">imposed in response to Russia </div>
                                <div class="t m0 x2f h19 yac ff2 fs8 fc0 sc0 ls0 ws0">5</div>
                                <div class="t m0 x25 h17 yab ff2 fs7 fc0 sc0 ls0 ws0"> s action in Ukraine. See attached <span
                                    class="_ _2"></span>Ceuification.</div>
                                <div class="t m0 x7 hc yad ff1 fs5 fc0 sc0 ls0 ws0">The undersigned <span class="ff2">Agrees as
                                    follows:</span></div>
                                <div class="t m0 x30 h1a yae ff1 fs7 fc0 sc0 ls0 ws0">SUPPLEMENTAL AGREEMENT</div>
                                <div class="t m1 x31 h1b yaf ff1 fs3 fc0 sc0 ls0 ws0">Specialized Services for Students and Families
                                </div>
                                <div class="t m0 x32 hc yad ff2 fs5 fc0 sc0 ls0 ws0">agency unless comparable services are not available
                                    elsewhere or </div>
                                <div class="t m0 x32 hc yb0 ff2 fs5 fc0 sc0 ls0 ws0">the family specifically requests services offered
                                    by clinician</div>
                                <div class="t m7 x7 h17 yb1 ff2 fs7 fc0 sc0 ls0 ws0">1.</div>
                                <div class="t m1 x2a h17 yb1 ff2 fs7 fc0 sc0 ls0 ws0">To cooperate with school personnel to ensure fair
                                    and <span class="_ _0"></span>equitable</div>
                                <div class="t m0 x7 hc yb2 ff2 fs5 fc0 sc0 ls0 ws0">availability of services to all families.</div>
                                <div class="t m7 x7 hc yb3 ff2 fs5 fc0 sc0 ls0 ws0">2.</div>
                                <div class="t m0 x2a hc yb3 ff2 fs5 fc0 sc0 ls0 ws0">To support District and school policies and
                                    standards.</div>
                                <div class="t m7 x7 h17 yb4 ff2 fs7 fc0 sc0 ls0 ws0">3.</div>
                                <div class="t m1 x2a h17 yb4 ff2 fs7 fc0 sc0 ls0 ws0">To work with groups of students and/or parents
                                    when possible <span class="_ _0"></span>to</div>
                                <div class="t m0 x32 h17 yb1 ff2 fs7 fc0 sc0 ls0 ws0">(which should be documented along with referrals
                                    to alternative</div>
                                <div class="t m0 x32 hc yb2 ff2 fs5 fc0 sc0 ls0 ws0">agencies).</div>
                                <div class="t m0 x32 hc yb3 ff2 fs5 fc0 sc0 ls0 ws0">5. To provide licensed personnel or
                                    fully-supervised interns for all </div>
                                <div class="t m0 x32 hc yb5 ff2 fs5 fc0 sc0 ls0 ws0">services.</div>
                                <div class="t m1 x7 h17 yb6 ff2 fs7 fc0 sc0 ls0 ws0">ensure that <span class="_ _8"></span>as many <span
                                    class="_ _1"></span>families are <span class="_ _1"></span>served as <span
                                        class="_ _1"></span>possible. <span class="_ _1"></span>Marital <span
                                            class="_ _2"></span>counseling<span class="_ _13"> </span>6. <span class="_ _1"></span>To <span
                                                class="_ _8"></span>maintain appropriate insurance as required <span class="_ _1"></span>by the
                                    <span class="_ _8"></span>District. </div>
                                <div class="t m1 x7 h17 yb7 ff2 fs7 fc0 sc0 ls0 ws0">is not an expected use of school-based clinical
                                    staff.</div>
                                <div class="t m8 x7 hc yb8 ff2 fs5 fc0 sc0 ls0 ws0">4.</div>
                                <div class="t m0 x2a hc yb8 ff2 fs5 fc0 sc0 ls0 ws0">To refer students and families in need of(in-depth,
                                    long-term) </div>
                                <div class="t m0 x7 hc yb9 ff2 fs5 fc0 sc0 ls0 ws0">specialized <span class="_ _7"></span>services <span
                                    class="_ _8"></span>to <span class="_ _0"></span>appropriate <span class="_ _8"></span>community
                                    <span class="_ _7"></span>agencies <span class="_ _8"></span>whenever </div>
                                <div class="t m0 x7 hc yba ff2 fs5 fc0 sc0 ls0 ws0">possible. It is inappropriate for a clinic to refer
                                    its own <span class="_ _0"></span>agency</div>
                                <div class="t m0 x33 hc ybb ff2 fs5 fc0 sc0 ls0 ws0">Signature<span class="_ _14"> </span><span
                                    class="fs7">Date</span></div>
                                <div class="t m0 x14 h5 ybc ff2 fs2 fc0 sc0 ls0 ws0">Page 4 of 4</div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>

                        <div id="pf5" class="pf w0 h0" data-page-no="5">
                            <div class="pc pc5 w0 h0"><img class="bi x34 ybd w13 h1c" alt="" src={bg5} />
                                <div class="t m1 x35 h1d ybe ff3 fs0 fc0 sc0 ls0 ws0">GlendaleUnifiedSchoolDistrict</div>
                                <div class="t m0 x36 h1e ybf ff3 fs6 fc0 sc0 ls0 ws0">Glendale, California</div>
                                <div class="t m0 x25 h1d yc0 ff3 fs0 fc0 sc0 ls0 ws0">HOLD HARMLESS AND INDEMNIFICATION AGREEMENT</div>
                                <div class="t m0 x34 h1d yc1 ff3 fs0 fc0 sc0 ls0 ws0">Provider <span class="_ _7"></span>agrees <span
                                    class="_ _0"></span>at <span class="_ _0"></span>all <span class="_ _15"></span>times <span
                                        class="_ _15"></span>to <span class="_ _15"></span>protect, <span class="_ _7"></span>indemnify,
                                    <span class="_ _7"></span>and <span class="_ _0"></span>hold <span class="_ _15"></span>the <span
                                        class="_ _15"></span>Glendale <span class="_ _0"></span>Unified <span
                                            class="_ _15"></span>School </div>
                                <div class="t m5 x34 h1d yc2 ff3 fs0 fc0 sc0 ls0 ws0">District, <span class="_ _15"></span>its <span
                                    class="_ _16"></span>Board <span class="_ _16"></span>of <span class="_ _16"></span>Trustees,
                                    <span class="_ _15"></span>officers, <span class="_ _0"></span>employees, <span
                                        class="_ _0"></span>members, <span class="_ _0"></span>representatives, <span
                                            class="_ _17"></span>agents, <span class="_ _15"></span>guests, </div>
                                <div class="t m0 x34 h1d yc3 ff3 fs0 fc0 sc0 ls0 ws0">invitee, <span class="_ _17"></span>and/or <span
                                    class="_ _16"></span>employees <span class="_ _16"></span>free <span class="_ _17"></span>and
                                    <span class="_ _17"></span>harmless, <span class="_ _16"></span>and <span class="_ _17"></span>to
                                    <span class="_ _17"></span>provide <span class="_ _17"></span>legal <span
                                        class="_ _17"></span>defense, <span class="_ _17"></span>from <span class="_ _16"></span>any
                                    <span class="_ _17"></span>and <span class="_ _17"></span>all </div>
                                <div class="t m5 x34 h1f yc4 ff3 fs9 fc0 sc0 ls0 ws0">liabilities, claims, losses, judgments, damage,
                                    demands or expenses resulting from the </div>
                                <div class="t m5 x34 h1d yc5 ff3 fs0 fc0 sc0 ls0 ws0">services provided by the Provider, Provider&apos;s
                                    use or occupancy of the District&apos;s facilities and </div>
                                <div class="t m0 x34 h1f yc6 ff3 fs9 fc0 sc0 ls0 ws0">premises <span class="_ _16"></span>[including
                                    <span class="_ _17"></span>travel <span class="_ _17"></span>to <span class="_ _17"></span>and <span
                                        class="_ _17"></span>from <span class="_ _17"></span>said <span class="_ _17"></span>facilities
                                    <span class="_ _17"></span>and <span class="_ _17"></span>premises] <span
                                        class="_ _15"></span>and/or <span class="_ _16"></span>the <span class="_ _17"></span>active
                                    <span class="_ _17"></span>or </div>
                                <div class="t m5 x34 h1d yc7 ff3 fs0 fc0 sc0 ls0 ws0">passive <span class="_ _0"></span>negligence <span
                                    class="_ _8"></span>of <span class="_ _15"></span>the <span class="_ _15"></span>Provide<span
                                        class="_ _2"></span>r <span class="_ _7"></span>or <span class="_ _0"></span>of <span
                                            class="_ _15"></span>the <span class="_ _15"></span>District, <span class="_ _7"></span>its
                                    <span class="_ _15"></span>Board <span class="_ _0"></span>of <span class="_ _0"></span>Trustees,
                                    <span class="_ _7"></span>officers, <span class="_ _7"></span>employees, </div>
                                <div class="t m5 x34 h1d yc8 ff3 fs0 fc0 sc0 ls0 ws0">members, representatives, agents, guests, invitee,
                                    and/or employees, specifically including, </div>
                                <div class="t m5 x34 h1d yc9 ff3 fs0 fc0 sc0 ls0 ws0">without limitation, any liability, claim, loss,
                                    judgment, damage, demand, or expense, arising </div>
                                <div class="t m0 x34 h1d yca ff3 fs0 fc0 sc0 ls0 ws0">by reason <span class="_ _2"></span>of:</div>
                                <div class="t m9 x37 h1f ycb ff3 fs9 fc0 sc0 ls0 ws0">1.</div>
                                <div class="t m0 x38 h1f ycb ff3 fs9 fc0 sc0 ls0 ws0">the <span class="_ _15"></span>loss <span
                                    class="_ _7"></span>of <span class="_ _8"></span>or <span class="_ _0"></span>damage <span
                                        class="_ _0"></span>to <span class="_ _0"></span>any <span class="_ _7"></span>of <span
                                            class="_ _0"></span>the <span class="_ _15"></span>District&apos;s <span
                                                class="_ _7"></span>facilities <span class="_ _1"></span>or <span class="_ _0"></span>premises
                                    <span class="_ _7"></span>includin<span class="_ _2"></span>g <span class="_ _0"></span>any</div>
                                <div class="t m0 x38 h1d ycc ff3 fs0 fc0 sc0 ls0 ws0">building, structure, or improvement thereon, or
                                    any equipment to be used therein;</div>
                                <div class="t m9 x37 h1d ycd ff3 fs0 fc0 sc0 ls0 ws0">2.</div>
                                <div class="t m0 x38 h1d ycd ff3 fs0 fc0 sc0 ls0 ws0">the injury to or death of any person including,
                                    but not limited to, the officers, </div>
                                <div class="t m5 x38 h1d yce ff3 fs0 fc0 sc0 ls0 ws0">members, <span class="_ _15"></span>employees,
                                    <span class="_ _0"></span>representatives, <span class="_ _16"></span>agents, <span
                                        class="_ _15"></span>guests, <span class="_ _15"></span>invitee, <span
                                            class="_ _15"></span>and/or <span class="_ _15"></span>employees <span class="_ _15"></span>of
                                </div>
                                <div class="t m0 x38 h1f ycf ff3 fs9 fc0 sc0 ls0 ws0">the Provider or of the District; <span
                                    class="_ _0"></span>or</div>
                                <div class="t m9 x37 h1f yd0 ff3 fs9 fc0 sc0 ls0 ws0">3.</div>
                                <div class="t m5 x38 h1f yd0 ff3 fs9 fc0 sc0 ls0 ws0">damage <span class="_ _0"></span>to <span
                                    class="_ _7"></span>any <span class="_ _7"></span>property <span class="_ _1"></span>arising
                                    <span class="_ _0"></span>from <span class="_ _7"></span>the <span class="_ _7"></span>use, <span
                                        class="_ _7"></span>possession, <span class="_ _1"></span>selection, <span
                                            class="_ _1"></span>delivery, return,</div>
                                <div class="t m0 x38 h1d yd1 ff3 fs0 fc0 sc0 ls0 ws0">condition or operation of the District&apos;s
                                    facilities.</div>
                                <div class="t m5 x38 h1f yd2 ff3 fs9 fc0 sc0 ls0 ws0">Provider <span class="_ _15"></span>further <span
                                    class="_ _15"></span>agrees <span class="_ _15"></span>to <span class="_ _16"></span>reimburse
                                    <span class="_ _16"></span>the <span class="_ _17"></span>District <span class="_ _0"></span>for
                                    <span class="_ _16"></span>all <span class="_ _16"></span>liabilities, <span
                                        class="_ _0"></span>claims, <span class="_ _15"></span>losses, </div>
                                <div class="t m5 x38 h1d yd3 ff3 fs0 fc0 sc0 ls0 ws0">judgments, damage, demands, expenses, fines,
                                    penalties, including reasonable </div>
                                <div class="t ma x38 h1f yd4 ff3 fs9 fc0 sc0 ls0 ws0">attorneys&apos; fees <span
                                    class="_ _7"></span>imposed or <span class="_ _1"></span>incurred <span class="_ _8"></span>by
                                    <span class="_ _8"></span>the <span class="_ _7"></span>District because <span
                                        class="_ _8"></span>of <span class="_ _8"></span>the <span class="_ _8"></span>Provider&apos;s
                                    <span class="_ _2"></span>use <span class="_ _8"></span>or </div>
                                <div class="t m5 x38 h1d yd5 ff3 fs0 fc0 sc0 ls0 ws0">occupancy <span class="_ _8"></span>of <span
                                    class="_ _0"></span>the <span class="_ _0"></span>District&apos;s <span
                                        class="_ _7"></span>facilities, <span class="_ _1"></span>access <span class="_ _7"></span>to
                                    <span class="_ _0"></span>said <span class="_ _7"></span>facilities <span class="_ _1"></span>and
                                    <span class="_ _0"></span>premises, <span class="_ _8"></span>and/or </div>
                                <div class="t m5 x38 h1d yd6 ff3 fs0 fc0 sc0 ls0 ws0">active <span class="_ _7"></span>or <span
                                    class="_ _0"></span>passive <span class="_ _7"></span>negligence of<span class="_ _1"></span>
                                    <span class="_ _7"></span>the <span class="_ _0"></span>Provider <span class="_ _8"></span>or <span
                                        class="_ _7"></span>of <span class="_ _7"></span>the <span class="_ _15"></span>District, <span
                                            class="_ _8"></span>its <span class="_ _0"></span>Board <span class="_ _8"></span>of <span
                                                class="_ _0"></span>Trustees, </div>
                                <div class="t m5 x38 h1d yd7 ff3 fs0 fc0 sc0 ls0 ws0">officers, <span class="_ _7"></span>members, <span
                                    class="_ _1"></span>representatives, <span class="_ _0"></span>agents, <span
                                        class="_ _7"></span>guests, <span class="_ _1"></span>invitee, <span class="_ _8"></span>and/or
                                    <span class="_ _1"></span>employees.</div>
                                <div class="t m5 x34 h1d yd8 ff3 fs0 fc0 sc0 ls0 ws0">THE UNDERSIGNED HAS READ AND VOLUNTARILY SIGNSTHE
                                    RELEASE AND WAIVER OF</div>
                                <div class="t ma x34 h1d yd9 ff3 fs0 fc0 sc0 ls0 ws0">LIABILITY AND INDEMNITY AGREEMENT, and further
                                    agrees that no oral representation, </div>
                                <div class="t m5 x34 h1d yda ff3 fs0 fc0 sc0 ls0 ws0">statements of inducement apart from the foregoing
                                    written agreement have been made.</div>
                                <div class="t mb x39 h1d ydb ff3 fs0 fc0 sc0 ls0 ws0">I HAVE READ THIS RELEASE.</div>
                                <div class="t m5 x34 h1d ydc ff3 fs0 fc0 sc0 ls0 ws0">Date</div>
                                <div class="t m0 x39 h1d ydd ff3 fs0 fc0 sc0 ls0 ws0">Signature of Provider</div>
                                <div class="t m0 x39 h1d yde ff3 fs0 fc0 sc0 ls0 ws0">Print Name</div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>

                        <div id="pf6" class="pf w0 h0" data-page-no="6">
                            <div class="pc pc6 w0 h0"><img class="bi x12 ydf w14 h20" alt="" src={bg6} />
                                <div class="t m1 x35 h1d ybe ff3 fs0 fc0 sc0 ls0 ws0">GlendaleUnifiedSchoolDistrict</div>
                                <div class="t m0 x36 h1e ybf ff3 fs6 fc0 sc0 ls0 ws0">Glendale, California</div>
                                <div class="t m5 x3a h1d ye0 ff3 fs0 fc0 sc0 ls0 ws0">Personal Services Agreement </div>
                                <div class="t m0 x31 h1d ye1 ff3 fs0 fc0 sc0 ls0 ws0">Retirement Status Statement</div>
                                <div class="t m5 x34 h1d ye2 ff3 fs0 fc0 sc0 ls0 ws0">Are you a State Teachers Retirement System (STRS)
                                    retiree?</div>
                                <div class="t ma x34 h1d ye3 ff3 fs0 fc0 sc0 ls0 ws0">Are you a California Public Employees Retirement
                                    System (CaIPERS) </div>
                                <div class="t m5 x34 h1d ye4 ff3 fs0 fc0 sc0 ls0 ws0">retiree?</div>
                                <div class="t m0 x34 h1d ye5 ff3 fs0 fc0 sc0 ls0 ws0">Note: The District will be reporting your earnings
                                    or hours to the appropriate retirement </div>
                                <div class="t m5 x34 h1d ye6 ff3 fs0 fc0 sc0 ls0 ws0">system. <span class="_ _7"></span>You <span
                                    class="_ _8"></span>are <span class="_ _7"></span>responsible <span class="_ _1"></span>for
                                    <span class="_ _1"></span>monitoring <span class="_ _1"></span>your <span class="_ _8"></span>work
                                    <span class="_ _1"></span>hours <span class="_ _8"></span>or <span class="_ _1"></span>earnings
                                    <span class="_ _8"></span>to <span class="_ _8"></span>make <span class="_ _1"></span>sure <span
                                        class="_ _8"></span>you <span class="_ _8"></span>do </div>
                                <div class="t m0 x34 h1d ye7 ff3 fs0 fc0 sc0 ls0 ws0">not exceed your retirement <span class="_ _11">
                                </span>limit.</div>
                                <div class="t m0 x34 h1d ye8 ff3 fs0 fc0 sc0 ls0 ws0">Name (Print)</div>
                                <div class="t m0 x34 h1d ye9 ff3 fs0 fc0 sc0 ls0 ws0">Signature of Provider</div>
                                <div class="t m0 x34 h1d yea ff3 fs0 fc0 sc0 ls0 ws0">Date</div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                        <div id="pf7" class="pf w0 h0" data-page-no="7">
                            <div class="pc pc7 w0 h0"><img class="bi x12 yeb w15 h21" alt="" src={bg7} />
                                <div class="t m1 x3b h1d yec ff3 fs0 fc0 sc0 ls0 ws0">GlendaleUnifiedSchoolDistrict</div>
                                <div class="t m0 x3c h1e yed ff3 fs6 fc0 sc0 ls0 ws0">Glendale, California</div>
                                <div class="t m5 x3d h22 yee ff3 fsa fc0 sc0 ls0 ws0">CERTIFICATION REGARDING </div>
                                <div class="t mb x3e h22 yef ff3 fsa fc0 sc0 ls0 ws0">GOVERNOR EXECUTIVE ORDER N-6-22</div>
                                <div class="t ma x12 h1f yf0 ff3 fs9 fc0 sc0 ls0 ws0">On <span class="_ _17"></span>March <span
                                    class="_ _16"></span>4, <span class="_ _17"></span>2022, <span class="_ _16"></span>California
                                    <span class="_ _15"></span>Governor <span class="_ _15"></span>Newsom <span
                                        class="_ _15"></span>issued <span class="_ _15"></span>Order <span class="_ _16"></span>N-6-22
                                    <span class="_ _16"></span>requiring <span class="_ _17"></span>state <span
                                        class="_ _17"></span>agencies </div>
                                <div class="t m5 x12 h1d yf1 ff3 fs0 fc0 sc0 ls0 ws0">to <span class="_ _17"></span>take <span
                                    class="_ _15"></span>steps <span class="_ _15"></span>to <span class="_ _15"></span>ensure <span
                                        class="_ _7"></span>any <span class="_ _15"></span>agency <span class="_ _7"></span>and <span
                                            class="_ _15"></span>entity <span class="_ _0"></span>under <span class="_ _0"></span>contract
                                    <span class="_ _8"></span>with <span class="_ _16"></span>state <span class="_ _0"></span>agencies
                                    <span class="_ _7"></span>comply <span class="_ _0"></span>with </div>
                                <div class="t m0 x12 h1d yf2 ff3 fs0 fc0 sc0 ls0 ws0">the Federal Order:</div>
                                <div class="t m0 x12 h1d yf3 ff3 fs0 fc0 sc0 ls0 ws0">(htt<span class="_ _18"> </span>www.</div>
                                <div class="t m5 x12 h1d yf4 ff3 fs0 fc0 sc0 ls0 ws0">Order.pdf; “State <span
                                    class="_ _17"></span>Order”).</div>
                                <div class="t m0 x3f h1d yf3 ff3 fs0 fc0 sc0 ls0 ws0">-content<span class="_ _19"> </span>loads 2022 03
                                    <span class="_ _5"></span>3.4.22-Russia-Ukraine-Executive-</div>
                                <div class="t m0 x12 h1d yf5 ff3 fs0 fc0 sc0 ls0 ws0">If <span class="_ _15"></span>you <span
                                    class="_ _16"></span>enter <span class="_ _15"></span>into <span class="_ _15"></span>a <span
                                        class="_ _16"></span>contract <span class="_ _7"></span>with <span class="_ _17"></span>the
                                    <span class="_ _16"></span>District, <span class="_ _15"></span>you <span class="_ _16"></span>must
                                    <span class="_ _15"></span>comply <span class="_ _15"></span>with <span class="_ _16"></span>the
                                    <span class="_ _16"></span>economic <span class="_ _15"></span>sanctions </div>
                                <div class="t m5 x12 h1f yf6 ff3 fs9 fc0 sc0 ls0 ws0">imposed <span class="_ _8"></span>in <span
                                    class="_ _8"></span>response <span class="_ _1"></span>to <span class="_ _0"></span>Russia’s
                                    actions <span class="_ _8"></span>in <span class="_ _7"></span>Ukraine, including <span
                                        class="_ _7"></span>the <span class="_ _7"></span>orders <span class="_ _1"></span>and <span
                                            class="_ _8"></span>sanctions </div>
                                <div class="t m0 x12 h1d yf7 ff3 fs0 fc0 sc0 ls0 ws0">identified on <span class="_ _0"></span>the <span
                                    class="_ _7"></span>U.S. <span class="_ _1"></span>Department <span class="_ _4"></span>of <span
                                        class="_ _8"></span>the <span class="_ _7"></span>Treasury website:</div>
                                <div class="t m0 x40 h1d yf8 ff3 fs0 fc0 sc0 ls0 ws0">(htt <span class="_ _5"> </span>home.treasu<span
                                    class="_ _1a"> </span>-issues financial-sanctions sanctions- <span class="_ _d">
                                    </span>rams-and-</div>
                                <div class="t m0 x5 h1d yf9 ff3 fs0 fc0 sc0 ls0 ws0">ukraine-russia- related-sanctions).</div>
                                <div class="t m0 x12 h1d yfa ff3 fs0 fc0 sc0 ls0 ws0">As <span class="_ _8"></span>part of <span
                                    class="_ _1"></span>this <span class="_ _1"></span>procurement, <span class="_ _2"></span>if
                                    <span class="_ _8"></span>the <span class="_ _8"></span>contract value <span class="_ _7"></span>of
                                    <span class="_ _8"></span>this <span class="_ _8"></span>pro<span class="_ _2"></span>curement <span
                                        class="_ _2"></span>is <span class="_ _8"></span>$5 million <span class="_ _7"></span>or <span
                                            class="_ _1"></span>more, </div>
                                <div class="t m0 x12 h1d yfb ff3 fs0 fc0 sc0 ls0 ws0">please include in your Response the <span
                                    class="_ _0"></span>following:</div>
                                <div class="t mc x41 h1d yfc ff3 fs0 fc0 sc0 ls0 ws0">(1)</div>
                                <div class="t m5 x42 h1d yfc ff3 fs0 fc0 sc0 ls0 ws0">a <span class="_ _7"></span>statement <span
                                    class="_ _1"></span>that <span class="_ _8"></span>you <span class="_ _7"></span>are <span
                                        class="_ _7"></span>in<span class="_ _2"></span> <span class="_ _0"></span>compliance <span
                                            class="_ _1"></span>with <span class="_ _0"></span>the <span class="_ _7"></span>required <span
                                                class="_ _1"></span>economic <span class="_ _8"></span>sanctions <span class="_ _1"></span>of
                                </div>
                                <div class="t m0 x41 h1d yfd ff3 fs0 fc0 sc0 ls0 ws0">the Federal and State <span
                                    class="_ _0"></span>Orders;</div>
                                <div class="t mc x41 h1d yfe ff3 fs0 fc0 sc0 ls0 ws0">(2)</div>
                                <div class="t m5 x42 h1d yfe ff3 fs0 fc0 sc0 ls0 ws0">the <span class="_ _7"></span>steps <span
                                    class="_ _7"></span>you <span class="_ _8"></span>have <span class="_ _7"></span>taken <span
                                        class="_ _7"></span>in <span class="_ _7"></span>response <span class="_ _1"></span>to <span
                                            class="_ _7"></span>Russia&apos;s <span class="_ _1"></span>actions <span class="_ _8"></span>in
                                    <span class="_ _8"></span>Ukraine, <span class="_ _1"></span>including, <span
                                        class="_ _8"></span>but </div>
                                <div class="t m5 x41 h1f yff ff3 fs9 fc0 sc0 ls0 ws0">not <span class="_ _2"></span>limited <span
                                    class="_ _2"></span>to, <span class="_ _2"></span>desisting <span class="_ _2"></span>from <span
                                        class="_ _2"></span>making <span class="_ _2"></span>new <span class="_ _2"></span>investments
                                    <span class="_ _2"></span>in, <span class="_ _2"></span>or <span class="_ _2"></span>engaging <span
                                        class="_ _2"></span>in <span class="_ _2"></span>financial </div>
                                <div class="t ma x41 h1f y100 ff3 fs9 fc0 sc0 ls0 ws0">transactions <span class="_ _b"></span>with,
                                    <span class="_ _5"></span>Russian <span class="_ _b"></span>entities, <span class="_ _5"></span>not
                                    <span class="_ _b"></span>transferring <span class="_ _b"></span>technology <span
                                        class="_ _5"></span>to <span class="_ _b"></span>Russia <span class="_ _b"></span>or <span
                                            class="_ _5"></span>Russian </div>
                                <div class="t m0 x41 h1d y101 ff3 fs0 fc0 sc0 ls0 ws0">entities, <span class="_ _0"></span>and <span
                                    class="_ _15"></span>directly <span class="_ _0"></span>providing <span
                                        class="_ _15"></span>support <span class="_ _0"></span>to <span class="_ _17"></span>the <span
                                            class="_ _16"></span>government <span class="_ _7"></span>and <span class="_ _15"></span>people
                                    <span class="_ _0"></span>of <span class="_ _17"></span>Ukraine.</div>
                                <div class="t ma x12 h1d y102 ff3 fs0 fc0 sc0 ls0 ws0">Print Name:</div>
                                <div class="t m0 x29 h1d y102 ff3 fs0 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x12 h1d y103 ff3 fs0 fc0 sc0 ls0 ws0">Signature:</div>
                                <div class="t m7 x29 h1d y103 ff3 fs0 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x12 h1d y104 ff3 fs0 fc0 sc0 ls0 ws0">Date:</div>
                                <div class="t m7 x29 h1d y104 ff3 fs0 fc0 sc0 ls0 ws0"> </div>
                                <div class="c x43 y105 w16 h23">
                                    <div class="t m0 x21 h1d y106 ff3 fs0 fc0 sc0 ls0 ws0">countr -information</div>
                                </div><a class="l" href="http://www/">
                                    <div class="d md"
                                        style={{ borderStyle: "none;position:absolute;left:112.949997px;bottom:574.096985px;width:29.332016px;height:13.799011px;background-color:rgba(255,255,255,0.000001);" }}
                                    >
                                    </div>
                                </a>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                        <div id="pf8" class="pf w0 h0" data-page-no="8">
                            <div class="pc pc8 w0 h0"><img class="bi x0 y107 w17 h24" alt="" src={bg8} />
                                <div class="c x7 y108 w18 h25">
                                    <div class="t me x2e h26 y109 ff3 fsb fc2 sc0 ls0 ws0">D e <span class="_ _7"></span>part <span
                                        class="_ _8"></span>me<span class="_ _1"></span>nI</div>
                                    <div class="t m0 x21 h26 y10a ff3 fsb fc2 sc0 ls0 ws0">S t a t e o f C a I i f o r n i <span
                                        class="_ _4"></span>a</div>
                                </div>
                                <div class="t m1 x37 h27 y10b ff3 fsc fc2 sc0 ls0 ws0">Em <span class="_ _15"></span>pl oym <span
                                    class="_ _0"></span>en<span class="_ _1"></span>I</div>
                                <div class="t m5 x37 h28 y10c ff4 fsc fc2 sc0 ls0 ws0">Development</div>
                                <div class="t m0 x3f h29 y10d ff3 fsd fc2 sc0 ls0 ws0">REPORT OF</div>
                                <div class="t m0 x44 h2a y10e ff4 fsd fc2 sc0 ls0 ws0">INDEPENDENT CONTRACTOR(S)</div>
                                <div class="t m0 x45 h2b y10f ff5 fs5 fc2 sc0 ls0 ws0">See detailed instructions on page 2. Please type
                                    or print.</div>
                                <div class="t m0 x18 h2c y110 ff3 fs4 fc2 sc0 ls0 ws0">05420101</div>
                                <div class="t m0 x16 h1e y111 ff4 fs6 fc2 sc0 ls0 ws0">SERVICE-RECIPIENT <span class="ff3">(BUSINESS OR
                                    GOVERNMENT ENTITY):</span></div>
                                <div class="t m0 x16 h2d y112 ff3 fse fc2 sc0 ls0 ws0">DATE<span class="_ _1b"> </span>FEDERAL ID <span
                                    class="_ _1"></span>NO.<span class="_ _1c"> </span>CA EMPLOYER ACCOUNT <span
                                        class="_ _4"></span>NO.</div>
                                <div class="t m0 x46 h2d y113 ff3 fse fc2 sc0 ls0 ws0">SERVICE-RECIPIENT NAME / BUSINESS NAME</div>
                                <div class="t m0 x46 h2d y114 ff3 fse fc0 sc0 ls0 ws0">ADDRESS</div>
                                <div class="t m0 x1e h2d y115 ff3 fse fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                                <div class="t m0 x47 h2d y116 ff3 fse fc2 sc0 ls0 ws0">CONTACT PERSON</div>
                                <div class="t m0 x48 h2d y117 ff3 fse fc2 sc0 ls0 ws0">TELEPHONE NO.</div>
                                <div class="t m0 x46 h2d y118 ff3 fse fc2 sc0 ls0 ws0">CITY</div>
                                <div class="t m5 x2a h1e y119 ff4 fs6 fc2 sc0 ls0 ws0">SERVICE-PROVIDER <span class="ff3">(INDEPENDENT
                                    CONTRACTOR):</span></div>
                                <div class="t mf x46 h2e y11a ff3 fsf fc2 sc0 ls0 ws0">FIRST NAME</div>
                                <div class="t mf x49 h2e y11b ff3 fsf fc2 sc0 ls0 ws0">MI</div>
                                <div class="t mf x4a h2e y11c ff3 fsf fc2 sc0 ls0 ws0">LAST NAME</div>
                                <div class="t m5 x4b h2d y11d ff3 fse fc2 sc0 ls0 ws0">STATE</div>
                                <div class="t m0 x4c h2d y118 ff3 fse fc2 sc0 ls0 ws0">ZIP</div>
                                <div class="t m1 x46 h2e y11e ff3 fsf fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                                <div class="t m1 x46 h2e y11f ff3 fsf fc2 sc0 ls0 ws0">CITY</div>
                                <div class="t mf x4d h2e y120 ff3 fsf fc2 sc0 ls0 ws0">STREET NO.</div>
                                <div class="t mf x49 h2e y11e ff3 fsf fc2 sc0 ls0 ws0">STREET NAME</div>
                                <div class="t m0 x4e h2e y121 ff3 fsf fc2 sc0 ls0 ws0">STATE</div>
                                <div class="t mf x4f h2e y121 ff3 fsf fc2 sc0 ls0 ws0">ZIP</div>
                                <div class="t mf x50 h2e y11e ff3 fsf fc2 sc0 ls0 ws0">UNIT/APT</div>
                                <div class="t mf x46 h2e y122 ff3 fsf fc2 sc0 ls0 ws0">START DATE OF <span class="_ _2"></span>CONTRACT
                                </div>
                                <div class="t m10 x51 h2e y123 ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                                <div class="t mf x52 h2e y124 ff3 fsf fc2 sc0 ls0 ws0">FIRST NAME</div>
                                <div class="t mf x52 h2e y125 ff3 fsf fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                                <div class="t m1 x46 h2e y126 ff3 fsf fc2 sc0 ls0 ws0">CITY</div>
                                <div class="t m1 x52 h2e y127 ff3 fsf fc2 sc0 ls0 ws0">START DATE OF CONTRACT</div>
                                <div class="t m10 x51 h2e y128 ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                                <div class="t mf x52 h2e y129 ff3 fsf fc2 sc0 ls0 ws0">FIRST NAME</div>
                                <div class="t m1 x52 h2e y12a ff3 fsf fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                                <div class="t m1 x46 h2e y12b ff3 fsf fc2 sc0 ls0 ws0">CITY</div>
                                <div class="t mf x52 h2e y12c ff3 fsf fc2 sc0 ls0 ws0">START DATE OF <span class="_ _2"></span>CONTRACT
                                </div>
                                <div class="t m10 x51 h2e y12d ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                                <div class="t mf x53 h2e y12e ff3 fsf fc2 sc0 ls0 ws0">AMOUNT OF CONTRACT</div>
                                <div class="t mf x4d h2e y12f ff3 fsf fc2 sc0 ls0 ws0">STREET NO.</div>
                                <div class="t mf x53 h2e y130 ff3 fsf fc2 sc0 ls0 ws0">AMOUNT OF CONTRACT</div>
                                <div class="t mf x4d h2e y131 ff3 fsf fc2 sc0 ls0 ws0">STREET NO.</div>
                                <div class="t mf x53 h2e y132 ff3 fsf fc2 sc0 ls0 ws0">AMOUNT OF CONTRACT</div>
                                <div class="t mf x49 h2e y133 ff3 fsf fc2 sc0 ls0 ws0">MI</div>
                                <div class="t mf x4a h2e y134 ff3 fsf fc2 sc0 ls0 ws0">LAST NAME</div>
                                <div class="t mf x54 h2e y135 ff3 fsf fc2 sc0 ls0 ws0">STRE ET NAME</div>
                                <div class="t mf x49 h2e y136 ff3 fsf fc2 sc0 ls0 ws0">MI</div>
                                <div class="t mf x4a h2e y137 ff3 fsf fc2 sc0 ls0 ws0">LAST NAME</div>
                                <div class="t mf x54 h2e y138 ff3 fsf fc2 sc0 ls0 ws0">STREET NAME</div>
                                <div class="t m1 x55 h2e y122 ff3 fsf fc2 sc0 ls0 ws0">CONTRACT EXPIRATION DATE</div>
                                <div class="t m11 x56 h2e y139 ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                                <div class="t m0 x4e h2e y13a ff3 fsf fc2 sc0 ls0 ws0">STA<span class="_ _1"></span>TE</div>
                                <div class="t m1 x8 h2e y127 ff3 fsf fc2 sc0 ls0 ws0">CONTRACT EXPIRATION <span class="_ _b">
                                </span>DATE</div>
                                <div class="t m11 x56 h2e y13b ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                                <div class="t m0 x4e h2e y13c ff3 fsf fc2 sc0 ls0 ws0">STA<span class="_ _1"></span>TE</div>
                                <div class="t m1 x8 h2e y12c ff3 fsf fc2 sc0 ls0 ws0">CONTRACT EXPIRATION DATE</div>
                                <div class="t m11 x56 h2e y13d ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                                <div class="t mf x57 h2e y13e ff3 fsf fc2 sc0 ls0 ws0">CHECK HERE <span class="fc3">IF </span>CONTRACT
                                    IS ONGOING</div>
                                <div class="t mf x50 h2e y13f ff3 fsf fc2 sc0 ls0 ws0">UNIT/APT</div>
                                <div class="t m1 x4f h2e y13a ff3 fsf fc2 sc0 ls0 ws0">ZIP</div>
                                <div class="t mf x57 h2e y140 ff3 fsf fc2 sc0 ls0 ws0">CHECK HERE <span class="fc3">IF </span>CONTRACT
                                    IS ONGOING</div>
                                <div class="t mf x50 h2e y141 ff3 fsf fc2 sc0 ls0 ws0">UNIT/APT</div>
                                <div class="t mf x4f h2e y13c ff3 fsf fc2 sc0 ls0 ws0">ZIP</div>
                                <div class="t mf x57 h2e y142 ff3 fsf fc2 sc0 ls0 ws0">CHECK HERE <span class="fc3">IF </span>CONTRACT
                                    IS ONGOING</div>
                                <div class="t m0 x58 h2f y143 ff3 fs3 fc2 sc0 ls0 ws0">DE 542 Rev. 3 (3-05) <span
                                    class="ff4">(INTERNET)</span></div>
                                <div class="t m0 x59 h27 y144 ff3 fsc fc2 sc0 ls0 ws0">MAIL TO: Employment Development Department <span
                                    class="fc4">• </span>P.O. Box 997350, MIC 96 <span class="fc4">• </span>Sacramento, CA
                                    95899-7350 </div>
                                <div class="t m0 x5a h27 y145 ff3 fsc fc2 sc0 ls0 ws0">or Fax to (916) 319-4410</div>
                                <div class="t m0 x5b h27 y146 ff3 fsc fc2 sc0 ls0 ws0">Page 1 of 2</div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                        <div id="pf9" class="pf w0 h0" data-page-no="9">
                            <div class="pc pc9 w0 h0"><img class="bi x2d y147 w19 h30" alt="" src={bg9} />
                                <div class="t m12 x2d h31 y148 ff3 fs10 fc0 sc0 ls0 ws0">Fo<span class="_ _1d"> </span>W-9</div>
                                <div class="t m0 x2d h26 y149 ff3 fsb fc0 sc0 ls0 ws0">(Rev. December 2014) </div>
                                <div class="t ma x2d h26 y14a ff3 fsb fc0 sc0 ls0 ws0">Department of the Treasury </div>
                                <div class="t m5 x2d h26 y14b ff3 fsb fc0 sc0 ls0 ws0">Internal Revenue Service</div>
                                <div class="t m0 x5c h32 y14c ff4 fs9 fc0 sc0 ls0 ws0">Request Dr Taxpayer </div>
                                <div class="t m5 x5d h32 y14d ff4 fs9 fc0 sc0 ls0 ws0">Identification Number and Certification</div>
                                <div class="t m1 x5e h1e y14e ff3 fs6 fc0 sc0 ls0 ws0">Give Form to the </div>
                                <div class="t m1 x5e h33 y14f ff4 fs6 fc0 sc0 ls0 ws0">requester. Do not </div>
                                <div class="t m1 x5e h1e y150 ff3 fs6 fc0 sc0 ls0 ws0">send to the IRS.</div>
                                <div class="t m5 x5f h26 y151 ff3 fsb fc0 sc0 ls0 ws0">1</div>
                                <div class="t m0 x37 h26 y151 ff3 fsb fc0 sc0 ls0 ws0">Name (as shown on your income tax return). Name
                                    is required on this line; do not leave this line <span class="_ _8"></span>blank.</div>
                                <div class="t m5 x5f h26 y152 ff3 fsb fc0 sc0 ls0 ws0">2</div>
                                <div class="t m0 x37 h26 y152 ff3 fsb fc0 sc0 ls0 ws0">Business name/disregarded entity name, if
                                    different from <span class="_ _5"> </span>above</div>
                                <div class="t m5 x5f h26 y153 ff3 fsb fc0 sc0 ls0 ws0">3</div>
                                <div class="t m0 x37 h26 y153 ff3 fsb fc0 sc0 ls0 ws0">Check appropriate box <span
                                    class="_ _1"></span>for <span class="_ _1"></span>federal <span class="_ _1"></span>tax
                                    classification; <span class="_ _1"></span>check only one <span class="_ _8"></span>of the <span
                                        class="_ _8"></span>following seven boxes:</div>
                                <div class="t m0 x60 h26 y154 ff3 fsb fc0 sc0 ls0 ws0">Individual/sole <span
                                    class="_ _8"></span>proprietor <span class="_ _2"></span>or<span class="_ _1e"> </span>C <span
                                        class="_ _1"></span>Corporation<span class="_ _1f"> </span>S <span
                                            class="_ _1"></span>Corporation</div>
                                <div class="t m5 x8 h26 y154 ff3 fsb fc0 sc0 ls0 ws0">Partn<span class="_ _1"></span>ership </div>
                                <div class="t m0 x60 h26 y155 ff3 fsb fc0 sc0 ls0 ws0">single-member <span class="_ _2"></span>LLC</div>
                                <div class="t m5 x61 h26 y156 ff3 fsb fc0 sc0 ls0 ws0">Trust/estate</div>
                                <div class="t m5 x62 h26 y157 ff3 fsb fc0 sc0 ls0 ws0">4</div>
                                <div class="t m0 x10 h26 y157 ff3 fsb fc0 sc0 ls0 ws0">Exemptions (codes apply <span
                                    class="_ _8"></span>only to </div>
                                <div class="t m0 x62 h26 y158 ff3 fsb fc0 sc0 ls0 ws0">certain <span class="_ _1"></span>entities, not
                                    <span class="_ _1"></span>individuals; see </div>
                                <div class="t m0 x62 h26 y159 ff3 fsb fc0 sc0 ls0 ws0">instructions on page 3):</div>
                                <div class="t m0 x62 h26 y15a ff3 fsb fc0 sc0 ls0 ws0">Exempt payee cDde (if any)</div>
                                <div class="t m0 x60 h26 y15b ff3 fsb fc0 sc0 ls0 ws0">Limited liability company. Enter the tax
                                    classification (C=C corporation, S=S corporation, P=partnership) •</div>
                                <div class="t m0 x60 h26 y15c ff3 fsb fc0 sc0 ls0 ws0">Note. <span class="_ _1"></span>For <span
                                    class="_ _1"></span>a <span class="_ _1"></span>single-member <span class="_ _2"></span>LLC that
                                    is <span class="_ _1"></span>disregarded, <span class="_ _2"></span>do <span class="_ _1"></span>not
                                    check LLC; <span class="_ _1"></span>check <span class="_ _1"></span>the appropriate box in <span
                                        class="_ _7"></span>the <span class="_ _1"></span>line above <span class="_ _1"></span>for
                                </div>
                                <div class="t m0 x60 h26 y15d ff3 fsb fc0 sc0 ls0 ws0">the tax classification of the single-member
                                    owner.</div>
                                <div class="t m0 x60 h27 y15e ff3 fsc fc0 sc0 ls0 ws0">Other (see instructions) •</div>
                                <div class="t m0 x62 h26 y15f ff3 fsb fc0 sc0 ls0 ws0">Exemption from FATCA reporting </div>
                                <div class="t m0 x62 h26 y160 ff3 fsb fc0 sc0 ls0 ws0">code (if any)</div>
                                <div class="t me x62 h34 y161 ff3 fs11 fc0 sc0 ls0 ws0">sales </div>
                                <div class="t m0 x63 h34 y161 ff3 fs11 fc5 sc0 ls0 ws0">fo <span class="fc0">accmnfs <span
                                    class="ff5">main</span>ta<span class="ff5">ined outside <span class="fc6">tin <span
                                        class="fc7">u.<span class="ff3">s.</span></span></span></span></span></div>
                                <div class="t m5 x5f h27 y162 ff3 fsc fc0 sc0 ls0 ws0">5<span class="_ _20"> </span>Address <span
                                    class="_ _8"></span>(number, <span class="_ _8"></span>street, <span
                                        class="_ _8"></span>and<span class="_ _2"></span> <span class="_ _7"></span>apt. <span
                                            class="_ _8"></span>or <span class="_ _7"></span>suite <span class="_ _7"></span>no.)</div>
                                <div class="t m0 x64 h26 y162 ff3 fsb fc0 sc0 ls0 ws0">Requester’s name and address <span
                                    class="_ _2"></span>(optional)</div>
                                <div class="t m7 x65 h35 y163 ff3 fs5 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m0 x66 h35 y163 ff3 fs5 fc0 sc0 ls0 ws0">LENDALE <span class="ff4 fs6">UNIFIED SCHOOL
                                    DISTRICT</span></div>
                                <div class="t m5 x5f h26 y164 ff3 fsb fc0 sc0 ls0 ws0">6</div>
                                <div class="t m0 x37 h26 y164 ff3 fsb fc0 sc0 ls0 ws0">City, state, and ZIP code</div>
                                <div class="t m5 x5f h26 y165 ff3 fsb fc0 sc0 ls0 ws0">7</div>
                                <div class="t m0 x37 h26 y165 ff3 fsb fc0 sc0 ls0 ws0">List <span class="_ _7"></span>account <span
                                    class="_ _1"></span>number(s) <span class="_ _8"></span>here <span
                                        class="_ _7"></span>(optional)</div>
                                <div class="t m0 x67 h35 y166 ff3 fs5 fc0 sc0 ls0 ws0">223 <span class="fs6">N. <span
                                    class="ff4 fs7">JACKSON <span class="fs6">STREET</span></span></span></div>
                                <div class="t m0 x18 h1e y167 ff3 fs6 fc0 sc0 ls0 ws0">CA 91206</div>
                                <div class="t m1 x68 h35 y168 ff3 fs5 fc0 sc0 ls0 ws0">Taxpayer Identification Number (TIN)</div>
                                <div class="t m0 x2d h2f y169 ff3 fs3 fc0 sc0 ls0 ws0">Enter <span class="_ _1"></span>your <span
                                    class="_ _1"></span>TIN <span class="_ _1"></span>in <span class="_ _7"></span>the <span
                                        class="_ _1"></span>appropriate box. <span class="_ _8"></span>The <span class="_ _1"></span>TIN
                                    <span class="_ _1"></span>provided <span class="_ _1"></span>must <span class="_ _8"></span>match
                                    the <span class="_ _7"></span>name <span class="_ _1"></span>given on <span class="_ _7"></span>line
                                    <span class="_ _1"></span>1 <span class="_ _8"></span>to <span class="_ _1"></span>avoid</div>
                                <div class="t m0 x69 h36 y16a ff4 fs3 fc0 sc0 ls0 ws0">Social security <span class="_ _7"></span>number
                                </div>
                                <div class="t m0 x2d h2f y16b ff3 fs3 fc0 sc0 ls0 ws0">backup <span class="_ _8"></span>withholding.
                                    <span class="_ _1"></span>For <span class="_ _7"></span>individuals, <span class="_ _1"></span>this
                                    <span class="_ _7"></span>is <span class="_ _7"></span>generally <span class="_ _8"></span>your
                                    <span class="_ _1"></span>social <span class="_ _8"></span>security <span class="_ _7"></span>number
                                    (SSN). <span class="_ _7"></span>However, <span class="_ _1"></span>for <span class="_ _1"></span>a
                                </div>
                                <div class="t m0 x2d h2f y16c ff3 fs3 fc0 sc0 ls0 ws0">resident alien, sole proprietor, or disregarded
                                    entity, see the Part I instructions on page 3. For other </div>
                                <div class="t m0 x2d h2f y16d ff3 fs3 fc0 sc0 ls0 ws0">entities, <span class="_ _1"></span>it <span
                                    class="_ _8"></span>is <span class="_ _8"></span>your employer identification <span
                                        class="_ _0"></span>number (EIN). <span class="_ _1"></span>If <span class="_ _8"></span>you
                                    <span class="_ _1"></span>do <span class="_ _8"></span>not have <span class="_ _8"></span>a <span
                                        class="_ _7"></span>number, see <span class="_ _7"></span><span class="ff5">How <span
                                            class="ff3">to <span class="_ _7"></span><span class="ff5">get <span
                                                class="_ _8"></span>a</span></span></span></div>
                                <div class="t m0 x2d h1e y16e ff5 fs6 fc0 sc0 ls0 ws0">TIN <span class="_ _7"></span><span
                                    class="ff3">on <span class="_ _7"></span>page <span class="_ _0"></span>3.<span class="_ _21">
                                    </span>or</span></div>
                                <div class="t m0 x2d h2f y16f ff3 fs3 fc0 sc0 ls0 ws0">Under penalties of perjury, I certify that:</div>
                                <div class="t m5 x2d h2f y170 ff3 fs3 fc0 sc0 ls0 ws0">1.</div>
                                <div class="t m0 x12 h2f y170 ff3 fs3 fc0 sc0 ls0 ws0">The <span class="_ _8"></span>number <span
                                    class="_ _2"></span>shown <span class="_ _2"></span>on this <span class="_ _1"></span>form is my
                                    <span class="_ _1"></span>correct taxpayer identification <span class="_ _1"></span>number (or <span
                                        class="_ _2"></span>I am waiting <span class="_ _1"></span>for <span class="_ _2"></span>a <span
                                            class="_ _8"></span>number <span class="_ _2"></span>to <span class="_ _1"></span>be issued
                                    <span class="_ _1"></span>to <span class="_ _1"></span>me); <span class="_ _2"></span>and</div>
                                <div class="t m5 x2d h2f y171 ff3 fs3 fc0 sc0 ls0 ws0">2.</div>
                                <div class="t m0 x12 h2f y171 ff3 fs3 fc0 sc0 ls0 ws0">I <span class="_ _8"></span>am <span
                                    class="_ _1"></span>not subject <span class="_ _1"></span>to <span class="_ _7"></span>backup
                                    withholding <span class="_ _1"></span>because: <span class="_ _1"></span>(a) <span
                                        class="_ _8"></span>I <span class="_ _1"></span>am <span class="_ _1"></span>exempt from <span
                                            class="_ _8"></span>backup withholding, <span class="_ _1"></span>or (b) <span
                                                class="_ _8"></span>I <span class="_ _8"></span>have <span class="_ _8"></span>not <span
                                                    class="_ _1"></span>been <span class="_ _1"></span>notified <span class="_ _8"></span>by <span
                                                        class="_ _8"></span>the <span class="_ _1"></span>Internal <span class="_ _1"></span>Revenue
                                </div>
                                <div class="t m0 x12 h2f y172 ff3 fs3 fc0 sc0 ls0 ws0">Service <span class="_ _1"></span>(IRS) <span
                                    class="_ _1"></span>that <span class="_ _1"></span>I <span class="_ _8"></span>am <span
                                        class="_ _1"></span>subject to <span class="_ _7"></span>backup <span
                                            class="_ _1"></span>withholding as <span class="_ _1"></span>a <span class="_ _7"></span>result
                                    of <span class="_ _8"></span>a <span class="_ _8"></span>failure <span class="_ _1"></span>to <span
                                        class="_ _7"></span>report all <span class="_ _7"></span>interest or <span
                                            class="_ _1"></span>dividends, or <span class="_ _8"></span>(c) <span class="_ _1"></span>the
                                    <span class="_ _8"></span>IRS <span class="_ _8"></span>has <span class="_ _8"></span>notified <span
                                        class="_ _1"></span>me <span class="_ _8"></span>that I <span class="_ _7"></span>am </div>
                                <div class="t m0 x12 h2f y173 ff3 fs3 fc0 sc0 ls0 ws0">no longer subject to backup withholding; <span
                                    class="_ _5"> </span>and</div>
                                <div class="t m5 x2d h2f y174 ff3 fs3 fc0 sc0 ls0 ws0">3.</div>
                                <div class="t m0 x12 h2f y174 ff3 fs3 fc0 sc0 ls0 ws0">I am a U.S. citizen or other U.S. person (defined
                                    below); and</div>
                                <div class="t m5 x2d h2f y175 ff3 fs3 fc0 sc0 ls0 ws0">4.</div>
                                <div class="t m0 x6a h2f y175 ff3 fs3 fc0 sc0 ls0 ws0">The FATCA code(s) entered on this form (if any)
                                    indicating that I am exempt from FATCA reporting is <span class="_ _4"></span>correct.</div>
                                <div class="t m0 x2d h2f y176 ff4 fs3 fc0 sc0 ls0 ws0">Certification <span
                                    class="_ _1"></span>instructions. <span class="ff3">You <span class="_ _7"></span>must <span
                                        class="_ _1"></span>cross <span class="_ _1"></span>out <span class="_ _8"></span>item <span
                                            class="_ _1"></span>2 <span class="_ _8"></span>above <span class="_ _8"></span>if <span
                                                class="_ _1"></span>you <span class="_ _1"></span>have <span class="_ _8"></span>been <span
                                                    class="_ _1"></span>notified <span class="_ _1"></span>by <span class="_ _7"></span>the
                                        <span class="_ _1"></span>IRS <span class="_ _8"></span>that <span class="_ _1"></span>you <span
                                            class="_ _8"></span>are <span class="_ _1"></span>currently subject <span
                                                class="_ _8"></span>to <span class="_ _7"></span>backup withholding </span></div>
                                <div class="t m0 x2d h2f y177 ff3 fs3 fc0 sc0 ls0 ws0">because you have failed to report all interest
                                    and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage
                                </div>
                                <div class="t m0 x2d h2f y178 ff3 fs3 fc0 sc0 ls0 ws0">interest <span class="_ _1"></span>paid, <span
                                    class="_ _1"></span>acquisition <span class="_ _1"></span>or <span
                                        class="_ _1"></span>abandonment of <span class="_ _7"></span>secured <span
                                            class="_ _8"></span>property, <span class="_ _1"></span>cancellation <span
                                                class="_ _1"></span>of <span class="_ _8"></span>debt, <span class="_ _1"></span>contributions
                                    <span class="_ _1"></span>to <span class="_ _8"></span>an <span class="_ _7"></span>individual <span
                                        class="_ _1"></span>retirement <span class="_ _1"></span>arrangement (IRA), <span
                                            class="_ _8"></span>and </div>
                                <div class="t m0 x2d h2f y179 ff3 fs3 fc0 sc0 ls0 ws0">generally, payments other <span
                                    class="_ _8"></span>than <span class="_ _8"></span>interest and <span
                                        class="_ _1"></span>dividends, <span class="_ _1"></span>you <span class="_ _1"></span>are <span
                                            class="_ _8"></span>not required <span class="_ _8"></span>to <span class="_ _1"></span>sign
                                    <span class="_ _8"></span>the <span class="_ _1"></span>certification, <span class="_ _1"></span>but
                                    <span class="_ _1"></span>you <span class="_ _8"></span>must provide <span class="_ _8"></span>your
                                    correct <span class="_ _1"></span>TIN. <span class="_ _1"></span>See <span class="_ _1"></span>the
                                </div>
                                <div class="t m0 x2d h2f y17a ff3 fs3 fc0 sc0 ls0 ws0">instructions on page <span class="_ _0"></span>3.
                                </div>
                                <div class="t m1 x2d h2c y17b ff3 fs4 fc0 sc0 ls0 ws0">General Instructions</div>
                                <div class="t m0 x2d h26 y17c ff3 fsb fc0 sc0 ls0 ws0">Section references are to the Internal Revenue
                                    Code unless otherwise noted.</div>
                                <div class="t m0 x2d h26 y17d ff4 fsb fc0 sc0 ls0 ws0">Future <span class="_ _7"></span>developments.
                                    <span class="_ _1"></span><span class="ff3">Information <span class="_ _1"></span>about <span
                                        class="_ _1"></span>developments affecting <span class="_ _7"></span>Form <span
                                            class="_ _8"></span>W-9 <span class="_ _1"></span>(such </span></div>
                                <div class="t m0 x2d h26 y17e ff3 fsb fc0 sc0 ls0 ws0">as <span class="_ _8"></span>leg<span
                                    class="_ _2"></span>islation enacted after <span class="_ _8"></span>we <span
                                        class="_ _1"></span>release <span class="_ _1"></span>it) <span class="_ _1"></span>IS at <span
                                            class="_ _1"></span>vrWW.fFS.@OV/fw9.</div>
                                <div class="t m0 x2d h2b y17f ff4 fs5 fc0 sc0 ls0 ws0">Purpose of Form</div>
                                <div class="t m0 x2d h26 y180 ff3 fsb fc0 sc0 ls0 ws0">An individual or entity (Form W-9 requested who
                                    is required to file an information </div>
                                <div class="t m0 x2d h26 y181 ff3 fsb fc0 sc0 ls0 ws0">return with the IRS must obtain your correct
                                    taxpayer identification number (TIN) </div>
                                <div class="t m0 x2d h26 y182 ff3 fsb fc0 sc0 ls0 ws0">which <span class="_ _8"></span>may <span
                                    class="_ _1"></span>be <span class="_ _8"></span>your <span class="_ _8"></span>social <span
                                        class="_ _1"></span>security <span class="_ _1"></span>number <span class="_ _1"></span>(SSN),
                                    individual taxpayer <span class="_ _1"></span>identification </div>
                                <div class="t m0 x2d h26 y183 ff3 fsb fc0 sc0 ls0 ws0">number (ITIN), adoption taxpayer identification
                                    number (ATIN), or employer </div>
                                <div class="t m0 x2d h26 y184 ff3 fsb fc0 sc0 ls0 ws0">identification number (EIN), to report on an
                                    information return the amount paid to </div>
                                <div class="t m0 x2d h26 y185 ff3 fsb fc0 sc0 ls0 ws0">you, <span class="_ _8"></span>or other <span
                                    class="_ _1"></span>amount reportable <span class="_ _1"></span>on <span class="_ _1"></span>an
                                    <span class="_ _8"></span>information return. <span class="_ _7"></span>Examples of <span
                                        class="_ _1"></span>information </div>
                                <div class="t m0 x2d h26 y186 ff3 fsb fc0 sc0 ls0 ws0">returns include, but are not limited to, the
                                    following:</div>
                                <div class="t m13 x2d h26 y187 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6b h26 y187 ff3 fsb fc0 sc0 ls0 ws0">Form 1099-INT (interest earned or <span
                                    class="_ _8"></span>paid)</div>
                                <div class="t m13 x2d h26 y188 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6b h26 y188 ff3 fsb fc0 sc0 ls0 ws0">Form 1099-DIV (dividends, including those from
                                    stocks or mutual <span class="_ _7"></span>funds)</div>
                                <div class="t m13 x2d h26 y189 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6b h26 y189 ff3 fsb fc0 sc0 ls0 ws0">Form <span class="_ _8"></span>1099<span
                                    class="_ _2"></span>-MISC (various <span class="_ _8"></span>types of <span
                                        class="_ _1"></span>income, <span class="_ _1"></span>prizes, awards, <span
                                            class="_ _1"></span>or <span class="_ _1"></span>gross <span class="_ _1"></span>proceeds)</div>
                                <div class="t m13 x2d h26 y18a ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6b h26 y18a ff3 fsb fc0 sc0 ls0 ws0">Form <span class="_ _1"></span><span
                                    class="fc6">1<span class="fc0">099-B <span class="_ _2"></span>(stock or <span
                                        class="_ _1"></span>mutual <span class="_ _1"></span>fund <span
                                            class="_ _1"></span>sales and <span class="_ _1"></span>certain other <span
                                                class="_ _8"></span>transactions by </span></span></div>
                                <div class="t m0 x2d h26 y18b ff3 fsb fc0 sc0 ls0 ws0">brokers)</div>
                                <div class="t m13 x2d h26 y18c ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6b h26 y18c ff3 fsb fc0 sc0 ls0 ws0">Form 1099-S (proceeds from real estate
                                    transactions)</div>
                                <div class="t m13 x2d h26 y18d ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6b h26 y18d ff3 fsb fc0 sc0 ls0 ws0">Form 1099-K (merchant card and third party
                                    network transactions)</div>
                                <div class="t m1 x32 h26 y18e ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6c h26 y18e ff3 fsb fc0 sc0 ls0 ws0">Form <span class="fc6">1</span>098 (home mortgage
                                    interest), <span class="fc6">1</span>098-E (student loan interest), <span class="_ _7"></span><span
                                        class="fc6">1<span class="fc0">098-T</span></span></div>
                                <div class="t m0 x32 h27 y18f ff3 fsc fc0 sc0 ls0 ws0">(tuition)</div>
                                <div class="t m1 x32 h26 y190 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6c h26 y190 ff3 fsb fc0 sc0 ls0 ws0">Form <span class="fc6">1</span>099-C (canceled
                                    <span class="_ _b"> </span>debt)</div>
                                <div class="t m1 x32 h26 y191 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                                <div class="t m0 x6c h26 y191 ff3 fsb fc0 sc0 ls0 ws0">Form <span class="fc6">1</span>099-A (acquisition
                                    or abandonment of secured <span class="_ _7"></span>property)</div>
                                <div class="t m0 x6d h26 y192 ff3 fsb fc0 sc0 ls0 ws0">Use <span class="_ _8"></span>Form <span
                                    class="_ _1"></span>W-9 only <span class="_ _8"></span>if <span class="_ _1"></span>you <span
                                        class="_ _1"></span>are a <span class="_ _0"></span>U.S. <span class="_ _1"></span>person <span
                                            class="_ _1"></span>(including a <span class="_ _1"></span>resident alien), <span
                                                class="_ _8"></span>to </div>
                                <div class="t m0 x32 h26 y193 ff3 fsb fc0 sc0 ls0 ws0">provide your correct <span
                                    class="_ _2"></span>TIN.</div>
                                <div class="t m0 x6c h26 y194 ff5 fsb fc0 sc0 ls0 ws0">11for <span class="_ _4"></span>do <span
                                    class="_ _8"></span>not <span class="_ _8"></span>return <span class="_ _7"></span>Form <span
                                        class="_ _7"></span>W-9 <span class="_ _1"></span>to <span class="_ _1"></span>the <span
                                            class="_ _8"></span>requester <span class="_ _1"></span>with <span class="_ _8"></span><span
                                                class="fc7">a <span class="_ _8"></span><span class="fc0">TIN, j <span
                                                    class="_ _15"></span>o<span class="ff3">Lt <span class="_ _8"></span>f7JfQfif <span
                                                        class="_ _8"></span><span class="ff5">be <span class="_ _7"></span>subject
                                                </span></span></span></span></div>
                                <div class="t m0 x32 h26 y195 ff5 fsb fc0 sc0 ls0 ws0">to backup withholdf <span
                                    class="_ _1"></span><span class="ff3">fl<span class="ff5">g. </span>See <span
                                        class="_ _1"></span><span class="ff5">What <span class="ff3">fS <span
                                            class="_ _8"></span><span class="ff5">backup withholding? <span class="_ _b">
                                            </span><span class="ff3">on <span class="_ _1"></span>page <span
                                                class="_ _8"></span>2.</span></span></span></span></span></div>
                                <div class="t m0 x6d h26 y196 ff3 fsb fc0 sc0 ls0 ws0">By signing the filled-out form, you:</div>
                                <div class="t m14 x6d h26 y197 ff3 fsb fc0 sc0 ls0 ws0">1.</div>
                                <div class="t m0 x6e h26 y197 ff3 fsb fc0 sc0 ls0 ws0">Certify <span class="_ _1"></span>that <span
                                    class="_ _1"></span>the <span class="_ _8"></span>TIN <span class="_ _1"></span>you <span
                                        class="_ _1"></span>are giving <span class="_ _1"></span>is correct (or <span
                                            class="_ _8"></span>you <span class="_ _1"></span>are waiting <span class="_ _1"></span>for a
                                    <span class="_ _8"></span>number </div>
                                <div class="t m0 x32 h26 y198 ff3 fsb fc0 sc0 ls0 ws0">to be issued),</div>
                                <div class="t m14 x6d h26 y199 ff3 fsb fc0 sc0 ls0 ws0">2.</div>
                                <div class="t m0 x6e h26 y199 ff3 fsb fc0 sc0 ls0 ws0">Certify that you are not subject to backup
                                    withholding, or</div>
                                <div class="t m14 x6d h26 y19a ff3 fsb fc0 sc0 ls0 ws0">3.</div>
                                <div class="t m0 x6e h26 y19a ff3 fsb fc0 sc0 ls0 ws0">Claim exemption <span class="_ _1"></span>from
                                    backup <span class="_ _1"></span>withholding if <span class="_ _8"></span>you <span
                                        class="_ _1"></span>are a <span class="_ _0"></span>U.S. <span class="_ _1"></span>exempt payee.
                                    <span class="_ _1"></span>If </div>
                                <div class="t m0 x32 h26 y19b ff3 fsb fc0 sc0 ls0 ws0">applicable, you are also certifying that as a
                                    U.S. person, your allocable share of </div>
                                <div class="t m0 x32 h26 y19c ff3 fsb fc0 sc0 ls0 ws0">any partnership income from a U.S. trade or
                                    business is not subject to the </div>
                                <div class="t m0 x32 h26 y19d ff3 fsb fc0 sc0 ls0 ws0">withholding tax on <span
                                    class="_ _8"></span>foreign partners’ share <span class="_ _1"></span>of effectively <span
                                        class="_ _8"></span>connected income, and</div>
                                <div class="t m14 x6d h26 y19e ff3 fsb fc0 sc0 ls0 ws0">4.</div>
                                <div class="t m0 x6e h26 y19e ff3 fsb fc0 sc0 ls0 ws0">Certify <span class="_ _8"></span>that <span
                                    class="_ _8"></span>FATCA code(s) <span class="_ _8"></span>entered on <span
                                        class="_ _7"></span>this <span class="_ _1"></span>form (if <span class="_ _8"></span>any)
                                    indicating <span class="_ _8"></span>that <span class="_ _1"></span>you <span
                                        class="_ _8"></span>are </div>
                                <div class="t m0 x32 h26 y19f ff3 fsb fc0 sc0 ls0 ws0">exempt <span class="_ _1"></span>from <span
                                    class="_ _8"></span>the <span class="_ _8"></span>FATCA <span class="_ _7"></span>rep<span
                                        class="_ _2"></span>orting, <span class="_ _8"></span>i<span class="_ _2"></span>s <span
                                            class="_ _8"></span>correct. <span class="_ _1"></span>See <span class="_ _7"></span><span
                                                class="ff5">What <span class="_ _1"></span><span class="ff3">fS <span class="_ _7"></span><span
                                                    class="ff5">FATCA <span class="_ _1"></span><span class="ff3">fB/DOrtfr/g* on
                                                    </span></span></span></span></div>
                                <div class="t m0 x32 h26 y1a0 ff3 fsb fc0 sc0 ls0 ws0">page 2 for further <span
                                    class="_ _1"></span>information.</div>
                                <div class="t m0 x6f h26 y1a1 ff3 fsb fc0 sc0 ls0 ws0">Cat. <span class="_ _8"></span>No. <span
                                    class="_ _1"></span>10231X</div>
                                <div class="t m0 x70 h26 y1a2 ff3 fsb fc0 sc0 ls0 ws0">Form W-9 (Rev. <span class="_ _8"></span>12-2014)
                                </div>
                                <div class="c x71 y1a3 w1a h37">
                                    <div class="t m0 x21 h2f y1a4 ff3 fs3 fc0 sc0 ls0 ws0">Note. <span class="_ _8"></span>If the <span
                                        class="_ _8"></span>account is <span class="_ _1"></span>in <span class="_ _8"></span>more
                                        <span class="_ _8"></span>than <span class="_ _1"></span>one <span class="_ _1"></span>name, see
                                        <span class="_ _8"></span>the instructions for <span class="_ _1"></span>line <span
                                            class="_ _1"></span>1 <span class="_ _1"></span>and <span class="_ _1"></span>the <span
                                                class="_ _1"></span>chart on <span class="_ _1"></span>page <span class="_ _8"></span>4 for
                                    </div>
                                    <div class="t m0 x21 h2f y1a5 ff3 fs3 fc0 sc0 ls0 ws0">guidelines on whose number to <span
                                        class="_ _b"> </span>enter.</div>
                                </div>
                                <div class="c x72 y1a6 w1b h38">
                                    <div class="t mb x21 h36 y1a7 ff4 fs3 fc0 sc0 ls0 ws0">Employer identification number</div>
                                </div>
                                <div class="c x73 y1a8 w1c h39">
                                    <div class="t mf x21 h35 y1a9 ff3 fs5 fc0 sc0 ls0 ws0">Certification</div>
                                </div>
                                <div class="c x71 y1aa w1d h3a">
                                    <div class="t m0 x21 h28 y1ab ff4 fsc fc0 sc0 ls0 ws0">SigFl</div>
                                    <div class="t m0 x16 h28 y1ac ff4 fsc fc0 sc0 ls0 ws0">Signature <span class="_ _7"></span>of</div>
                                    <div class="t m0 x21 h36 y1ad ff4 fs3 fc0 sc0 ls0 ws0">Here</div>
                                    <div class="t m5 x16 h2f y1ad ff4 fs3 fc0 sc0 ls0 ws0">u.S. person <span class="_ _0"></span><span
                                        class="ff3">•</span></div>
                                </div>
                                <div class="c x74 y1ae w1e h3b">
                                    <div class="t m1 x21 h26 y1af ff3 fsb fc0 sc0 ls0 ws0">Date •</div>
                                </div>
                                <div class="c x75 y1b0 w1f h3c">
                                    <div class="t m15 x76 h1e y1b1 ff3 fs6 fc0 sc0 ls0 ws0">Pnnt or type</div>
                                    <div class="t m16 x19 h1e y1b2 ff3 fs6 fc0 sc0 ls0 ws0">See</div>
                                    <div class="t m15 x19 h1e y1b3 ff3 fs6 fc0 sc0 ls0 ws0"> </div>
                                    <div class="t m17 x19 h1e y1b4 ff3 fs6 fc0 sc0 ls0 ws0">Speci<span class="_ _1"></span>fic</div>
                                    <div class="t m18 x19 h1e y1b5 ff3 fs6 fc0 sc0 ls0 ws0">T</div>
                                    <div class="t m15 x19 h1e y1b6 ff3 fs6 fc0 sc0 ls0 ws0"> </div>
                                    <div class="t m19 x19 h1e y1b7 ff3 fs6 fc0 sc0 ls0 ws0">ns</div>
                                    <div class="t m1a x19 h1e y1b8 ff3 fs6 fc0 sc0 ls0 ws0">w</div>
                                    <div class="t m19 x19 h1e y1b9 ff3 fs6 fc0 sc0 ls0 ws0">t</div>
                                    <div class="t m15 x19 h1e y1ba ff3 fs6 fc0 sc0 ls0 ws0"> <span class="_ _2"></span>ctions </div>
                                    <div class="t m1b x19 h1e y1bb ff3 fs6 fc0 sc0 ls0 ws0">on</div>
                                    <div class="t m15 x19 h1e y1bc ff3 fs6 fc0 sc0 ls0 ws0"> </div>
                                    <div class="t m1c x19 h1e y1bd ff3 fs6 fc0 sc0 ls0 ws0">pag</div>
                                </div>
                            </div>
                            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                        </div>
                    </div>
                    <div class="loading-indicator">

                    </div>
                </div>

                <button onClick={this.generatePDF}>Generate PDF</button>
            </>

        );
    }
}

export default ServiceAgreementPdf;