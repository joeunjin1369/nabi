import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { Database } from "@/supabase/database.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

interface InitialErrMsgs {
  maxSponsorRecruits: string | null;
  maxRecipientRecruits: string | null;
  region: string | null;
  title: string | null;
}

const initialErrMsgs = {
  maxSponsorRecruits: null,
  maxRecipientRecruits: null,
  region: null,
  title: null,
};

interface EditRecruitForm {
  maxSponsorRecruits: HTMLInputElement;
  maxRecipientRecruits: HTMLInputElement;
  deadLineDate: HTMLInputElement;
  volunteeringDate: HTMLInputElement;
  region: HTMLInputElement;
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
}

type EditRecruitFormEvent = CustomFormEvent<EditRecruitForm>;

interface EditRecruitFormProps {
  recruitId: string;
}

function EditRecruitForm({ recruitId }: EditRecruitFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const authorId = useAuthStore((state) => state.currentUserId);

  const { data: recruit } = useQuery({
    queryKey: ["recruit"],
    queryFn: () => clientApi.recruits.getRecruit(recruitId),
  });

  const { mutate: editRecruit } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["recruits"]["Update"]
  >({
    mutationFn: (data) => clientApi.recruits.editRecruit(recruitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruits"] });
      alert("수정되었습니다.");
      router.push("/");
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };
  const handleSubmitRecruitEditForm: ComponentProps<"form">["onSubmit"] =
    async (e: EditRecruitFormEvent) => {
      e.preventDefault();

      if (!authorId) return;

      const maxSponsorRecruits = +e.target.maxSponsorRecruits.value;
      const maxRecipientRecruits = +e.target.maxRecipientRecruits.value;
      const deadLineDateValue = e.target.deadLineDate.value;
      const volunteeringDateValue = e.target.volunteeringDate.value;
      const region = e.target.region.value;
      const title = e.target.title.value;
      const content = e.target.content.value;
      const isEnd = false;

      const nonFormatDeadLineDate = dayjs(deadLineDateValue);
      const nonFormatVolunteeringDate = dayjs(volunteeringDateValue);

      setErrMsgs(initialErrMsgs);

      if (isNaN(maxSponsorRecruits) || maxSponsorRecruits <= 0) {
        return throwErrMsgs(
          "maxSponsorRecruits",
          "모집 인원은 1 이상의 숫자로만 작성해주세요"
        );
      }
      if (isNaN(maxRecipientRecruits) || maxRecipientRecruits <= 0) {
        return throwErrMsgs(
          "maxRecipientRecruits",
          "모집 인원은 1 이상의 숫자로만 작성해주세요"
        );
      }

      if (!deadLineDateValue) {
        return alert("모집 마감 날짜를 선택해주세요.");
      }
      if (!volunteeringDateValue) {
        return alert("자원 봉사 날짜를 선택해주세요.");
      }

      if (nonFormatVolunteeringDate.isBefore(nonFormatDeadLineDate)) {
        return alert("자원 봉사 날짜는 모집 마감 날짜 이후여야 합니다.");
      }
      if (!region) return throwErrMsgs("region", "지역을 입력해주세요");
      if (!title) return throwErrMsgs("title", "제목을 입력해주세요");
      if (!content) return alert("내용을 작성해주세요");

      const deadLineDate = nonFormatDeadLineDate.format("YYYY-MM-DD");
      const volunteeringDate = nonFormatVolunteeringDate.format("YYYY-MM-DD");

      const recruitEditData: Database["public"]["Tables"]["recruits"]["Insert"] =
        {
          maxSponsorRecruits,
          maxRecipientRecruits,
          deadLineDate,
          volunteeringDate,
          region,
          title,
          content,
          isEnd,
          authorId,
        };

      editRecruit(recruitEditData);
    };

  return (
    <form
      onSubmit={handleSubmitRecruitEditForm}
      className="flex flex-col gap-y-2"
    >
      <div className="flex gap-x-2">
        <InputGroup
          defaultValue={recruit?.maxSponsorRecruits}
          type="text"
          label="봉사자 모집 인원"
          name="maxSponsorRecruits"
          errorText={errMsgs.maxSponsorRecruits}
        />
        <InputGroup
          defaultValue={recruit?.maxRecipientRecruits}
          type="text"
          label="후원 아동 모집 인원"
          name="maxRecipientRecruits"
          errorText={errMsgs.maxRecipientRecruits}
        />
      </div>
      <div className="flex gap-x-2">
        <div>
          <p>모집 마감 날짜</p>
          <input
            defaultValue={
              recruit?.deadLineDate
                ? dayjs(recruit.deadLineDate).format("YYYY-MM-DD")
                : ""
            }
            className="border border-black px-7 py-1 mt-1"
            type="date"
            name="deadLineDate"
          />
        </div>
        <div>
          <p>자원 봉사 날짜</p>
          <input
            defaultValue={
              recruit?.volunteeringDate
                ? dayjs(recruit.volunteeringDate).format("YYYY-MM-DD")
                : ""
            }
            className="border border-black px-7 py-1 mt-1"
            type="date"
            name="volunteeringDate"
          />
        </div>
      </div>

      <InputGroup
        defaultValue={recruit?.region}
        type="text"
        label="지역"
        name="region"
        errorText={errMsgs.region}
      />

      <InputGroup
        defaultValue={recruit?.title}
        type="text"
        label="제목"
        name="title"
        errorText={errMsgs.title}
      />
      <div>
        <p className="mb-1">내용</p>
        <textarea
          defaultValue={recruit?.content}
          name="content"
          className="border-black border resize-none w-full h-60 p-3 "
        />
      </div>

      <ButtonGroup type="submit" value="등록하기" size="md" className="mt-4" />
    </form>
  );
}

export default EditRecruitForm;