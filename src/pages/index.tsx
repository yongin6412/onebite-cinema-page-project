import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./index.module.css";
import { fetchMovies } from "@/lib/fetch-movie";
import { InferGetServerSidePropsType } from "next";
import { fetchRecoMovies } from "@/lib/fetch-recomend-movie";

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRecoMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend_container}>
          {recoMovies.map((movie) => (
            <MovieItem key={`recomend-${movie.id}`} movie={movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {allMovies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
