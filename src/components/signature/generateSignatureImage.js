import * as htmlToImage from "html-to-image";

const generateSignatureImage = async (element) => {

    try {
        const dataUrl = await htmlToImage.toPng(element);
        console.log(element);
        return dataUrl;
    } catch (error) {
        console.error('Error generating signature image:', error);
        return null;
    }
};

export default generateSignatureImage;
