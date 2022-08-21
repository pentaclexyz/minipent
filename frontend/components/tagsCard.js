import TagCard from "./tagCard";

const TagsCard = ({ tags }) => {
  return (
    <div >
      <h4>Tags</h4>
      {tags.data.map((tag, i) => (
        <TagCard tag={tag.attributes} key={i} />
      ))}
    </div>
  );
};
export default TagsCard;
