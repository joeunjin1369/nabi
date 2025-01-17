"use client";

import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useToastStore } from "@/zustand/toast.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FundModal from "./FundModal";

interface FundProps {
  domain: string;
  imgUrl: string;
}

function Fund({ domain, imgUrl }: FundProps) {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);
  const user = useAuthStore((state) => state.currentUser);
  const setActiveModal = useModalStore((state) => state.setActiveModal);

  const handleClickFunds = () => {
    if (!user || user.role === "recipient") {
      const content =
        user?.role === "recipient"
          ? "후원기금 모금은 후원자만 가능합니다"
          : "로그인을 하지 않아 후원기금 모금을 할 수 없습니다";

      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "권한 부족",
        content,
        type: "fail",
      };

      if (user?.role === "recipient") return addToast(toast);

      return router.push("/log-in");
    }

    setActiveModal(<FundModal domain={domain} />);
  };

  return (
    <button
      onClick={handleClickFunds}
      className="border border-gray-400 rounded-lg flex flex-col items-center justify-center"
    >
      <Image
        alt="domain image"
        width={300}
        height={300}
        src={imgUrl}
        className="w-16 aspect-square rounded-lg "
      />
      <span className="mx-auto">{domain}</span>
    </button>
  );
}

export default Fund;
