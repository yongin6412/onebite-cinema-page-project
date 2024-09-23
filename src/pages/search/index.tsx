import SearchLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./search.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchMovies } from "@/lib/fetch-movie";
import { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SearchPage() {
  const [searchMovies, setSearchMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const getSearchMovies = async () => {
    const searchDatas = await fetchMovies(q);
    setSearchMovies(searchDatas);
  };

  useEffect(() => {
    getSearchMovies();
  }, [q]);

  return (
    <>
      <Head>
        <title>한입 시네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마 - 검색결과" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만납시다"
        />
      </Head>
      <div className={style.search_container}>
        {searchMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
