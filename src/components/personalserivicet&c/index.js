import React, { useState } from "react";
// import "../reportpdftemplate/base.min.css";
// import "../reportpdftemplate/fancy.min.css";
// import "../reportpdftemplate/main.css";
import { Checkbox } from "primereact/checkbox";
import { toast } from "react-toastify";

const PsaTermsAndConditions = (props) => {
  
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(props.checkBox);
  const [isChecked3, setIsChecked3] = useState(props.checkBox);
  const [isChecked4, setIsChecked4] = useState(props.checkBox);
  const [isChecked5, setIsChecked5] = useState(props.checkBox);
  const [isChecked6, setIsChecked6] = useState(props.checkBox);

  const [checkYes1, setCheckYes1] = useState(false);
  const [checkNo1, setCheckNo1] = useState(false);
  const [checkYes2, setCheckYes2] = useState(false);
  const [checkNo2, setCheckNo2] = useState(false);
  const [checkYes3, setCheckYes3] = useState(false);
  const [checkNo3, setCheckNo3] = useState(false);



  const handleTermsCondition = () => {
    console.log(555, isChecked1);
    if (!isChecked1) {
      toast.error("Please Accept Terms And Conditions");
      return;
    } else {
      props.setShowPreviewPopUp(false);
      props.SetBasicInfoPopUp(false);
      props.setPartyDetailesPopUp(false);
      props.SetAttchmentAndDetailes(false);
      props.SetTermsAndConditions(false);
      props.SetW9Detailes(false);
      props.setEddDetailes(true);
      props.SetTermsAndConditionsCheck(isChecked1)
    }
  };

  //   async function OpenDocument(filePath) {
  //     filePath = filePath.replace("public/", "");
  //     filePath = "public/" + filePath
  //     let filePathURL = await GetAWSObjectURL(filePath);

  //     //const imageBlob = await fetch(filePathURL).then(response => response.blob());
  //     //const url = window.URL.createObjectURL(imageBlob);

  //     const link = document.createElement("a");
  //     link.href = filePathURL;
  //     link.target = "_blank";
  //     // link.download = "";
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   }

  return (
    <>
      <div id="my-html-template">
        <div>
          <div id="outline"></div>
        </div>
        <div>
          <div className="bg-white py-5 px-2">
            <div className="absolute bottom-0 right-0 left-0 grid grid-cols-2">
              <div>
                <a
                  href="#"
                  onClick={() => {
                    setShowPreviewPopUp(false);
                    SetBasicInfoPopUp(false);
                    setPartyDetailesPopUp(false);
                    SetAttchmentAndDetailes(true);
                    SetTermsAndConditions(false);
                    SetW9Detailes(false);
                    SetEddDetailes(false);
                  }}
                  className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                >
                  <i className="gusd-arrow-line-right mr-1"></i>Previous
                </a>
              </div>
              <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                <a
                  href="javascript:void(0);"
                  className="flex items-center text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                >
                  <i
                    className="pi pi-save mr-1"
                    style={{ fontSize: "0.8rem" }}
                  ></i>
                  Saves
                </a>

                <a
                  href="#"
                  onClick={handleTermsCondition}
                  className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                >
                  <i className="gusd-check mr-1"></i>Nextttt
                </a>
              </div>
            </div>
          </div>
          {props.TandC === "true" ? (
            <>
              <div id="pf3" class="pf pdfheiht" data-page-no="3">
                <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
                  <div className="text-[24px] text-center xl:text-[1.250vw] font-semibold mb-5">
                    GENERAL TERMS AND CONDITIONS
                  </div>
                  <div className="space-y-2">
                    <div>
                      1. <b>PROPOSAL ACCEPTANCE.</b> Proposals are subject to
                      acceptance by the signing of a contract and issuance of an
                      appropriate purchase order at any time within sixty (60)
                      days after the receipt of quotes unless otherwise
                      stipulated. The District reserves the right to accept or
                      reject any and all quotes and reserves the right to waive
                      any informality in any quote.
                    </div>
                    <div>
                      2. <b>EQUIPMENT AND LABOR.</b> The Provider shall furnish
                      all tools, equipment, apparatus, facilities,
                      transportation, labor, and material necessary to furnish
                      the professional services herein described, the services
                      to be performed at such time and places as directed by and
                      subject to the approval of the authorized district
                      representative indicated in the work specifications
                      attached hereto.
                    </div>
                    <div>
                      3. <b>SAFETY AND SECURITY.</b> It shall be the
                      responsibility of the Provider to ascertain from the
                      District the rules and regulations pertaining to safety,
                      security and driving on school grounds, particularly when
                      children are present.
                    </div>
                    <div>
                      4. <b>TERMINATION.</b> This Contract may be terminated at
                      any time by either party with five (5) business days'
                      advance written notice.
                    </div>
                    <div>
                      5. <b>DEFAULT BY PROVIDER.</b> When Provider shall fail to
                      deliver any article or service or shall deliver any
                      article or service which does not conform to the work
                      specifications, the District may, upon five (5) business
                      days' prior written notice describing the fault, at its
                      option, annul and set aside the contract entered into with
                      said Provider and make and enter into a new contract in
                      such manner as seems to the Board of Education to be to
                      the best advantage of the District. Any failure for
                      furnishing such articles or services by reason of the
                      failure of the Provider as above stated, shall be a
                      liability against the Provider and his sureties. The Board
                      of Education reserves the right to cancel any articles or
                      services which the Provider may be unable to furnish
                      because of economic conditions, governmental regulations
                      or other similar causes beyond the control of the Provider
                      provided satisfactory proof is furnished to the Board of
                      Education, if requested.
                    </div>
                    <div>
                      6. <b>CONTRACT CHANGES.</b> No changes or alterations to
                      this contract shall be made without specific prior written
                      approval by the District.
                    </div>
                    <div>
                      7. <b>SUBSTITUTIONS.</b> No substitutions of materials or
                      service from those specified in the Scope of Work shall be
                      made without the prior written approval of the District.
                    </div>
                    <div>
                      8. <b>ACCESS TO WORK.</b> District representatives shall
                      at all times have access to work wherever it is in
                      preparation or progress.
                    </div>
                    <div>
                      9. <b>PROTECTION OF WORK AND PROPERTY.</b> The Provider
                      shall maintain at all times, as required by conditions and
                      progress of work, all necessary safeguards for the
                      protection of employees and the public. In an emergency
                      affecting life and safety of life or of work or of
                      adjoining property, Provider, without special instruction
                      or authorization from District, is permitted to act at his
                      discretion to prevent such threatened loss or injury.
                    </div>
                    <div>
                      10. <b>ASSIGNMENT OF CONTRACT AND PUCHASE ORDER.</b> The
                      Provider shall not assign or transfer by operation of law
                      or otherwise any or all of its rights, burdens, duties, or
                      obligations under this contract without the prior written
                      consent of the District.
                    </div>
                    <div>
                      11. <b>FORCE MAJEURE CLAUSE.</b> The parties to the
                      Contract shall be excused from performance thereunder
                      during the time and to the extent that they are prevented
                      from obtaining, delivering, or performing by act of God,
                      fire, strike, loss, or shortage of transportation
                      facilities, lock-out commandeering of materials, products,
                      plants or facilities by the government when satisfactory
                      evidence thereof is presented to the other party(ies),
                      provided that it is satisfactorily established that the
                      non-performance is not due to the fault or neglect of the
                      party not performing.
                    </div>
                    <div>
                      12. <b>HOLD HARMLESS AGREEMENT.</b> The Provider shall
                      save, defend, hold harmless and indemnify the District
                      from and against any and all losses, damages, liabilities,
                      claims, and costs of whatsoever kind and nature for injury
                      to or death of any person and for loss or damage to any
                      property occurring in connection with or in any way
                      incident to or arising out of the occupancy, use, service,
                      operations, or performance of work on the property under
                      the terms of this contract, resulting in whole or in part
                      from the negligent acts or omissions of the Provider, any
                      subproviders, or any employee, agent or representative of
                      Provider and/or its subproviders.
                    </div>
                    <div>
                      13. <b>PAYMENT.</b> Unless otherwise specified, the
                      Provider shall render invoices in triplicate for materials
                      delivered or services performed under the
                      Contract/Purchase Order. The District shall make payment
                      for materials, supplies or other services furnished under
                      this Contract as agreed within thirty (30) days after
                      delivery to and approval by the authorized District
                      representative of all invoices and other documentary
                      evidence reasonably required by the District (which
                      approval shall not be unreasonably withheld).
                    </div>
                    <div>
                      14. <b>PERMITS AND LICENSES.</b> The Provider shall secure
                      and maintain in force, at Provider's sole cost and
                      expense, such licenses and permits as are required by law,
                      in connection with the furnishing of services, materials,
                      or supplies herein listed.
                    </div>
                    <div>
                      15.{" "}
                      <b>
                        PROVIDER NOT OFFICER, EMPLOYEE, OR AGENT OF DISTRICT.
                      </b>{" "}
                      While engaged in carrying out other terms and conditions
                      of the purchase order, the Provider is an independent
                      Provider, and not an officer, employee, agent, partner, or
                      joint venture of the District.
                    </div>
                    <div>
                      16. <b>ANTI-DISCRIMINATION.</b> Pursuant to Board Policy
                      4030, Glendale Unified School District prohibits
                      discrimination and/or harassment of any person based on
                      race, color, national origin, ancestry, religious creed,
                      age, marital status, pregnancy, physical or mental
                      disability, medical condition, genetic information,
                      veteran status, gender, gender identity, gender
                      expression, sex or sexual orientation. Therefore, the
                      Provider agrees to comply with the applicable Federal and
                      California Laws, including, but not limited to, the
                      California Fair Employment Practice Act, beginning with
                      Labor Code, Section 1410 and Labor Code, Section 1735. In
                      addition, the Provider agrees to require such compliance
                      by all subproviders employed on the Contract by him.
                    </div>
                    <div>
                      17. <b>PROVIDER'S INSURANCE.</b> The Provider shall not
                      commence work under this Contract until he has obtained
                      the insurance required under this paragraph and
                      satisfactory proof of such insurance has been submitted to
                      District and said insurance has been approved by the
                      District. Except for worker's compensation insurance, the
                      policy shall not be amended or modified and the coverage
                      amounts shall not be reduced without the District's prior
                      written consent, and, the District shall be named as an
                      additional insured and be furnished thirty (30) days
                      written notice prior to cancellation. In the event that
                      the insurance requirements cannot be met, please turn in a
                      signed "Hold Harmless and Indemnification Agreement."
                    </div>
                  </div>
                </div>

                <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
                  <div className="space-y-2 border-b-[2px] border-[#344054] pb-2">
                    <div>
                      <span className="pl-2">a) </span>{" "}
                      <b>
                        PROVIDER'S PUBLIC LIABILITY AND PROPERTY DAMAGE
                        INSURANCE.
                      </b>{" "}
                      The Provider shall procure and shall maintain during the
                      life of his contract, Provider's Public Liability
                      Insurance in an amount not less than $1,000,000 for
                      injuries, including accidental death to any one person,
                      and subject to the limit for each person, in an amount not
                      less than $1,000,000 on account of one accident, and
                      Provider's Property Damage Insurance in an amount not less
                      than $1,000,000.
                    </div>
                    <div>
                      18. <b>COMPLIANCE WITH LAWS.</b> Provider shall give all
                      notices and comply with all laws, ordinances, rules and
                      regulations bearing on conduct or work as indicated or
                      specified. If Provider observes that any of the work
                      required by this contract is at variance with any such
                      laws, ordinances, rules or regulations, Provider shall
                      notify the District, in writing, and, at the sole option
                      of the District, any necessary changes to the scope of
                      work shall be made and this Contract shall be
                      appropriately amended in writing, or this Contract shall
                      be terminated effective upon Provider's receipt of a
                      written termination notice from the District. If Provider
                      performs any work knowing it to be in violation of such
                      laws, ordinances, rules or regulations, and without first
                      notifying the District of such violation, Provider shall
                      bear all costs arising there from.
                    </div>
                    <div>
                      19. <b>TIME IS OF THE ESSENCE.</b> Time is of the essence
                      in the performance of and compliance with each of the
                      provisions and conditions of this contract.
                    </div>
                    <div>
                      20. <b>GOVERNING LAW.</b> This contract shall be governed
                      by and construed in accordance with the laws of the State
                      of California.
                    </div>
                    <div>
                      21. <b>ATTORNEYS' FEES.</b> If any action is brought by
                      either party against the other party hereunder, each party
                      shall be responsible for its own expenses, including legal
                      and accounting fees, in connection with the prosecution or
                      defense of such action.
                    </div>
                    <div>
                      22. <b>NO ORAL MODIFICATION.</b> Any waiver, amendment,
                      modification, consent or acquiescence with respect to this
                      contract or any provision of this contract or with respect
                      to any failure to perform in accordance therewith shall be
                      set forth in writing and duly executed by or on behalf of
                      the party to be bound thereby.
                    </div>
                    <div>
                      23. <b>PROVISIONS REQUIRED BY LAW DEEMED INSERTED.</b>{" "}
                      Each and every provision of law and clause required by law
                      to be inserted in this contract shall be deemed to be
                      inserted herein and this contract shall be read and
                      enforced as though it were included herein.
                    </div>
                    <div>
                      24. <b>FINGERPRINTING.</b> The Provider shall be
                      fingerprinted before commencing services of this Contract.
                      The cost shall be covered by the District.
                    </div>
                    <div>
                      25. <b>TUBERCULOSIS TESTING.</b> Before commencing
                      services, Provider, if working with or near students,
                      shall provide proof of Tuberculosis (TB) testing at their
                      own expense to the Human Resources Department. The TB test
                      must have been conducted within the prior six months to
                      the Contract effective date.
                    </div>
                    <div>
                      26. <b>COVID-19 VACCINATION STATUS.</b> Before commencing
                      services, Provider, if working with or near students,
                      shall provide proof that they are fully vaccinated for
                      COVID-19 within two weeks prior to starting to provide
                      services at a District school site to the Human Resources
                      Department.
                    </div>
                    <div>
                      27. <b>IF WORKING WITH STUDENTS.</b> Any Provider working
                      with a student(s) must be supervised by a credentialed
                      person or must hold an Activity Supervisor Clearance
                      Certificate issued through the California Commission on
                      Teacher Credentialing (CTC).
                    </div>
                    <div>
                      28. <b>TOBACCO/ALCOHOL/DRUG-FREE WORKPLACE.</b> Pursuant
                      to Board Policies 4020 and 4021, Glendale Unified School
                      District is a tobacco, alcohol, and drug-free district.
                      The Provider shall not use or be under the influence of
                      these substances while on District property or during the
                      performance of the services of this Contract. Violation of
                      this policy will result in immediate removal of the
                      Provider from his or her duties and possible immediate
                      termination of this Contract.
                    </div>
                    <div>
                      29. <b>GOVERNOR'S EXECUTIVE ORDER.</b> California Governor
                      Newsom issued Order N-6-22 requiring compliance with the
                      federal Economic Sanction imposed in response to Russia's
                      action in Ukraine. See attached Certification.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-18 flex items-center terms_section">
                <div class="flex items-center flex-row">
                  <input
                    type="checkbox"
                    id="cb1"
                    value="cb1"
                    class="appearance-none h-4 w-4 bg-white border border-[#D0D5DD] rounded-[4px] checked:bg-[#113699] checked:scale-75 transition-all duration-200 peer"
                    checked={isChecked1}
                    onChange={(e) => setIsChecked1(e.target.checked)}
                  />

                  <div class="h-4 w-4 absolute rounded-[4px] pointer-events-none peer-checked:border-[#113699] peer-checked:border-2"></div>
                  <label
                    for="cb1"
                    class="flex flex-col justify-center px-2 text-[#344054] font-medium text-sm xl:text-[0.833vw] select-none"
                  >
                    Accept Terms and Conditions{" "}
                  </label>
                </div>
                <div className="text-[#667085] text-xs font-normal">
                  <span className="text-[#F00]">*</span>
                  {/* Please fill in the details in both forms and upload them for
                  submission */}
                </div>
              </div>
            </>
          ) : null}

          {props.supplimentAndAgreement === "true" ? (
            <>
              <div class="pf pdfheiht">
                <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
                  <div className="text-center mb-3">
                    <div className="text-[24px] text-center xl:text-[1.250vw] font-semibold ">
                      SUPPLEMENTAL AGREEMENT
                    </div>
                    <div>Specialized Services for Students and Families</div>
                  </div>
                  <div className="mb-3 ">
                    <b>The undersigned Agrees as follows:</b>
                  </div>
                  <div className=" ">
                    <div className="space-y-2">
                      <div>
                        1. To cooperate with school personnel to ensure fair and
                        equitable availability of services to all families.
                      </div>
                      <div>
                        2. To support District and school policies and
                        standards.
                      </div>
                      <div>
                        3. To work with groups of students and/or parents when
                        possible to ensure that as many families are served as
                        possible. Marital counseling is not an expected use of
                        school-based clinical staff.
                      </div>
                      <div>
                        4. To refer students and families in need of (in-depth,
                        long-term) specialized services to appropriate community
                        agencies whenever possible. It is inappropriate for a
                        clinic to refer its own agency unless comparable
                        services are not available elsewhere or the family
                        specifically requests services offered by clinician
                        (which should be documented along with referrals to
                        alternative agencies).
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        5. To provide licensed personnel or fully-supervised
                        interns for all
                      </div>
                      <div>
                        6. To maintain appropriate insurance as required by the
                        District.
                      </div>
                      {/* <div className="grid grid-cols-2 gap-2 ">
                        <div className="text-center mt-10">
                          <div>__________________</div>
                          <div>Signature</div>
                        </div>
                        <div className="text-center mt-10">
                          <div>___________________</div>
                          <div>Date</div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-18 flex items-center">
                <div class="flex items-center flex-row">
                  <input
                    type="checkbox"
                    id="cb1"
                    value="cb1"
                    class="appearance-none h-4 w-4 bg-white border border-[#D0D5DD] rounded-[4px] checked:bg-[#113699] checked:scale-75 transition-all duration-200 peer"
                    checked={isChecked2}
                    onChange={() => setIsChecked2(!isChecked2)}
                  />
                  <div class="h-4 w-4 absolute rounded-[4px] pointer-events-none peer-checked:border-[#113699] peer-checked:border-2"></div>
                  <label
                    for="cb1"
                    class="flex flex-col justify-center px-2 text-[#344054] font-medium text-sm xl:text-[0.833vw] select-none"
                  >
                    Accept Supplemental Agreement{" "}
                  </label>
                </div>
                <div className="text-[#667085] text-xs font-normal">
                  <span className="text-[#F00]">*</span>
                </div>
              </div>
            </>
          ) : null}

          {props.HoldHarmlessAndIden === "true" ? (
            <>
              <div id="pf5" class="pf pdfheiht" data-page-no="5">
                <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
                  <div className="text-center mb-5">
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                      Glendale Unified School District
                    </div>
                    <div className="text-[15px] xl:text-[0.781vw] font-semibold mb-5">
                      Glendale, California
                    </div>
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                      HOLD HARMLESS AND INDEMNIFICATION AGREEMENT
                    </div>
                  </div>
                  <div>
                    Provider agrees at all times to protect, indemnify, and hold
                    the Glendale Unified School District, its Board of Trustees,
                    sofficers, employees, members, representatives, agents,
                    guests, invitee, and/or employees free and harmless, and to
                    provide legal defense, from any and all liabilities, claims,
                    losses, judgments, damage, demands or expenses resulting
                    from the services provided by the Provider, Provider's use
                    or occupancy of the District's facilities and premises
                    [including travel to and from said facilities and premises]
                    and/or the active or passive negligence of the Provider or
                    of the District, its Board of Trustees, officers, employees,
                    members, representatives, agents, guests, invitee, and/or
                    employees, specifically including, without limitation, any
                    liability, claim, loss, judgment, damage, demand, or
                    expense, arising by reason of:
                  </div>
                  <div className="space-y-2 px-8 mt-2">
                    <div className="flex gap-2">
                      <div>1.</div>
                      <div>
                        the loss of or damage to any of the District's
                        facilities or premises including any building,
                        structure, or improvement thereon, or any equipment to
                        be used therein;
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div>2.</div>
                      <div>
                        the injury to or death of any person including, but not
                        limited to, the officers, members, employees,
                        representatives, agents, guests, invitee, and/or
                        employees of the Provider or of the District; or
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div>3.</div>
                      <div>
                        damage to any property arising from the use, possession,
                        selection, delivery, return, condition or operation of
                        the District's facilities.
                        <div className="mt-2">
                          Provider further agrees to reimburse the District for
                          all liabilities, claims, losses, judgments, damage,
                          demands, expenses, fines, penalties, including
                          reasonable attorneys' fees imposed or incurred by the
                          District because of the Provider's use or occupancy of
                          the District's facilities, access to said facilities
                          and premises, and/or active or passive negligence of
                          the Provider or of the District, its Board of
                          Trustees, officers, members, representatives, agents,
                          guests, invitee, and/or employees.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    THE UNDERSIGNED HAS READ AND VOLUNTARILY SIGNS THE RELEASE
                    AND WAIVER OF LIABILITY AND INDEMNITY AGREEMENT, and further
                    agrees that no oral representation, statements of inducement
                    apart from the foregoing written agreement have been made.
                  </div>
                  <div className="mt-2">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                      <div className="space-y-10"></div>
                      {/* <div className="space-y-10">
                        <div>I HAVE READ THIS RELEASE.</div>
                        <div>
                          <div>_________________________</div>
                          <div>Signature of Provider</div>
                        </div>
                        <div>
                          <div>_________________________</div>
                          <div>Print Name</div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-18 flex items-center">
                <div class="flex items-center flex-row">
                  <input
                    type="checkbox"
                    id="cb1"
                    value="cb1"
                    class="appearance-none h-4 w-4 bg-white border border-[#D0D5DD] rounded-[4px] checked:bg-[#113699] checked:scale-75 transition-all duration-200 peer"
                    checked={isChecked3}
                    onChange={() => setIsChecked3(!isChecked3)}
                  />
                  <div class="h-4 w-4 absolute rounded-[4px] pointer-events-none peer-checked:border-[#113699] peer-checked:border-2"></div>
                  <label
                    for="cb1"
                    class="flex flex-col justify-center px-2 text-[#344054] font-medium text-sm xl:text-[0.833vw] select-none"
                  >
                    Accept Hold Harmless and Indemnification Agreement{" "}
                  </label>
                </div>
                <div className="text-[#667085] text-xs font-normal">
                  <span className="text-[#F00]">*</span>
                </div>
              </div>
            </>
          ) : null}

          {props.retiretmentStatus === "true" ? (
            <>
              <div id="pf6" class="pf pdfheiht" data-page-no="6">
                <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
                  <div className="text-center mb-10">
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                      Glendale Unified School District
                    </div>
                    <div className="text-[15px] xl:text-[0.781vw] font-semibold mb-5">
                      Glendale, California
                    </div>
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold mb-5">
                      Personal Services Agreement
                    </div>
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                      Retirement Status Statement
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="mb-4">
                      Are you a State Teachers Retirement System (STRS) retiree?
                      <span className="text-[#F00]">*</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-content-center gap-3 mb-10">
                    <div className="flex align-items-center">
                      <input
                        type="radio"
                        id="Yes"
                        name="Radio1"
                        value=""
                        disabled
                        onChange={(e) => setCheckYes1(e.checked)}
                        checked={props.strs == true}
                      />
                      <label for="html" className="ml-2">
                        Yes
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <input
                        type="radio"
                        id="No"
                        name="Radio1"
                        value=""
                        disabled
                        onChange={(e) => setCheckNo1(e.checked)}
                        checked={
                          props.strs !== undefined && props.strs == false
                        }
                      />
                      <label for="css" className="ml-2">
                        No
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="mb-4">
                      Are you a California Public Employees Retirement System
                      (CalPERS) retiree?<span className="text-[#F00]">*</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-content-center gap-3 mb-10">
                    <div className="flex align-items-center">
                      <input
                        type="radio"
                        id="Yes"
                        name="Radio2"
                        disabled
                        value=""
                        onChange={(e) => setCheckYes1(e.checked)}
                        checked={props.calpers == true}
                      />
                      <label for="html" className="ml-2">
                        Yes
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <input
                        type="radio"
                        id="No"
                        name="Radio2"
                        value=""
                        disabled
                        onChange={(e) => setCheckNo1(e.checked)}
                        checked={
                          props.calpers !== undefined && props.calpers == false
                        }
                      />
                      <label for="css" className="ml-2">
                        No
                      </label>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <div className="mb-4"> Are you a State Teachers Retirement System (STRS) retiree?</div>

                  </div>
                  <div className="flex flex-wrap justify-content-center gap-3 mb-10">
                    <div className="flex align-items-center">
                      <input type="radio" id="Yes" name="Radio3" value="" onChange={e => setCheckYes1(e.checked)} />
                      <label for="html">Yes</label>
                    </div>
                    <div className="flex align-items-center">
                      <input type="radio" id="No" name="Radio3" value="" onChange={e => setCheckNo1(e.checked)} />
                      <label for="css">No</label>
                    </div>
                  </div> */}

                  <div className="mb-28">
                    Note: The District will be reporting your earnings or hours
                    to the appropriate retirement system. You are responsible
                    for monitoring your work hours or earnings to make sure you
                    do not exceed your retirement limit.
                  </div>
                  {/* <div className="space-y-10">
                    <div>
                      <div>___________________________________</div>
                      <div>Name (Print)</div>
                    </div>
                    <div>
                      <div>___________________________________</div>
                      <div>Signature of Provider</div>
                    </div>
                    <div>
                      <div>___________________________________</div>
                      <div>Date</div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="mt-18 flex items-center">
                <div class="flex items-center flex-row">
                  <input
                    type="checkbox"
                    id="cb1"
                    value="cb1"
                    class="appearance-none h-4 w-4 bg-white border border-[#D0D5DD] rounded-[4px] checked:bg-[#113699] checked:scale-75 transition-all duration-200 peer"
                    checked={isChecked4}
                    onChange={() => setIsChecked4(!isChecked4)}
                  />
                  <div class="h-4 w-4 absolute rounded-[4px] pointer-events-none peer-checked:border-[#113699] peer-checked:border-2"></div>
                  <label
                    for="cb1"
                    class="flex flex-col justify-center px-2 text-[#344054] font-medium text-sm xl:text-[0.833vw] select-none"
                  >
                    {" "}
                  </label>
                </div>
                <div className="text-[#344054] font-medium text-[14px] xl:text-[0.833vw]">
                  <span className="text-[#F00]">*</span>Please select the
                  checkbox to confirm Retirement Status Statement
                </div>
              </div>
            </>
          ) : null}

          {props.certificationRegarding === "true" ? (
            <>
              <div id="pf7" class="pf pdfheiht" data-page-no="7">
                <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw] ">
                  <div className="text-center mb-10">
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                      Glendale Unified School District
                    </div>
                    <div className="text-[15px] xl:text-[0.781vw] font-semibold mb-5">
                      Glendale, California
                    </div>
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold mb-1">
                      CERTIFICATION REGARDING
                    </div>
                    <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                      <u> GOVERNOR EXECUTIVE ORDER N-6-22</u>
                    </div>
                  </div>

                  <div className="mb-2">
                    On March 4, 2022, California Governor Newsom issued Order
                    N-6-22 requiring state agencies to take steps to ensure any
                    agency and entity under contract with state agencies comply
                    with the Federal Order:
                  </div>
                  <div className="mb-4">
                    (
                    <u>
                      https://www.gov.ca.gov/wp-content/uploads/2022/03/3.4.22-Russia-Ukraine-Executive-Order.pdf;
                    </u>{" "}
                    "State Order").
                  </div>
                  <div className="mb-2">
                    if you enter into a contract with the District, you must
                    comply with the economic sanctions imposed in response to
                    Russia's actions in Ukraine, including the orders and
                    sanctions identified on the U.S. Department of the Treasury
                    website:
                  </div>
                  <div className="text-center mb-4">
                    (
                    <u>
                      https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions).
                    </u>
                  </div>
                  <div className="mb-4">
                    As part of this procurement,{" "}
                    <b>
                      if the contract value of this procurement is $5 million or
                      more,
                    </b>{" "}
                    please include in your Response the following:
                  </div>
                  <div className="space-y-2 px-8">
                    <div>
                      (1) a statement that you are in compliance with the
                      required economic sanctions of the Federal and State
                      Orders;
                    </div>
                    <div>
                      (2) the steps you have taken in response to Russia's
                      actions in Ukraine, including, but not limited to,
                      desisting from making new investments in, or engaging in
                      financial transactions with, Russian entities, not
                      transferring technology to Russia or Russian entities, and
                      directly providing support to the government and people of
                      Ukraine.
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-18 flex items-center">
                <div class="flex items-center flex-row">
                  <input
                    type="checkbox"
                    id="cb1"
                    value="cb1"
                    class="appearance-none h-4 w-4 bg-white border border-[#D0D5DD] rounded-[4px] checked:bg-[#113699] checked:scale-75 transition-all duration-200 peer"
                    checked={isChecked5}
                    onChange={() => setIsChecked5(!isChecked5)}
                  />
                  <div class="h-4 w-4 absolute rounded-[4px] pointer-events-none peer-checked:border-[#113699] peer-checked:border-2"></div>
                  <label
                    for="cb1"
                    class="flex flex-col justify-center px-2 text-[#344054] font-medium text-sm xl:text-[0.833vw] select-none"
                  >
                    {" "}
                  </label>
                </div>
                <div className="text-[#344054] font-medium text-[14px] xl:text-[0.833vw]">
                  <span className="text-[#F00]">*</span>Accept Terms and
                  Conditions (Certification Regarding Governor Executive order
                  N-6-22)
                </div>
              </div>
            </>
          ) : null}
          {props.eddw9 === "true" ? (
            <div>
              <div id="pf8" className="pdfheiht" data-page-no="8">
                <div className="text-[#101828] font-medium text-sm xl:text-[0.833vw] -tracking-[0.32px] mt-[22px] mb-[20px]">
                  EDD & W9 Details
                </div>
                <div className="grid grid-cols-2 xl:gap-[2.083vw] gap-[20px]">
                  {/*col*/}
                  <div>
                    <div className="text-[#101828] font-normal text-xs xl:text-[0.729vw] -tracking-[0.28px] leading-7 mb-1">
                      Upload Employment Development Department State of
                      California (EDD) form :{" "}
                    </div>
                    <div className="border-dashed border border-[#7093FF] bg-[rgba(234,239,255,0.25)] rounded-[10px] xl:p-[1.042vw] p-[18px]">
                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          class="flex flex-col items-center justify-center w-full cursor-pointer"
                        >
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="bg-[#F2F4F7] text-[#667085] border border-[#F9FAFB] rounded-full xl:p-[0.521vw] p-[8px]">
                              <i className="upload-cloud"></i>
                            </div>
                            <div className="mt-2">
                              <p class="mb-2 text-sm text-[#667085]">
                                <span class="font-semibold text-[#113699]">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p class="text-xs text-[#667085]">
                                SVG, PNG, JPG, GIF or PDF (MAX. 800x400px)
                              </p>
                            </div>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex justify-between items-center mt-[20px] pt-[20px] border-t border-[rgba(112,147,255,0.26)]">
                        <div className="flex items-center gap-2">
                          <div className="bg-white border border-[#DDE8EB] py-2 px-1 pdf_shadow rounded-md">
                            <i className="PDF_file_Icon"></i>
                          </div>
                          <div>
                            <div
                              className="text-[#101828] text-sm xl:text-[0.833vw] font-medium -tracking-[0.32px]"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const filePath =
                                  "psaconsultant/" +
                                  props.psaConsultantId +
                                  "/document/psaparty/" +
                                  props.pSAPartyFileName;
                                props?.pSAPartyFileName &&
                                  OpenDocument(filePath);
                              }}
                            >
                              {/*EDD Form .pdf{" "} */}
                              {props.pSAPartyFileName}
                            </div>
                            <div className="text-[#667085] text-xs xl:text-[0.677vw] font-normal -tracking-[0.24px]">
                              1.34 MB
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-[#3366FF] text-xs xl:text-[0.729vw] font-medium -tracking-[0.28px]">
                          <i className="Download_Icon"></i>
                          <span>Download</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div>
                    <div className="text-[#101828] font-normal text-xs xl:text-[0.729vw] -tracking-[0.28px] leading-7 mb-1">
                      Upload W9 Form (Request for Taxpayer Identification Number
                      and Certification) :
                    </div>
                    <div className="border-dashed border border-[#7093FF] bg-[rgba(234,239,255,0.25)] rounded-[10px] xl:p-[1.042vw] p-[18px]">
                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          class="flex flex-col items-center justify-center w-full cursor-pointer"
                        >
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="bg-[#F2F4F7] text-[#667085] border border-[#F9FAFB] rounded-full xl:p-[0.521vw] p-[8px]">
                              <i className="upload-cloud"></i>
                            </div>
                            <div className="mt-2">
                              <p class="mb-2 text-sm text-[#667085]">
                                <span class="font-semibold text-[#113699]">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p class="text-xs text-[#667085]">
                                SVG, PNG, JPG, GIF or PDF (MAX. 800x400px)
                              </p>
                            </div>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex justify-between items-center mt-[20px] pt-[20px] border-t border-[rgba(112,147,255,0.26)]">
                        <div className="flex items-center gap-2">
                          <div className="bg-white border border-[#DDE8EB] py-2 px-1 pdf_shadow rounded-md">
                            <i className="PDF_file_Icon"></i>
                          </div>
                          <div>
                            <div
                              className="text-[#101828] text-sm xl:text-[0.833vw] font-medium -tracking-[0.32px]"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const filePath =
                                  "psaconsultant/" +
                                  props.psaConsultantId +
                                  "/document/psaparty/" +
                                  props.pSAPartyFileName2;
                                props?.pSAPartyFileName2 &&
                                  OpenDocument(filePath);
                              }}
                            >
                              {/*W9 Form .pdf{" "} */}
                              {props.pSAPartyFileName2}
                            </div>
                            <div className="text-[#667085] text-xs xl:text-[0.677vw] font-normal -tracking-[0.24px]">
                              1.34 MB
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-[#3366FF] text-xs xl:text-[0.729vw] font-medium -tracking-[0.28px]">
                          <i className="Download_Icon"></i>
                          <span>Download</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*col*/}
                </div>
              </div>
              <div className="mt-18 flex items-center">
                <div class="flex items-center flex-row">
                  <input
                    type="checkbox"
                    id="cb1"
                    value="cb1"
                    class="appearance-none h-4 w-4 bg-white border border-[#D0D5DD] rounded-[4px] checked:bg-[#113699] checked:scale-75 transition-all duration-200 peer"
                    checked={isChecked6}
                    onChange={() => setIsChecked6(!isChecked6)}
                  />
                  <div class="h-4 w-4 absolute rounded-[4px] pointer-events-none peer-checked:border-[#113699] peer-checked:border-2"></div>
                  <label
                    for="cb1"
                    class="flex flex-col justify-center px-2 text-[#344054] font-medium text-sm xl:text-[0.833vw] select-none"
                  >
                    {" "}
                  </label>
                </div>
                <div className="text-[#344054] font-medium text-[14px] xl:text-[0.833vw]">
                  <span className="text-[#F00]">*</span>Please select the
                  checkbox to confirm that you have filled out and uploaded the
                  W9 and EDD forms
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div class="loading-indicator"></div>
      </div>
    </>
  );
};

export default PsaTermsAndConditions;
