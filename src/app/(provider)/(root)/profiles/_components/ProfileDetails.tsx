/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Tables } from "@/supabase/database.types";
import ProfileButtons from "./ProfileButtons";

interface ProfileDetailsProps {
  showUserId: string;
  profile: Tables<"userProfiles">;
}

function ProfileDetails({ showUserId, profile }: ProfileDetailsProps) {
  return (
    <section className="border border-gray-100 w-[900px] h-[400px] bg-white rounded-lg overflow-hidden">
      {profile.bgImageUrl ? (
        <img
          src={profile.bgImageUrl}
          className="w-full h-64 border border-gray-100 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-yellow-200 border border-gray-100" />
      )}
      <div className="flex flex-row justify-between mx-10">
        <article className="h-full flex items-center gap-x-7">
          {profile.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              className="w-36 h-36 rounded-full -mt-12 object-cover"
            />
          ) : (
            <div className="w-36 aspect-square bg-white -mt-12  rounded-full overflow-hidden relative border-2 border-white">
              <div className="w-10 bg-gray-300 aspect-square rounded-full absolute top-8 left-1/2 -translate-x-1/2" />
              <div className="w-24 bg-gray-300 aspect-square rounded-full absolute top-20 left-1/2 -translate-x-1/2" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{profile.nickname}</span>
            <span>{profile.role === "sponsor" ? "후원자" : "후원아동"}</span>
          </div>
        </article>
        <ProfileButtons profile={profile} showUserId={showUserId} />
      </div>
    </section>
  );
}

export default ProfileDetails;