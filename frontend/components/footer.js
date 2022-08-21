import Link from "next/link";

const Footer = () => {
    return (
        <footer className={"flex justify-between mx-auto max-w-7xl p-8 text-sm"}>
            <div className={"flex gap-4 "}>
                <Link href={"/"}>© Pentacle 2022</Link>
                {/*<Link href={"/terms"}>Terms</Link>*/}
                {/*<Link href={"/about"}>About</Link>*/}
                <a href={"https://github.com/pentaclexyz/minipent"} target={"_blank"} rel="noopener noreferrer">Github</a>
                <a href={"https://twitter.com/pentaclexyz"} target={"_blank"} rel="noopener noreferrer">Tweeter</a>
            </div>
            {/*<div className={"flex gap-4 "}>*/}
            {/*    <Link href={"/skill"}>skills</Link>*/}
            {/*    <Link href={"/glossary"}>glossary</Link>*/}
            {/*</div>*/}
            <div>Powered by <a href={"https://www.pentacle.xyz"} target={"_blank"}
                               rel="noopener noreferrer">Pentacle</a></div>
        </footer>
    );
};
export default Footer;
