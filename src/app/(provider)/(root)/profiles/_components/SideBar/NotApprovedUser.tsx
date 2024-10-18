"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

type Sponsor = Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};
type Recipient = Pick<Tables<"recipientMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};

type NotApprovedUserProps = {
  user: Sponsor | Recipient;
  profile: Tables<"userProfiles">;
  recruitId: string;
};

type ApproveType = {
  userId: string;
  recruitId: string;
  role: string;
};

function NotApprovedUser({ profile, user, recruitId }: NotApprovedUserProps) {
  const queryClient = useQueryClient();

  // 수락하기
  const { mutate: approve } = useMutation({
    mutationFn: ({ userId, recruitId, role }: ApproveType) => {
      if (role === "sponsor")
        return clientApi.sponsorMeets.approveSponsor(userId, recruitId);
      if (role === "recipient")
        return clientApi.recipientMeets.approveRecipient(userId, recruitId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myRecruits", { userId: profile.userId }],
      });
    },
  });

  const handleClickApprove = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: ApproveType
  ) => {
    e.preventDefault();
    approve(data);
  };

  return (
    <Link
      href={`/profiles?userId=${user.userId}`}
      className="flex items-center gap-x-3 justify-center"
      key={user.userId}
    >
      {user.userProfiles?.profileImageUrl ? (
        <img
          src={user.userProfiles.profileImageUrl}
          alt="profile image"
          className="w-7 aspect-square  rounded-lg"
        />
      ) : (
        <div className="w-7 aspect-square rounded-lg grid place-items-center bg-[#f5f5f5]">
          <img
            className="object-cover w-8/12"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
            alt="default profile"
          />
        </div>
      )}
      <span>
        {user.userProfiles!.nickname.length < 6
          ? user.userProfiles?.nickname
          : user.userProfiles?.nickname.slice(0, 5) + "..."}
      </span>
      <Button
        intent="primary"
        rounded="sm"
        textIntent="primary"
        className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
        onClick={(e) =>
          handleClickApprove(e, {
            userId: user.userId,
            recruitId,
            role: user.userProfiles!.role,
          })
        }
      >
        승인
      </Button>
    </Link>
  );
}

export default NotApprovedUser;
