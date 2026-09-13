import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClientProvider} from "./api/QueryClientProvider.tsx";
import {MemoryRouter} from "react-router";

const bootstrap = async () => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider>
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    </QueryClientProvider>
  )
}
void bootstrap()
