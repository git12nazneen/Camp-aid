// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import CampCard from "./CampCard";

// const AvailableCampPage = () => {
//     const { isLoading, error, data: camps } = useQuery({
//         queryKey: ['camps'],
//         queryFn: async () => {
//             const res = await fetch('http://localhost:5000/camps');
//             return res.json();
//         }
//     });

//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [isTwoColumns, setIsTwoColumns] = useState(false); // State to toggle between two and three columns

//     useEffect(() => {
//         if (camps && camps.length > 0) {
//             // Filter camps based on search query
//             const filteredCamps = camps.filter(camp =>
//                 camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setSearchResults(filteredCamps);
//         } else {
//             setSearchResults([]);
//         }
//     }, [searchQuery, camps]);

//     // Handler for changing the layout
//     const toggleLayout = () => {
//         setIsTwoColumns(!isTwoColumns);
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div className="mx-10 mt-32 mb-10">
//             <input
//                 type="text"
//                 placeholder="Search camps by name"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="border border-gray-300 rounded-md px-4 py-2 mb-4"
//             />
//             {/* Layout toggle button */}
//             <button onClick={toggleLayout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 {isTwoColumns ? "Switch to Three Columns" : "Switch to Two Columns"}
//             </button>
//             <div className={`grid ${isTwoColumns ? 'grid-cols-2' : 'grid-cols-3'} gap-5 mt-4`}>
//                 {searchResults.map((camp) => (
//                     <CampCard
//                         key={camp._id}
//                         camp={camp}
//                     ></CampCard>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AvailableCampPage;

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CampCard from "./CampCard";

const AvailableCampPage = () => {
  const {
    isLoading,
    error,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/camps");
      return res.json();
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isTwoColumns, setIsTwoColumns] = useState(false); // State to toggle between two and three columns
  const [sortCriteria, setSortCriteria] = useState("alphabetical"); // State to track the sorting criteria

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
    <div className="mx-10 mt-32 mb-10">
      <div className="flex justify-center text-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search camps by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          />
        </div>
        <div className="flex-1 justify-center">
          {/* Layout toggle button */}
          <button
            onClick={toggleLayout}
            className="rounded-xl border-2 border-dashed border-sky-400 bg-white px-6 py-2  uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            {isTwoColumns ? "Switch to Three Columns" : "Switch to Two Columns"}
          </button>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <label className="mr-2">Sort by:</label>
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
      </div>

      {/* Sorting options */}

      <div
        className={`grid ${
          isTwoColumns ? "grid-cols-2" : "grid-cols-3"
        } gap-5 mt-4`}
      >
        {searchResults.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCampPage;
