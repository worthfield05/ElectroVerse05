import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}`);
      setOpen(false);
      setKeyword("");
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          className="cursor-pointer hover:bg-neutral-100 transition-colors"
        >
          <Search className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="top" className="h-[60vh] p-6">
        <div className="flex flex-col gap-6">
          {/* <h2 className="text-lg font-semibold">Search Products</h2> */}
          <SheetHeader className={"p-0 font-semibold text-lg"}>
            <SheetTitle>Search Products</SheetTitle>
          </SheetHeader>
          <SheetDescription className={"hidden"}></SheetDescription>
          <Input
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(keyword)}
            placeholder="Search for phones, laptops, accessories..."
            className="h-12 text-base"
          />

          {/* Optional suggestions */}
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>Popular:</p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 bg-muted rounded-full">iPhone</span>
              <span className="px-3 py-1 bg-muted rounded-full">MacBook</span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Headphones
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
