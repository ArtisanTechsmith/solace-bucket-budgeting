import { create } from "zustand";
import { ActionIcon, AppShell, Group, Stack } from "@mantine/core";
import { MotionRotate } from "../components/motion/MotionRotate.tsx";
import { CaretLeftIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type UseNavbarState = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  render: () => ReactNode;
};
export const useNavbar = create<UseNavbarState>((set, _, store) => ({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => set({ collapsed }),

  render: () => {
    const { collapsed, setCollapsed } = store.getState();
    return (
      <AppShell.Navbar p="xs" style={{ transition: "width 200ms ease" }}>
        <Group justify={"flex-end"} mt="xs" mb="md">
          <ActionIcon
            size="md"
            variant="default"
            onClick={() => setCollapsed(!collapsed)}
          >
            <MotionRotate rotate={collapsed ? -180 : 0}>
              <CaretLeftIcon size={12} />
            </MotionRotate>
          </ActionIcon>
        </Group>

        {!collapsed && <Stack gap="xs">{/* nav items */}</Stack>}
      </AppShell.Navbar>
    );
  },
}));
