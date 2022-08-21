import Link from "next/link";
import {useFavorites} from "../contexts/FavoriteContext";
import {useAccount} from "wagmi";
import {IsFavorite, IsNotFavorite} from "./favorite";


export default function ProjectSummary({project, key, id}) {
    const {faves, addFave, removeFave} = useFavorites();
    const {address} = useAccount();
    return (
        <section className="w-full rounded-xl bg-white/5 p-6 mb-6 hover:bg-white/10" key={key}>
            <div className={"flex justify-between"}>
                <div>
                    <div className={"text-sm cursor-pointer hover:text-p-green-400 external-link"}>
                        <a href={project.website_url} rel="nofollow noreferrer noopener" target={"_blank"}>
                            {project.website_url}
                        </a>
                    </div>
                    <div className={"cursor-pointer hover:text-p-green-400 pt-2 internal-link"}>
                        <Link href={{pathname: `/project/${project.slug}`}}>
                            <h2>{project.name}</h2>
                        </Link>
                    </div>
                </div>

                {address && (
                    <div data-dbid={`project:${id}`}
                         className="mb-1.5 ml-auto text-p-pink-700 cursor-pointer hover:text-indigo-400">
                        {faves[`project:${id}`] ? (
                            <IsFavorite id={id} callback={removeFave}/>
                        ) : (
                            <IsNotFavorite id={id} callback={addFave}/>
                        )}
                    </div>
                )}
            </div>

            <article className={"pt-4"}>
                <div className="sm:col-span-2">
                    <dd className="text-sm line-clamp-2">
                        {project.description}
                    </dd>
                    <dd className="flex gap-2 mt-2 text-sm " style={{flexWrap: "wrap"}}>
                        {project.sections.data.map((section, i) => (
                            <Link href={{pathname: `/section/${section.attributes.slug}`}} key={i}>
                                <div className={"inline px-2 py-1 mt-2 text-xs text-white bg-p-purple-700 rounded-md cursor-pointer"}>
                                    {section.attributes.name}
                                </div>
                            </Link>
                        ))}

                        {project.categories.data.map((category, i) => (
                            <Link href={{pathname: `/category/${category.attributes.slug}`}} key={i}>
                                <div className={"inline px-2 py-1 mt-2 text-xs text-p-black bg-p-green-700 rounded-md cursor-pointer"}>
                                    {category.attributes.name}
                                </div>
                            </Link>

                        ))}

                        {project.tags.data.map((tag, i) => (

                            <Link href={{pathname: `/tag/${tag.attributes.slug}`}}
                                  key={i}>
                                <div className={"inline px-2 py-1 mt-2 text-xs text-p-black bg-p-pink-700 rounded-md cursor-pointer"}>
                                    {tag.attributes.name}
                                </div>
                            </Link>

                        ))}

                        {project.chains.data.map((chain, i) => (

                            <Link href={{pathname: `/chain/${chain.attributes.slug}`}}
                                  key={i}>
                                <div className={"inline px-2 py-1 mt-2 text-xs text-white bg-violet-400 rounded-md cursor-pointer"}>
                                    {chain.attributes.name}
                                </div>
                            </Link>

                        ))}
                    </dd>
                </div>
            </article>
        </section>
    );
}
