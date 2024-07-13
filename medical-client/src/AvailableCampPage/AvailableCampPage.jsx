import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CampCard from "./CampCard";
import HeadAvailable from "./HeadAvailable";

const AvailableCampPage = () => {
  const {
    isLoading,
    error,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await fetch("https://server-two-sage-80.vercel.app/camps");
      return res.json();
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isTwoColumns, setIsTwoColumns] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("alphabetical");

  useEffect(() => {
    if (camps && camps.length > 0) {
      // Filter camps based on search query
      let filteredCamps = camps.filter((camp) =>
        camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Sort the filtered camps based on the sorting criteria
      if (sortCriteria === "mostRegistered") {
        filteredCamps = filteredCamps.sort((a, b) => b.guests - a.guests);
      } else if (sortCriteria === "campFees") {
        filteredCamps = filteredCamps.sort((a, b) => a.price - b.price);
      } else if (sortCriteria === "alphabetical") {
        filteredCamps = filteredCamps.sort((a, b) =>
          a.campName.localeCompare(b.campName)
        );
      }

      setSearchResults(filteredCamps);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, camps, sortCriteria]);

  // Handler for changing the layout
  const toggleLayout = () => {
    setIsTwoColumns(!isTwoColumns);
  };

  // Handler for changing the sorting criteria
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=" mt-16">
      <HeadAvailable></HeadAvailable>
      <div className="max-w-6xl mx-auto  mt-11 mb-10">
        <div className="flex flex-col sm:flex-row justify-center mb-10 bg-gray-300 pt-5 rounded-sm text-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 flex lg:justify-center justify-start">
            <h2 className="border bg-sky-300 border-gray-300 rounded-md px-3 ml-1 py-2 mb-4">
              Search
            </h2>
            <input
              type="text"
              placeholder="Search camps by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="mb-4">
              {/* <label className="mr-1 ml-1 bg-white py-3 rounded-sm px-4">Sort by:</label> */}
              <select
                value={sortCriteria}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-6 py-2 font-medium bg-sky-300 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <option value="mostRegistered">Most Registered</option>
                <option value="campFees">Camp Fees(less to more)</option>
                <option value="alphabetical">Alphabetical Order</option>
              </select>
            </div>
          </div>

          <div className="flex-1 flex lg:justify-center pb-4">
            {/* Layout toggle button */}
            <button onClick={toggleLayout}>
              <p className="px-6 py-2 font-medium bg-sky-300 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                {isTwoColumns
                  ? "Switch to Three Columns"
                  : "Switch to Two Columns"}
              </p>
            </button>
          </div>
        </div>

        {/* Sorting options */}

        <div
          className={`grid ${
            isTwoColumns ? "grid-cols-2" : "grid-cols-3"
          } gap-5 mt-2`}
        >
          {searchResults.map((camp) => (
            <CampCard key={camp._id} camp={camp}></CampCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableCampPage;
