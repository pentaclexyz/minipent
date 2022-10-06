const SkillCard = ({ skill }) => {
  return (
    <article>
      <h2>{skill.title}</h2>
      <p>{skill.text}</p>
    </article>
  );
};
export default SkillCard;
