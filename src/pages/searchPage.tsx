import { useSearchRestaurants } from "@/api/restaurant-api";
import { CuisineFilter } from "@/components/cuisine-filter";
import { MobileCuisineFilter } from "@/components/mobile-cuisine-filter";
import { PaginationSelector } from "@/components/pagination-selector";
import SearchResultCard, { SearchResultCardSkeleton } from "@/components/search-result-card";
import SearchResultInfo from "@/components/search-result-info";
import { SearchBar, SearchBarSkeleton, SearchForm } from "@/components/searchBar";
import SortOptionDropdown from "@/components/sort-option-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleSearchQuery = (values: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: values.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  if (isLoading) {
    return <SearchPageSkeleton />;
  }
  if (!results?.data || !city) {
    return <div>No results found</div>;
  }

  return (
    <div className="grid items-start grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="mobile-cuisines-list" className="md:hidden block">
        <MobileCuisineFilter>
        <CuisineFilter
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
        />
        </MobileCuisineFilter>
      </div>
      <div id="cuisines-list" className="md:block hidden">
        <CuisineFilter
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onReset={resetSearch}
          className="mx-0"
          placeholder="Search by Cuisine or Restaurant Name"
          onSubmit={handleSearchQuery}
        />
        <div className="flex justify-between sm:flex-row flex-col gap-3 items-center">
        <SearchResultInfo  city={city} total={results.pagination.total} />
        <SortOptionDropdown sortOption={searchState.sortOption} onChange={setSortOption} />
        </div>

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


export function SearchPageSkeleton(){
  return (
<div className="grid items-start grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="mobile-cuisines-list" className="md:hidden block">
       <Skeleton className="h-12 w-12" />
      </div>
      <div id="cuisines-list" className="md:block hidden">
        {/* <CuisineFilter
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
        /> */}
        <div className="flex justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBarSkeleton />
        <div className="flex justify-between sm:flex-row flex-col gap-3 items-center">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-40 h-8" />
        </div>

        {new Array(5).fill("").map((_, idx) => (
          <SearchResultCardSkeleton key={idx} />
        ))}
        
        <div className="flex items-center justify-center mt-12 gap-2">
        <Skeleton className="w-16 h-8"/>
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="w-16 h-8"/>
        </div>
      </div>
    </div>
  )
}