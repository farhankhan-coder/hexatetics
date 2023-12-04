import googleImg from '../../assets/images/gmail.png'
import { Link } from "react-router-dom";

export default function GoogleSignIn() {
    return (
        <Link className="shadowgooglebtn text-[16px] mb-8 flex flex-wrap flex-row align-center justify-center font-semibold border border-[#E8F0F3] rounded-lg p-3 dark:bg-[#403E3C] dark:border-[#403E3C] dark:text-[#F8F8F8]">
            <img className="mr-3" src={googleImg} alt="" width="20" style={{height:20}} />
            Sign in with Google
        </Link>
    )
}