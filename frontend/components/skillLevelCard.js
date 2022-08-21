import Link from "next/link";

const SkillLevelCard = ({ skill_level }) => {
  return (
    <div>
      <Link href={`/skill_level/${skill_level.name}`}>
        <span>{skill_level.name}</span>
      </Link>
    </div>
  );
};
export default SkillLevelCard;
