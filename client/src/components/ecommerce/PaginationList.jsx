import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PaginationList = ({ page, totalPages, onPageChange }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            <ChevronLeft />
            Previous
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const newPage = index + 1;
          if (
            newPage === 1 ||
            newPage === totalPages ||
            (newPage >= page - 1 && page <= newPage + 1)
          ) {
            return (
              <PaginationItem key={newPage}>
                <Button
                  onClick={() => onPageChange(newPage)}
                  variant={page === newPage ? "default" : "outline"}
                  className={cn(
                    "w-10 h-10",
                    page === newPage
                      ? "bg-black text-white hover:bg-gray-800"
                      : "border-2 border-black hover:bg-gray-100"
                  )}
                >
                  {newPage}
                </Button>
              </PaginationItem>
            );
          } else if (newPage === page - 2 || newPage === page + 2) {
            return (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}
        <PaginationItem>
          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
