import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const {user} = useUser();
  const {getToken} = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearch, setIsSearch] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // Info user data
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // Function to fetch job data

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = await getToken();

      const {data} = await axios.get(backendUrl+'/api/users/user',{
        headers:{Authorization: `Bearer ${token}`}
      });

      if(data.success){
        setUserData(data.user);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch user applied
  const fetchUserApplications = async() => {
    try {
      const token = await getToken();

      const {data} = await axios.get(backendUrl+'/api/users/applications',{
        headers: {Authorization: `Bearer ${token}`}
      });

      if(data.success){
        setUserApplications(data.applications)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.company);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if(user){
      fetchUserData();
      fetchUserApplications();
    }
  }, [user])
  

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");

    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  const value = {
    setSearchFilter,
    searchFilter,
    setIsSearch,
    isSearch,
    setJobs,
    jobs,
    setShowRecruiterLogin,
    showRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData, setUserData,
    userApplications, setUserApplications,
    fetchUserData,
    fetchUserApplications
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
