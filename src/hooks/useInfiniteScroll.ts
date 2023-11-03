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

  useEffect(
    () => {
      setPaginationOffset(0);
      setHasMore(true);
      setData([]);
    },
    deps ? [...deps] : []
  );

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
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return { data, isLoading, error, lastElementRef };
};

export default useInfiniteScroll;
