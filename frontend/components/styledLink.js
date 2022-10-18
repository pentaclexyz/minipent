const StyledLink = (props) => {
  return (
    <>
      {props.url && (
        <div className="text-sm pb-2">
          <a href={`${props.url}`} target={"_blank"} rel="noopener noreferrer" className="hover:txt-primary external-link">
            {props.text}
          </a>
        </div>
      )}
    </>
  );
};
export default StyledLink;
