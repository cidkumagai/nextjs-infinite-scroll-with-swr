type GetKey = (pageIndex: number, previousPageData: any) => string | null;

export const LIMIT = 20;
export const getKey: GetKey = (_pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.data) return null;

  return `/api/users?limit=${LIMIT}`;
};
