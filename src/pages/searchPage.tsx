import { useSearchRestaurants } from "@/api/restaurant-api";
import { PaginationSelector } from "@/components/pagination-selector";
import SearchResultCard from "@/components/search-result-card";
import SearchResultInfo from "@/components/search-result-info";
import { SearchBar, SearchForm } from "@/components/searchBar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
};

export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const handleSearchQuery = (values: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: values.searchQuery,
      page: 1
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1
    }));
  };

  const setPage = (page: number) => {
    setSearchState(prevState => ({
      ...prevState,
      page
    }))
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!results?.data || !city) {
    return <div>No results found</div>;
  }

  

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
        <PaginationSelector 
        pages={results.pagination.pages}
        page={results.pagination.page}
        onPageChange={setPage}
        />
      </div>
    </div>
  );
}
