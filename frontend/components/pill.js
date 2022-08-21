import Link from "next/link";

const Pill = ({item}) => {
  return (
    <div className={"inline px-2 py-1 mt-2 text-xs text-white bg-p-green-400 rounded-md"} key={item.attributes.id}>
      <Link href={{pathname: `/{item}}/${item.attributes.slug}`}}>
        {item.attributes.name}
      </Link>
    </div>
  );
};

export default Pill;
