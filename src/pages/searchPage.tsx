import { useSearchRestaurants } from "@/api/restaurant-api";
import SearchResultCard from "@/components/search-result-card";
import SearchResultInfo from "@/components/search-result-info";
import { SearchBar, SearchForm } from "@/components/searchBar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!results?.data || !city) {
    return <div>No results found</div>;
  }

  const handleSearchQuery = (values: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: values.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines here</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onReset={resetSearch}
          className="mx-0"
          placeholder="Search by Cuisine or Restaurant Name"
          onSubmit={handleSearchQuery}
        />
        <SearchResultInfo city={city} total={results.pagination.total} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} key={restaurant._id} />
        ))}
      </div>
    </div>
  );
}
