import StoreDetails from "@/components/Modal/components/StoreDetails";
import Modal from "@/components/Modal/Modal";
import { Tables } from "@/supabase/database.types";
import { useModal } from "@/zustand/modal.store";

interface StoreDetailModalProps {
  detailData: Omit<Tables<"storeDatas">, "lng" | "lat">;
}

function StoreDetailModal({ detailData }: StoreDetailModalProps) {
  const activeModal = useModal((state) => state.activeModal);
  return (
    <>
      {activeModal && (
        <Modal className="grid place-content-center w-auto">
          <StoreDetails detailData={detailData} />
        </Modal>
      )}
    </>
  );
}

export default StoreDetailModal;
