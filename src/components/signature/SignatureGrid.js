import React, {useRef, createRef} from 'react';
import { Card } from 'primereact/card';

const SignatureGrid = ({ signatures, selectedSignature, onSignatureSelect }) => {
    const currentElement = useRef([]);
    currentElement.current = signatures.map((element, i) => currentElement.current[i] ?? createRef());

    return (
     <div className="signature-grid">
         {signatures.map((signature, index) => (
          <Card
           key={signature.id}
           className={`signature-card${selectedSignature && selectedSignature.id === signature.id ? ' selected' : ''}`}
           onClick={() => onSignatureSelect(signature, currentElement.current[index].current)}
          >
              <div className="signature-card-content">
                 <div ref={currentElement.current[index]} style={{fontFamily: signature.fontFamily, fontSize: "24px"}}>
                     {signature.text}
                 </div>
              </div>
          </Card>
         ))}
     </div>
    );
};

export default SignatureGrid;