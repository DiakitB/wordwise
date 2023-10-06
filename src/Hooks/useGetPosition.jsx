import { useSearchParams } from "react-router-dom";

export function useGetPosition() {
  const [searchParms, setSearchParams] = useSearchParams();
  const la = searchParms.get("lat");
  const ln = searchParms.get("lng");
  return [la, ln];
}
