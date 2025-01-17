import clientApi from "@/api/clientSide/api";
import { useModalStore } from "@/zustand/modal.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CreateFreeMealModal from "../Modals/FreeMeal/FreeMealCreateModal";

interface CreateFreeMealButtonProps {
  userId: string;
}

const CREATE_FREEMEAL_BUTTON_ICON =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/LinkToFreeMeal%20.png?t=2024-10-15T21%3A07%3A35.956Z";

function CreateFreeMealButton({ userId }: CreateFreeMealButtonProps) {
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  const { data: isStoreOwner } = useQuery({
    queryKey: ["storeOwners", { userId }],
    queryFn: () => {
      if (!userId) return null;
      return clientApi.storeOwners.checkIsStoreOwnerByUserId(userId);
    },
  });
  const handleClickCreateFreeMeal = () => {
    setActiveModal(<CreateFreeMealModal />);
  };

  return (
    isStoreOwner && (
      <li className="w-10 h-10">
        <button onClick={handleClickCreateFreeMeal}>
          <Image
            width={150}
            height={150}
            className="w-10 aspect-square rounded-lg"
            src={CREATE_FREEMEAL_BUTTON_ICON}
            alt="create free-meal post icon"
          />
        </button>
      </li>
    )
  );
}

export default CreateFreeMealButton;
