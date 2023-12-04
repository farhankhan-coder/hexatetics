import React, {useEffect, useState} from 'react';
import SignatureGrid from './SignatureGrid';
import generateSignatureImage from './generateSignatureImage';
import {InputText} from "primereact/inputtext";

const SignatureComponent = ({signatureText, setSignature}) => {
    const [text, setText] = useState(signatureText || 'Signature');
    const [signatures, setSignatures] = useState([]);
    const [selectedSignature, setSelectedSignature] = useState(null);

    const fontFamilies = ['cursive', 'serif', 'sans-serif', 'Courier New', 'Impact'];

    useEffect(() => {
        if (text?.trim() === '') {
            setSignature(null);
            setSelectedSignature(null);
        }
        generateSignatures();
    }, [text]);

    const generateSignatures = async () => {
        const generatedSignatures = [];

        for (const fontFamily of fontFamilies) {

            const newSignature = {
                id: fontFamily + text,
                text: text,
                fontFamily: fontFamily,
            };
            generatedSignatures.push(newSignature);
        }

        setSignatures(generatedSignatures);
    };

    const handleSignatureSelect = async (signature, element) => {
        if (text?.trim() != '') {
            const image = await generateSignatureImage(element);
            setSignature(image);
            setSelectedSignature(signature);
        }
    };

    return (
     <div>
         <div className="m-3">
             <InputText value={text} onChange={(e) => setText(e.target.value)}/>
         </div>
         <div className="m-3">
             <SignatureGrid
              signatures={signatures}
              selectedSignature={selectedSignature}
              onSignatureSelect={handleSignatureSelect}
             />
         </div>
     </div>
    );
};

export default SignatureComponent;
