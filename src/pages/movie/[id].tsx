import style from "./[id].module.css";
import { fetchDetailMovie } from "@/lib/fetch-detail-movie";
import { fetchMovies } from "@/lib/fetch-movie";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  return {
    paths: movies.map((movie) => ({
      params: {
        id: movie.id.toString(),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const movieData = await fetchDetailMovie(Number(id));

  return {
    props: {
      movieData,
    },
  };
};

export default function MoviePage({
  movieData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
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
        <div>로딩중입니다.</div>
      </>
    );
  }

  if (!movieData) return "존재하지 않는 페이지입니다";

  return (
    <>
      <Head>
        <title>{movieData.title}</title>
        <meta property="og:image" content={movieData.posterImgUrl} />
        <meta property="og:title" content={movieData.title} />
        <meta property="og:description" content={movieData.description} />
      </Head>
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
    </>
  );
}
