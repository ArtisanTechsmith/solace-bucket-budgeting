import type { ReactNode } from "react";
import { Divider, Flex } from "@mantine/core";

export type ActionButtonsFunction = (props: { gap: number }) => ReactNode;
export type ActionButtonsProps = {
  gap?: number;
  withDivider?: boolean;
  actions?:
    ReactNode | (ReactNode | ActionButtonsFunction)[] | ActionButtonsFunction;
};
export const ActionButtonsRow = ({
  actions,
  gap,
  withDivider,
}: ActionButtonsProps) => {
  const actionsGap = gap ?? 12;

  return (
    <>
      {withDivider && <Divider mt={"sm"} mb={"sm"} />}
      <Flex justify={"space-between"} gap={actionsGap}>
        {typeof actions === "function"
          ? actions({ gap: actionsGap })
          : Array.isArray(actions)
            ? actions.map((a) => {
                if (typeof a === "function") return a({ gap: actionsGap });
                else return a;
              })
            : actions}
      </Flex>
    </>
  );
};

const ActionButtons = {
  Row: ActionButtonsRow,
};
export default ActionButtons;
