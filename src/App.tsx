import "@mantine/core/styles.css";
import "./App.css";
import { useBuckets } from "./api/buckets/Buckets.ts";
import { AppShell, Button, Flex, MantineProvider } from "@mantine/core";
import { Card } from "./components/card/Card.tsx";
import { useNavbar } from "./layout/useNavbar.tsx";

function App() {
  const { useGetAll: getAllBuckets } = useBuckets();
  const { data, isFetching, refetch } = getAllBuckets();
  const { render: Navbar, collapsed } = useNavbar();

  return (
    <MantineProvider>
      <AppShell
        withBorder
        padding={"md"}
        navbar={{
          width: collapsed ? 48 : 220,
          breakpoint: "sm",
        }}
      >
        <Navbar />
        <AppShell.Main>
          <Card
            title={"Buckets"}
            loading={isFetching}
            actions={[
              ({ gap }) => (
                <Flex {...{ gap }}>
                  <Button onClick={() => refetch()}>Refetch</Button>
                  <Button>Action 1.2</Button>
                </Flex>
              ),
              <Button>Action 2</Button>,
            ]}
          >
            {data && <div>{JSON.stringify(data)}</div>}
          </Card>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
