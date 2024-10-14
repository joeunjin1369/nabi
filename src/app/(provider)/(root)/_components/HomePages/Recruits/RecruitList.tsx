import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import RecruitDetails from "./RecruitDetails";

function RecruitList() {
  const { data: recruits, isLoading } = useQuery({
    queryKey: ["recruits"],
    queryFn: clientApi.recruits.getRecruits,
  });

  return (
    <ul className="mt-5 w-full">
      {recruits?.map((recruit) => (
        <li
          key={recruit.recruitId}
          className="bg-white mb-2 p-10 rounded-md relative"
        >
          <RecruitDetails recruit={recruit} />
        </li>
      ))}
    </ul>
  );
}

export default RecruitList;
