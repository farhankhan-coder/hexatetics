export async function dataURLtoBlob(dataURL) {
    function getMimeType(dataURL) {
        const match = dataURL.match(/^data:(.*?);/);
        return match ? match[1] : '';
    }

    const base64Data = dataURL.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    return new Blob([new Uint8Array(byteArrays)], { type: getMimeType(dataURL) });
}

export async function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.readyState === FileReader.DONE) {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to read the Blob.'));
            }
        };

        reader.readAsDataURL(blob);
    });
}