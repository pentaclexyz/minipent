import Link from "next/link";
import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon";

const BackLink = ({ link, title }) => {
  return (
    <Link href={link} passHref>
      <a className="flex flex-row gap-3 items-center text-sm my-2">
        <ArrowLeftIcon width={16} height={16}/><span>{title}</span>
      </a>
    </Link>
  );
};
export default BackLink;




