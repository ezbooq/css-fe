import { useLocation } from "react-router-dom";

export const useLastPathSegment = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
};
