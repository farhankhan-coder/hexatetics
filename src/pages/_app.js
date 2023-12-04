import '@/styles/globals.css';
import '@/styles/App.css'
import '@/styles/nstyle.css'
import '@/styles/Loginpage.css';
import '@/styles/vkstyle.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";   
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'next-themes'


export default function App({ Component, pageProps }) {
  return <main>
      <ThemeProvider attribute="class">
        <Component {...pageProps} /><ToastContainer autoClose={500} />
      </ThemeProvider>
    </main>
}





