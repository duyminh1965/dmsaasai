import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = ({ searchParams }: SearchParamProps) => {
 /*  const page = Number(searchParams?.page) || 1;  
  const searchQuery = (searchParams?.query as string) || '';  
  const images = await getAllImages({ page, searchQuery }) */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const page = Number(searchParams?.page) || 1;  
      const searchQuery = (searchParams?.query as string) || '';  
      const result = await getAllImages({ page, searchQuery });
      setImages(result);
      setPage(page);
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      <section className="home">
        <h2 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h2>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1,5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home