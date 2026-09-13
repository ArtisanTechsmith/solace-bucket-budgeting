import { Divider, Modal as MantineModal, type ModalProps } from "@mantine/core";
import type { ReactNode } from "react";
import ActionButtons, {
  type ActionButtonsProps,
} from "../layout/ActionButtons.tsx";

type MyModalProps = Exclude<ModalProps, "children"> & {
  actions?: ActionButtonsProps["actions"];
  children?: ReactNode | (() => ReactNode);
};
export const Modal = ({ children, actions, ...props }: MyModalProps) => {
  return (
    <MantineModal {...props}>
      <Divider />
      {typeof children === "function" ? children() : children}
      {actions && <ActionButtons.Row {...{ actions }} withDivider />}
    </MantineModal>
  );
};
