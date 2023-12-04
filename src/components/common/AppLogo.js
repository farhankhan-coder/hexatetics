import { useSelector } from 'react-redux';
import darkLogoImg from '../../assets/images/login-logo.png'
import whiteLogoImg from '../../assets/images/login-logo.png'

export default function AppLogo() {
    const currentThemeValue = useSelector((state) => state.currentTheme.value);
    return (
       <img  src={currentThemeValue === undefined ? darkLogoImg : currentThemeValue === "W" ? darkLogoImg :  whiteLogoImg} alt="" />
      
    )
}