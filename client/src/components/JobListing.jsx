import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { isSearch, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    // Kiểm tra xem công việc có thuộc danh mục đã chọn hay không.
    // Nếu không có danh mục nào được chọn (selectedCategories.length === 0),
    // tất cả các công việc đều được coi là phù hợp
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    // Kiểm tra xem tiêu đề công việc có chứa từ khóa
    // tìm kiếm trong searchFilter.title hay không.
    // Nếu từ khóa tìm kiếm trống (searchFilter.title === ""),
    // tất cả các công việc đều được coi là phù hợp tương tự như vậy đối với Location
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    // Lọc danh sách công việc
    // tạo một bản sao của mảng jobs và đảo ngược thứ tự của nó.
    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        // lọc các công việc dựa trên các tiêu chí đã chọn (danh mục, địa điểm, tiêu đề, và từ khóa tìm kiếm).
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* side bar  */}

      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search Filter from hero components */}
        {isSearch &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {/* Title search succes */}
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}{" "}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      alt=""
                      className="cursor-pointer"
                    />
                  </span>
                )}
                {/* Location search success */}
                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}{" "}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      src={assets.cross_icon}
                      alt=""
                      className="cursor-pointer"
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((item, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  onChange={() => handleCategoryChange(item)}
                  checked={selectedCategories.includes(item)}
                  type="checkbox"
                  name=""
                  id=""
                  className="scale-125"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Location filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">
            Search by Locations
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((item, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  onChange={() => handleLocationChange(item)}
                  checked={selectedLocations.includes(item)}
                  type="checkbox"
                  name=""
                  id=""
                  className="scale-125"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job listing */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-ist">
          Latest jobs
        </h3>
        <p className="mb-8">
          Discover job opportunities in various locations to find your perfect
          match.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination of section page */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list" className="">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow_icon}
                alt=""
                className=""
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list" className="" key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                      }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list" className="">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
                className=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
