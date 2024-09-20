import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./search.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchMovies } from "@/lib/fetch-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const searchMovies = await fetchMovies(q as string);

  return {
    props: {
      searchMovies,
    },
  };
};

export default function SearchPage({
  searchMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
