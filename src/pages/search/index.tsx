import { useRouter } from "next/router";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  return <h1>검색 결과 : {q}</h1>;
}
