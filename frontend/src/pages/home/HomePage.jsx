import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import HeroSection from "../../components/HeroSection";
import HowItWork from "../../components/HowItWork";
import PopularCategories from "../../components/PopularCategories";
import PopularCompanies from "../../components/PopularCompanies";



const HomePage = () => {
  const {userInfo} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(!userInfo){
      navigate("/login")
    }
  }, [userInfo, navigate]);


  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWork />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
}

export default HomePage