import ColorSelect from "../../color/ColorSelect.tsx";
import Card from "../core/Card.tsx";
import { PaletteIcon } from "@phosphor-icons/react";
import { ActionIcon, Flex, Text } from "@mantine/core";
import {
  type ColorOption,
  useColorOptions,
} from "../../color/hooks/useColorOptions.ts";
import MotionExpandRTL from "../../motion/MotionExpandRTL.tsx";
import { useEffect, useMemo, useState } from "react";
import { useAccounts } from "../../../api/accounts/Accounts.ts";

export type AccountCardProps = {
  accountId: number;
};
export const AccountCard = ({ accountId }: AccountCardProps) => {
  const COLOR_OPTIONS = useColorOptions();
  const { useGetById, useUpdate } = useAccounts();

  const { data: envelope } = useGetById(accountId);
  const account = useMemo(() => envelope?.data?.[0], [envelope]);

  const { mutateAsync } = useUpdate();

  const [expandPalette, setExpandPalette] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<ColorOption>();
  useEffect(() => {
    setBackgroundColor(account?.color);
  }, [account?.color]);

  async function handleColorSelect(color: ColorOption): Promise<void> {
    setBackgroundColor(color);
    await mutateAsync({ ...account, color });
  }

  return (
    <Card
      title={
        <>
          <Text>{account?.name}</Text>
          <Flex gap={"sm"}>
            <MotionExpandRTL isOpen={expandPalette}>
              <ColorSelect onChange={handleColorSelect} />
            </MotionExpandRTL>
            <ActionIcon
              variant={"default"}
              onClick={() => setExpandPalette((prev) => !prev)}
            >
              <PaletteIcon size={16} />
            </ActionIcon>
          </Flex>
        </>
      }
      style={{
        transition: "background 0.2s ease-in-out",
        background: COLOR_OPTIONS[backgroundColor as ColorOption]?.background,
      }}
    >
      {JSON.stringify(envelope ?? {})}
    </Card>
  );
};
