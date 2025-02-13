import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearch } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearch(true);

    // console.log({
    //   title: titleRef.current.value,
    //   location: locationRef.current.value,
    // });
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Find your dream job with our extensive listings. Explore opportunities
          across various industries and apply with ease on our user-friendly
          platform.
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center ">
            <img src={assets.search_icon} alt="" className="h4 sm:h-5" />
            <input
              ref={titleRef}
              type="text"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              placeholder="Search for jobs"
            />
          </div>
          <div className="flex items-center">
            <img src={assets.location_icon} alt="" className="h4 sm:h-5" />
            <input
              ref={locationRef}
              type="text"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              placeholder="Location"
            />
          </div>

          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white m-1"
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-sm flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img src={assets.microsoft_logo} alt="" className="h-6" />
          <img src={assets.walmart_logo} alt="" className="h-6" />
          <img src={assets.accenture_logo} alt="" className="h-6" />
          <img src={assets.samsung_logo} alt="" className="h-6" />
          <img src={assets.amazon_logo} alt="" className="h-6" />
          <img src={assets.adobe_logo} alt="" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
