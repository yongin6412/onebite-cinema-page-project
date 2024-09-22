import SearchLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./search.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchMovies } from "@/lib/fetch-movie";
import { MovieData } from "@/types";
import { useRouter } from "next/router";

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
    <div className={style.search_container}>
      {searchMovies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
