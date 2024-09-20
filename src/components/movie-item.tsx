import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

interface MovieProps {
  movie: MovieData;
}

export const MovieItem = ({ movie }: MovieProps) => {
  return (
    <Link className={style.container} href={`/movie/${movie.id}`}>
      <img src={movie.posterImgUrl} />
    </Link>
  );
};
