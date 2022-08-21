const StyledLink = (props) => {
  return (
    <>
      {props.url && (
        <div className="text-sm pb-2">
          <a href={`${props.url}`} target={"_blank"} rel="noopener noreferrer" className="hover:text-color-primary-700 external-link">
            {props.text}
          </a>
        </div>
      )}
    </>
  );
};
export default StyledLink;
