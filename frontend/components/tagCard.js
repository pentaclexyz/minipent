import Link from "next/link";

const TagCard = ({ tag }) => {
  return (
    <div>
      <Link href={`/tag/${tag.name}`}>
        <span>{tag.name}</span>
      </Link>
    </div>
  );
};
export default TagCard;
