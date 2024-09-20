import SearchLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import mock from "@/mock/dummy.json";
import { MovieItem } from "@/components/movie-item";
import style from "./search.module.css";

export default function SearchPage() {
  const router = useRouter();
  const q = (router.query.q as string) || "";

  const filterMovies = mock.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className={style.search_container}>
      {filterMovies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
