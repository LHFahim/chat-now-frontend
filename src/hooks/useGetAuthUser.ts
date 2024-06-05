import { useSelector } from "react-redux";

export default function useGetAuthUser() {
  const { user } = useSelector((state: any) => state.auth);

  return user;
}
