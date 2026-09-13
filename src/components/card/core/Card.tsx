import { Card as MantineCard, Flex, Text } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import type { ActionButtonsProps } from "../../layout/ActionButtons.tsx";
import ActionButtons from "../../layout/ActionButtons.tsx";

export type CardProps = {
  title?: string | ReactNode;
  loading?: boolean;
  actions?: ActionButtonsProps["actions"];
};
export const Card = ({
  children,
  title,
  loading,
  actions,
}: PropsWithChildren<CardProps>) => {
  return (
    <MantineCard withBorder>
      <Flex justify={"space-between"}>
        {typeof title === "string" ? <Text>{title}</Text> : title}
      </Flex>
      {loading ? <ClimbingBoxLoader /> : <></>}
      <div>{children}</div>
      {actions && <ActionButtons.Row actions={actions} withDivider />}
    </MantineCard>
  );
};
