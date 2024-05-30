import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardRight from "../components/CardRight";
import CardLeft from "../components/CardLeft";
import Card from "../components/Card";
import Section from "../components/Section";
import SwiperSlider from "../components/SwiperSlider";
import LogoSlider from "../components/LogoSlider";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import Section_two from "../components/Section_two";
import TrendingCard from "../components/TrendingCard";
import HeroSection from "../components/HeroSection";
library.add(fas, fab);

const options = [
  { value: "noida sec 44", label: "Noida Sec 44" },
  { value: "Siddharth Vihar", label: "Siddharth Vihar" },
  { value: "lucknow", label: "Lucknow" },
];
const cities = [
  { value: "delhi", label: "Delhi" },
  { value: "noida", label: "Noida" },
  { value: "gaziabad", label: "Gaziabad" },
];

function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [heroImage, setHeroImage] = useState("");
  const [heroText, setHeroText] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [twoSectionsData, setTwoSectionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://whitehat.realty/api/v1/get-home-data");
        const data = await response.json();
        const heroData = data.api_data.heroSection;
        const insightsData = data.api_data.insights;
        const twoValuesData = data.api_data.twoValuesSystem;

        setHeroImage(heroData.hero_image);
        setHeroText(heroData.title);
        setApiData(insightsData.reverse());
        setTwoSectionsData(twoValuesData);

        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      width: "100%",
      height: 56,
      fontSize: "14px",
      borderRadius: 999,
      border: "none",
      boxShadow: "none",
      "@media (max-width: 768px)": {
        height: "40px",
      },
      "&:hover": {
        border: "none",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#1b5577",
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "red" : "gray",
      "&:hover": {
        color: "red",
      },
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: 14,
      color: "#1b5577",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 150,
      overflowY: "auto",
      borderRadius: "10px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1b5577",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: state.isSelected ? "black" : "",
      backgroundColor: state.isSelected ? "lightgray" : "white",
      "&:hover": {
        backgroundColor: "lightgray",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#1b5577",
    }),
  };

  return (
    <div className="bg-[url(background3.jpg)]">
      <HeroSection
        heroImage={heroImage}
        heroText={heroText}
        loading={loading}
        selectedOption={selectedOption}
        handleChange={handleChange}
        customStyles={customStyles}
        options={options}
        cities={cities}
      />
      <Sidebar />
      <div className="w-[90vw] md:w-[80vw] mx-auto overflow-x-scroll scrollHide">
        <div className="border border-b-[1px] border-gray-600"></div>
        <div className="flex w-fit py-10">
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
        </div>
      </div>
      <div className="h-screen"></div>
      {loading ? (
        <Skeleton className="h-[60vh] w-[90vw] md:w-[66vw] mx-auto block rounded-3xl" />
      ) : (
        <Slider />
      )}
      <div className="text-center text-primary text-5xl font-bold py-10">
        How Do We Review a Property
      </div>
      {/* location */}
      <Section
        text="Discover the Prime Location details of a real estate project. The right location makes all the difference."
        img="location.png"
        title="location"
      />
      {/* highlights */}
      <Section_two
        text="What makes a project special? We spotlight the key features that makes a Real Estate project truly stand out.."
        title="highlights"
      />
      {loading
        ? Array(6)
            .fill()
            .map((_, index) => <Skeleton key={index} className="h-72 rounded-3xl" />)
        : twoSectionsData.map((item, i) =>
            i % 2 === 0 ? (
              <CardLeft key={item.id} img={item.image} text={item.description} title={item.title} />
            ) : (
              <CardRight key={item.id} img={item.image} text={item.description} title={item.title} />
            )
          )}
      <LogoSlider />
      {loading ? (
        <Skeleton className="w-[90vw] md:w-[80vw] h-[80vh] block mx-auto" />
      ) : (
        <SwiperSlider />
      )}

      <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {loading
          ? Array(6)
              .fill()
              .map((_, index) => <Skeleton key={index} className="h-72 rounded-3xl" />)
          : apiData.map((item) => (
              <Card key={item.id} url={item.url} description={item.description} title={item.title} icon={item.icon} />
            ))}
      </div>
    </div>
  );
}

export default Home;
