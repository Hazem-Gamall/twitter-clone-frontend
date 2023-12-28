export type IPostFilters = "" | "with_replies" | "likes" | "media";

export const isOfTypePostFilters = (str: string) => {
  return ["", "with_replies", "likes", "media"].includes(str);
};
