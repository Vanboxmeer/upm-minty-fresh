import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryBreadcrumbsProps {
  categories: string[];
  size?: "sm" | "md" | "lg";
  showAll?: boolean;
  maxDisplay?: number;
  className?: string;
  linkTo?: (category: string) => string;
}

export const CategoryBreadcrumbs = ({ 
  categories, 
  size = "md", 
  showAll = false, 
  maxDisplay = 3,
  className,
  linkTo
}: CategoryBreadcrumbsProps) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayCategories = showAll ? categories : categories.slice(0, maxDisplay);
  const remainingCount = categories.length - maxDisplay;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5"
  };

  const renderCategory = (category: string, index: number) => {
    const content = (
      <Badge 
        key={category}
        variant="secondary" 
        className={cn(
          "transition-colors hover:bg-primary hover:text-primary-foreground",
          sizeClasses[size],
          linkTo && "cursor-pointer"
        )}
      >
        {category}
      </Badge>
    );

    if (linkTo) {
      return (
        <Link key={category} to={linkTo(category)} className="inline-block">
          {content}
        </Link>
      );
    }

    return content;
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {displayCategories.map(renderCategory)}
      {!showAll && remainingCount > 0 && (
        <Badge 
          variant="outline" 
          className={cn(
            "text-muted-foreground border-dashed",
            sizeClasses[size]
          )}
        >
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};