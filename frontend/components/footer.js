import Link from "next/link";

const Footer = () => {
    return (
        <footer className={"flex justify-between mx-auto max-w-7xl px-8 py-20 text-sm"}>
            <div className={"flex gap-4"}>
                <Link href={"/"}>© Minipent</Link>
                {/*<Link href={"/terms"}>Terms</Link>*/}
                {/*<Link href={"/about"}>About</Link>*/}
                <a className={"hover:underline"} href={"https://github.com/pentaclexyz/minipent"} target={"_blank"} rel="noopener noreferrer">Github</a>
                <a className={"hover:underline"} href={"https://twitter.com/pentaclexyz"} target={"_blank"} rel="noopener noreferrer">Twitter</a>
            </div>
            <div className={"flex gap-4"}>
                <div>Powered by <a className={"hover:underline"} href={"https://www.minipent.xyz"} target={"_blank"} rel="noopener noreferrer">Minipent</a></div>
            </div>
        </footer>
    );
};
export default Footer;
