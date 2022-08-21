import CategoryCard from "./categoryCard";

const CategoriesCard = ({ categories }) => {
  return (
    <div >
      <h4>Category</h4>
      {categories.data.map((category, i) => (
        <CategoryCard category={category.attributes} key={i} />
      ))}
    </div>
  );
};
export default CategoriesCard;
