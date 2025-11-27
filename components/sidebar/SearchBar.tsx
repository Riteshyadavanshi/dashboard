import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="flex shadow-2xl px-2 mt-4">
      <Input placeholder="search" className="bg-white" />
    </div>
  );
};

export default SearchBar;
