import CategoriesCard from "./categoriesCard";

const GlossaryItemCard = ({ glossary_item }) => {
  return (
    <article>
      <h2>{glossary_item.name}</h2>
      <h3>what</h3>
      <p>{glossary_item.what}</p>
      <h3>why</h3>
      <p>{glossary_item.why}</p>
      <h3>risk</h3>
      <p>{glossary_item.risk}</p>
      <h3>reward</h3>
      <p>{glossary_item.reward}</p>
      <CategoriesCard categories={glossary_item.categories} />
    </article>
  );
};
export default GlossaryItemCard;
