export default function ValidateImage(file) {
   
    if(!file.match(/\.(jpg|jpeg|png|gif)$/)){
        return false;
    }else{
        return true;
    }
};