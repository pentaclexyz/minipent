const LaunchLink = (props) => {
    return (
        <>
            {props.url && (
                <a href={`${props.url}`} target={"_blank"} rel="noopener noreferrer"
                   className="cursor-pointer rounded-full text-sm px-4 py-2 mb-4 inline-block bg-primary hover:bg-secondary text-txt-primary hover:text-txt-primary">
                    <span>Launch app</span>
                </a>
            )}
        </>
    );
};
export default LaunchLink;
