function removeTrailingSlash(str = "") {
  return str.replace(/\/+$/, "");
}

export default function StyledLink(props) {
  return (
      <>
        {props.url && (
            <a href={`${props.url}`} target={"_blank"} rel="noopener noreferrer"
               className="flex items-center tracking-wide px-2 py-0.5 -ml-2 mr-3 hover:underline">
              <span>{props.icon && (<img src={`${props.icon}`} alt={`${props.icon}`} height={24} width={24} className={"mr-2 bg-bg-card-secondary rounded-2xl border-4 border-bg-card-secondary"}/>)}</span>
              <span>{removeTrailingSlash(props.text?.split("//")[1])}</span>
            </a>
        )}
      </>
  );
};
