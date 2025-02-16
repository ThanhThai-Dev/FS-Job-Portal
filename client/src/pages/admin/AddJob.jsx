import Quill from "quill";
import React, { useContext, useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../../assets/assets";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Begginer level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          location,
          salary,
          category,
          level,
        },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML;
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      action=""
      className="container p-4 flex flex-col w-full items-start gap-3"
    >
      {/* Title  */}
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      {/* Description */}
      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div className="" ref={editorRef}></div>
      </div>

      {/* Area choose item */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {/* Category choose */}
        <div className="">
          <p className="mb-2">Job Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name=""
            id=""
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          >
            {JobCategories.map((category, index) => (
              <option value={category} className="" key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Location choose */}
        <div className="">
          <p className="mb-2">Job Location</p>
          <select
            onChange={(e) => setLocation(e.target.value)}
            name=""
            id=""
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          >
            {JobLocations.map((location, index) => (
              <option value={location} className="" key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Level choose */}
        <div className="">
          <p className="mb-2">Job Level</p>
          <select
            onChange={(e) => setLevel(e.target.value)}
            name=""
            id=""
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          >
            <option value="Beginner level" className="">
              Beginner level
            </option>
            <option value="Intermediate level" className="">
              Intermediate level
            </option>
            <option value="Senior level" className="">
              Senior level
            </option>
          </select>
        </div>
      </div>

      <div className="">
        <p className="mb-2">Job Salary</p>
        <input
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
          placeholder="2500"
          min={0}
        />
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white rounded">
        Add
      </button>
    </form>
  );
};

export default AddJob;
