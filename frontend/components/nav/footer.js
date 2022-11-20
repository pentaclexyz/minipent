import Link from "next/link";
import React, {useContext, useMemo} from "react";
import GlobalContext from "../../contexts/GlobalContext";
import {useRouter} from "next/router";

const Footer = () => {
    const {footerNav} = useContext(GlobalContext) || {};
    const {siteName} = useContext(GlobalContext) || {};
    const {github_url} = useContext(GlobalContext) || {};
    const {twitter_url} = useContext(GlobalContext) || {};
    const {blog_url} = useContext(GlobalContext) || {};
    const {discord_url} = useContext(GlobalContext) || {};
    const router = useRouter();

    const slugFromPath = useMemo(() => {
        const slug = router?.asPath?.split("/")[2] || "";
        return slug.split("?")[0];
    }, [router.asPath]);

    return (
        <footer className={"mx-auto max-w-7xl px-8 py-20 text-sm"}>
            <div className={"flex justify-between"}>
                <ul className="flex items-center space-x-8">
                    {footerNav.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link href={`/${item.link}`} className={`${router.asPath}`}>
                                    <a id={router.pathname}
                                       className={`p-card-inner text-sm hover:underline ${slugFromPath === item.navTitle && ''}`}>{item.navTitle}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className={"flex gap-4"}>
                    <a className={"cursor-pointer hover:underline"} href={discord_url} target={"_blank"} rel="noopener noreferrer">Discord</a>
                    <a className={"cursor-pointer hover:underline"} href={github_url} target={"_blank"} rel="noopener noreferrer">Github</a>
                    <a className={"cursor-pointer hover:underline"} href={twitter_url} target={"_blank"} rel="noopener noreferrer">Twitter</a>
                    <a className={"cursor-pointer hover:underline"} href={blog_url} target={"_blank"} rel="noopener noreferrer">Blog</a>
                </div>
            </div>

            <div className={"pt-8"}><Link href={"/"}><span>© {siteName}</span></Link>
                <div>Powered by <a className={"hover:underline"} href={"https://minipent.xyz"} target={"_blank"}
                                   rel="noopener noreferrer">minipent</a></div></div>
        </footer>
    );
};
export default Footer;
