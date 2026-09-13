import {
  Card as MantineCard,
  CloseButton,
  Divider,
  Flex,
  Text,
} from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";
import { ClimbingBoxLoader } from "react-spinners";

type ActionsFunction = (props: { gap: number }) => ReactNode;
type CardActionsProps = {
  actions?: ReactNode | (ReactNode | ActionsFunction)[] | ActionsFunction;
};
const CardActions = ({ actions }: CardActionsProps) => {
  const actionsGap = 12;

  return (
    <Flex
      gap={actionsGap}
      justify={Array.isArray(actions) ? "space-between" : "flex-end"}
    >
      {typeof actions === "function"
        ? actions({ gap: actionsGap })
        : Array.isArray(actions)
          ? actions.map((a) => {
              if (typeof a === "function") return a({ gap: actionsGap });
              else return a;
            })
          : actions}
    </Flex>
  );
};

export type CardProps = {
  title?: ReactNode;
  loading?: boolean;
} & CardActionsProps;
export const Card = ({
  children,
  title,
  loading,
  actions,
}: PropsWithChildren<CardProps>) => {
  return (
    <MantineCard withBorder>
      <Flex justify={"space-between"}>
        <Text>{title}</Text>
        <CloseButton onClick={() => console.log("close")} />
      </Flex>
      {loading ? <ClimbingBoxLoader /> : <></>}
      <div>{children}</div>
      {actions && (
        <>
          <Divider mt={"sm"} mb={"sm"} />
          <CardActions {...{ actions }} />
        </>
      )}
    </MantineCard>
  );
};
