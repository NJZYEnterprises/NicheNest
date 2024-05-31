import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../components/UserProvider.jsx"
import { SearchbarContext } from "../components/SearchbarProvider.jsx";
import DisplayAllFreelancers from "../components/DisplayAllFreelancers.jsx"



const AllFreelancers = () => {
  const [filteredFreelancers, setFilteredFreelancers] = useState([])
  const { filters, setFilters, searchQuery, setSearchQuery  } = useContext(SearchbarContext)
  const { freelancers } = useContext(UserContext)


  useEffect(() => {
    const filterFreelancers = () => {
      let filtered = [...freelancers];
      const query = filters.query?.toLowerCase() || "";

      if (filters.type === "all") {
        filtered = filtered.filter((freelancer) => {
          const fullName = `${freelancer.firstName} ${freelancer.lastName}`.toLowerCase();
          const serviceNameMatch = freelancer.services && freelancer.services.some((service) =>
            service.name.toLowerCase().includes(query)
          );
          const tagMatch = freelancer.tags && freelancer.tags.some((tag) => tag.toLowerCase().includes(query));
          return fullName.includes(query) || serviceNameMatch || tagMatch;
        });
      } else if (filters.type === "freelancerName") {
        filtered = filtered.filter((freelancer) => {
          const fullName = `${freelancer.firstName} ${freelancer.lastName}`.toLowerCase();
          return fullName.includes(query);
        });
      } else if (filters.type === "serviceName") {
        filtered = filtered.filter((freelancer) =>
          freelancer.services?.some((service) => service.name.toLowerCase().includes(query))
        );
      } else if (filters.type === "tag") {
        filtered = filtered.filter((freelancer) =>
          freelancer.services.some((service) =>
            service.tags?.toLowerCase().includes(query)
          )
        );
      }

      setFilteredFreelancers(filtered);
    };

    if (filters.query !== "") {
      filterFreelancers();
    } else {
      setFilteredFreelancers([]);
    }
  }, [filters, freelancers]);

  useEffect(() => {
    return () => {
      setFilters({ type: 'all', query: '' });
    };
  }, []);
  

  return (
    <div className="flex felx-col flex-wrap">
   {filters.query === "" ? (
        <DisplayAllFreelancers freelancers={freelancers} />
      ) : (
        filteredFreelancers.length > 0 ? (
          <DisplayAllFreelancers freelancers={filteredFreelancers} />
        ) : (
          <div className="flex flex-col p-20 m-20 surface-color card w-full">
            <h1>No Matches found</h1>
          </div>
        )
      )}
      </div>
  )
}
export default AllFreelancers
