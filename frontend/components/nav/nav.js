import React, {useContext, useMemo} from "react";
import {Disclosure} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import Link from "next/link";
import GlobalContext from "../../contexts/GlobalContext";
import {useRouter} from "next/router";
import {getStrapiMedia} from "../../lib/media";

const Nav = () => {
  const {defaultNav} = useContext(GlobalContext) || {defaultNav: []};
  const {logo} = useContext(GlobalContext) || {};
  const {icon} = useContext(GlobalContext) || {};
  const router = useRouter();
  const {siteName} = useContext(GlobalContext) || {};

  const slugFromPath = useMemo(() => {
    const slug = router?.asPath?.split("/")[2] || "";
    return slug.split("?")[0];
  }, [router.asPath]);

  return (
    <Disclosure as="nav" className="black sm:pt-1 pt-4">
      {({open}) => (
        <>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex justify-between items-center h-16">

              <div className="flex-shrink-0">
                <Link href={"/"}><a><img alt={siteName} className="block w-auto h-10 md:hidden" src={getStrapiMedia(icon)}/></a></Link>
                <Link href={"/"}><a><img alt={siteName} className="hidden w-auto h-10 md:block" src={getStrapiMedia(logo)}/></a></Link>
              </div>

              <div className={"hidden lg:block"}>
                  <ul className="flex items-center space-x-8">
                    {defaultNav.map((item) => {
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
              </div>

              <div className="flex lg:hidden">
                <Disclosure.Button>
                  <span className="sr-only">Open main menu</span>{open ? (<XIcon className="block w-6 h-6" aria-hidden="true"/>) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true"/>
                  )}
                </Disclosure.Button>
              </div>

              <div className={"hidden lg:block"}>
                <select data-choose-theme="canto" className={"text-sm p-1 border border-border-tertiary bg-transparent"}>
                  <option value="light">Light</option>
                  <option value="pink">Pink</option>
                  <option value="canto">Canto</option>
                </select>
              </div>
            </div>

          </div>

          <Disclosure.Panel className="lg:hidden">
            <>
            {defaultNav.map((item) => {
              return (
                <div className="block px-6 py-1 border-t border-border-tertiary" key={item.id}>
                  <Disclosure.Button as="a" href={`/${item.link}`} className="block p-2 hover:underline">
                    <span className="text-sm">{item.navTitle}</span>
                  </Disclosure.Button>
                </div>
              );
            })}
              <div className="block px-6 py-1.5 border-t border-b border-border-tertiary">
                <select data-choose-theme="light" className={"text-sm p-1 mx-2 border border-border-tertiary bg-transparent"}>
                  <option value="light">Light</option>
                  <option value="pink">Pink</option>
                </select>
              </div>
            </>
          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );
};

export default Nav;
