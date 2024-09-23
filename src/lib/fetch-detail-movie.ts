import { MovieData } from "@/types";

export const fetchDetailMovie = async (
  id: number
): Promise<MovieData | null> => {
  const url = `https://onebite-cinema-api-main-rho.vercel.app/movie/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
