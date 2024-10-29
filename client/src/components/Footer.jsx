import facebook from '../assets/images/icon_facebook.svg';
import linkedin from '../assets/images/icon_linkedin.svg';
import youtube from '../assets/images/icon_youtube.svg';
import instagram from '../assets/images/icon_instagram.svg';

export const Footer = () => {
    return (
      <footer className= "flex flex-row justify-between lg:m-12 m-6">

        <p className="text-light text-xs lg:text-base">©2024 Cookinando</p>

        <div className= "flex flex-row lg:space-x-6 space-x-3">
          <a href = "https://www.facebook.com/"> <img className="lg:h-7 h-5 mt-0.5" src={facebook} alt="Logo de Facebook"/></a>
          <a href = "https://www.linkedin.com/"> <img className="lg:h-8 h-6" src={linkedin} alt="Logo de Linkedin" /> </a>
          <a href = "https://www.youtube.com/"> <img className="lg:h-5 h-4 lg:mt-1.5 mt-1" src={youtube} alt="Logo de Youtube" /> </a>
          <a href = "https://www.instagram.com/"> <img className="lg:h-7 h-5 mt-0.5" src={instagram} alt="Logo de Instagram" /> </a>
        </div>
        
      </footer>
    );
  };
  
