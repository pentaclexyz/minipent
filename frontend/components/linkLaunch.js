const LinkLaunch = (props) => {
    return (
        <>
            {props.url && (
                <a href={`${props.url}`} target={"_blank"} rel="noopener noreferrer"
                   className="cursor-pointer rounded-full text-sm px-4 py-2 mb-4 inline-block bg-color-primary-700 hover:bg-color-secondary-700 text-text-primary hover:text-text-primary">
                    <span>Launch app</span>
                </a>
            )}
        </>
    );
};
export default LinkLaunch;
