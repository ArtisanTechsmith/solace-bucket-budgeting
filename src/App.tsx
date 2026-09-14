import "@mantine/core/styles.css";
import "./App.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { useNavbar } from "./layout/hooks/useNavbar.tsx";
import { AccountCard } from "./components/card/account-card/AccountCard.tsx";

function App() {
  const { render: Navbar, collapsed } = useNavbar();

  return (
    <MantineProvider>
      <AppShell
        withBorder
        padding={"md"}
        navbar={{
          width: collapsed ? 48 : 220,
          breakpoint: "xs",
        }}
      >
        <Navbar />
        <AppShell.Main>
          <AccountCard accountId={1} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
