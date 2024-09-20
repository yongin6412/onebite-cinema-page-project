import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import mock from "@/mock/dummy.json";
import { MovieItem } from "@/components/movie-item";
import style from "./index.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend_container}>
          {mock.slice(0, 3).map((movie) => (
            <MovieItem key={`recomend-${movie.id}`} movie={movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {mock.map((movie) => (
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
