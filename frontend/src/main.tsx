import { StrictMode } from 'react' //StrictMode helps detect errors and bad practices in development
import { createRoot } from 'react-dom/client'//Used to render your React app into the HTML page.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// QueryClient → manages API data 
// QueryClientProvider → makes it available in the whole app
import './index.css'
import App from './App'

const queryClient = new QueryClient()

//<QueryClientProvider client={queryClient}> useQuery / useMutation will not work
createRoot(document.getElementById('root')!).render( //render to root file index.html
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <App />
    </QueryClientProvider>
  </StrictMode>
)
