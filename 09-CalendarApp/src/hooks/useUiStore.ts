import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  onCloseDateModal,
  onOpenDateModal,
  RootState,
} from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDateModalOpen } = useSelector((store: RootState) => ({
    isDateModalOpen: store.ui.isDateModalOpen,
  }));

  const onCloseModal = () => dispatch(onCloseDateModal());

  const onOpenModal = () => dispatch(onOpenDateModal());
  // const useDispatchApp = useDispatch<AppDispatch>;

  return { isDateModalOpen, onCloseModal, onOpenModal };
};
