import Link from "next/link";

const isValidPath = (path) => {
  return ["projects", "planning", "contributors", "events", "news", "articles"].includes(path);
};

const AllowedLink = ({ children, group, slug }) => {
  return isValidPath(group) ? (
    <Link href={`/${group}/${slug}`}>{children}</Link>
  ) : (
    <> {children}</>);
};

export { AllowedLink };
