import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import SignatureComponent from "./signatureComponent";

const SignatureDialog = ({username, isVisible, onClickHandler, onCloseHandler}) => {

    const [signatureImage, setSignatureImage] = useState(null);

    const renderDialogFooter = () => {
        return (
         <div>
             <Button label="Submit" disabled={signatureImage == null} onClick={() => onClickHandler(signatureImage)} className="p-button-primary"/>
             <Button label="Cancel" onClick={onCloseHandler} className="p-button-secondary"/>
         </div>
        );
    };

    return (
     <Dialog
      header="Add Signature"
      visible={isVisible}
      onHide={onCloseHandler}
      footer={renderDialogFooter}
      style={{ width: '50vw' }}
     >
         <div className="m-0">
             <div className="p-5 overflow-auto h-[600px]">
                 <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                     <SignatureComponent
                      signatureText={username}
                      setSignature={setSignatureImage}
                     />
                 </div>
             </div>
         </div>
     </Dialog>
    );
};

export default SignatureDialog;
