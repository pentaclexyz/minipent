import Link from "next/link";

const isValidPath = (path) => {
  return ["projects", "articles", "developers", "events", "tags"].includes(path);
};

const AllowedLink = ({ children, group, slug }) => {
  return isValidPath(group) ? (
    <Link href={`/${group}/${slug}`}>{children}</Link>
  ) : (
    <> {children}</>);
};

export { AllowedLink };
