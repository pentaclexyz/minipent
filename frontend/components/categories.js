import React from "react";
import CategoryCard from "./categoryCard";

const Categories = ({ categories }) => {
  return (
    <div>
      <div>
        categories
        <div>
          {categories.map((category) => {
            return (
              <CategoryCard
                category={category.attributes}
                key={`${category.attributes.name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
