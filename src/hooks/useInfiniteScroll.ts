import { useCallback, useEffect, useRef, useState } from "react";
import useList from "./useList";
import { HttpService } from "../services/HttpService";

const useInfiniteScroll = <T>(
  httpService: HttpService,
  params = {},
  deps?: any[],
  offset = 0,
  limit = 5
) => {
  const [paginationOffset, setPaginationOffset] = useState(offset);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, error } = useList<T>(
    httpService,
    { ...params, offset: paginationOffset, limit },
    deps ? [...deps, paginationOffset] : [paginationOffset]
  );

  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPaginationOffset(paginationOffset + limit);
          console.log(entries[0], "visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => setHasMore(data.length !== 0), [data]);

  return { data, isLoading, error, lastElementRef };
};

export default useInfiniteScroll;
