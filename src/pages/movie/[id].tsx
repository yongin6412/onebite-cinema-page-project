import { useRouter } from "next/router";
import style from "./[id].module.css";
import mock from "@/mock/dummy.json";

export default function MoviePage() {
  const router = useRouter();
  const id = Number(router.query.id);

  const movieData = mock.find((movie) => movie.id === id);
  console.log(movieData);

  if (!movieData) return;

  return (
    <div className={style.movie_container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${movieData.posterImgUrl}')` }}
      >
        <img src={movieData.posterImgUrl} alt={`${movieData.title}`} />
      </div>

      <div className={style.info_container}>
        <h2 className={style.title}>{movieData.title}</h2>
        <div>
          {movieData.releaseDate} / {movieData.genres.join(", ")} /
          {movieData.runtime}분
        </div>
        <div>{movieData.company}</div>

        <div>
          <div className={style.subTitle}>{movieData.subTitle}</div>
          <div className={style.description}>{movieData.description}</div>
        </div>
      </div>
    </div>
  );
}
