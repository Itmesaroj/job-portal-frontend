import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slice/JobSlices";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Quetta",
    "Peshawar",
    "Sialkot",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Mardan",
    "Mingora",
    "Sheikhupura",
    "Mandi Bahauddin",
    "Larkana",
    "Nawabshah",
  ];

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    if (offers) formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    if (hiringMultipleCandidates)
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    if (personalWebsiteTitle)
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    if (personalWebsiteUrl)
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className="account_components">
      <h3>Post A Job</h3>
      <form onSubmit={handlePostJob}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
          />
        </div>
        <div>
          <label>Job Type</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div>
          <label>Location (City)</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label>Company/Job Introduction</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Enter company or job introduction"
            rows={7}
          />
        </div>
        <div>
          <label>Responsibilities</label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="Enter job responsibilities"
            rows={7}
          />
        </div>
        <div>
          <label>Qualifications</label>
          <textarea
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Enter required qualifications"
            rows={7}
          />
        </div>
        <div>
          <label>What We Offer (Optional)</label>
          <textarea
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="Enter what you offer"
            rows={7}
          />
        </div>
        <div>
          <label>Job Niche</label>
          <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
            <option value="">Select Job Niche</option>
            {nichesArray.map((niche, index) => (
              <option key={index} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Salary</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary range (e.g., 50000 - 800000)"
          />
        </div>
        <div>
          <label>Hiring Multiple Candidates? (Optional)</label>
          <select
            value={hiringMultipleCandidates}
            onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Personal Website Name (Optional)</label>
          <input
            type="text"
            value={personalWebsiteTitle}
            onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
            placeholder="Enter personal website title"
          />
        </div>
        <div>
          <label>Personal Website Link (URL) (Optional)</label>
          <input
            type="text"
            value={personalWebsiteUrl}
            onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
            placeholder="Enter personal website URL"
          />
        </div>
        <div>
          <button
            className="btn"
            type="submit"
            disabled={loading}
            style={{ margin: "0 auto" }}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPost;
