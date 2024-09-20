import { MovieData } from "@/types";

export const fetchMovies = async (q?: string): Promise<MovieData[]> => {
  let url = `http://localhost:12345/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
