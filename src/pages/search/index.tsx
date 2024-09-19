import SearchLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  return <h1>검색 결과 : {q}</h1>;
}

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
