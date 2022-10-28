import Link from "next/link";

const CategoryCard = ({ category }) => {
  return (
    <Link href={`/category/${category.name}`}>
      <span>{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
