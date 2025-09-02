import {
  PaginationContent,
  PaginationItem,
  Pagination as UiPagination,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
interface PaginationProps {
  currentPage?: number;
  lastPage?: number;
  links: { page?: number; label: string; active: boolean }[];
  onPageChange: (page: number) => void;
}
export const Pagination = ({
  currentPage = 1,
  lastPage = 1,
  links,
  onPageChange,
}: PaginationProps) => {
  return (
    <UiPagination>
      <PaginationContent>
        {links.map((link, index) => (
          <PaginationItem key={index}>
            {index === 0 ? (
              <Button
                className="cursor-pointer"
                disabled={currentPage == 1}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ArrowLeft />
                Previous
              </Button>
            ) : index === links.length - 1 ? (
              <Button
                className="cursor-pointer"
                disabled={currentPage == lastPage}
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
                <ArrowRight />
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => link.page && onPageChange(link.page)}
                variant={link.active ? "default" : "outline"}
                size={"icon"}
                disabled={link.active || !link.page}
              >
                {link.label}
              </Button>
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </UiPagination>
  );
};
