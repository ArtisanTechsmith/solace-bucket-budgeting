import ColorSelect from "../../color/ColorSelect.tsx";
import { Card } from "../core/Card.tsx";
import { PaletteIcon } from "@phosphor-icons/react";
import { ActionIcon } from "@mantine/core";
import type { AccountDto } from "../../../api/accounts/AccountDto.ts";

export type AccountCardProps = {
  account: AccountDto;
};
export const AccountCard = () => {
  return (
    <Card
      title={[
        <div />,
        <ActionIcon variant={"default"}>
          <PaletteIcon size={16} />
        </ActionIcon>,
      ]}
    >
      <ColorSelect onChange={(v) => console.log(v)} />
    </Card>
  );
};
