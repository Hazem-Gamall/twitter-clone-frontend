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
  const [data, setData] = useState<T[]>([]);

  const {
    data: listData,
    isLoading,
    error,
  } = useList<T>(
    httpService,
    { ...params, offset: paginationOffset, limit },
    deps ? [...deps, paginationOffset] : [paginationOffset]
  );

  useEffect(() => {
    console.log("hasmore", hasMore);
    console.log("data.leng", listData.length);

    setHasMore(listData.length !== 0);
    setData(data.concat(listData));
  }, [listData]);
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

  return { data, isLoading, error, lastElementRef };
};

export default useInfiniteScroll;
