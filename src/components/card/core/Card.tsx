import { Card as MantineCard, Flex, Text } from "@mantine/core";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import type { ActionButtonsProps } from "../../layout/ActionButtons.tsx";
import ActionButtons from "../../layout/ActionButtons.tsx";

export type CardProps = {
  title?: string | ReactNode;
  loading?: boolean;
  actions?: ActionButtonsProps["actions"];
  style?: CSSProperties;
};
const Card = ({
  children,
  title,
  loading,
  actions,
  style,
}: PropsWithChildren<CardProps>) => {
  return (
    <MantineCard withBorder {...{ style }}>
      <Flex justify={"space-between"}>
        {typeof title === "string" ? <Text>{title}</Text> : title}
      </Flex>
      {loading ? <ClimbingBoxLoader /> : <></>}
      <div>{children}</div>
      {actions && <ActionButtons.Row actions={actions} withDivider />}
    </MantineCard>
  );
};

export default Card;
