const Label = ({ label, bgColor, txtColor }) => {
  return (
    <span className={`bg-${bgColor}-1000 ` + `text-${txtColor} ` + "rounded-xl text-xs py-1 px-2"}>{label}</span>
  );
};
export default Label;
