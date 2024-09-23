import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./index.module.css";
import { fetchMovies } from "@/lib/fetch-movie";
import { InferGetStaticPropsType } from "next";
import { fetchRecoMovies } from "@/lib/fetch-recomend-movie";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRecoMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 5,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만납시다"
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
