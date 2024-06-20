import { useEffect, useState } from 'react'
import Header from './components/Header'
import Providers from './components/providers/providers'
import Sidebar from './components/sidebar/sidebar'
import { TailwindIndicator } from './components/tailwind-indicator'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import Login from './page/Login'
import Pages from './page/page'
import Loading from './page/Loading'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user)
      setIsLoggedIn(true)

    setIsLoading(false)
  }, [isLoggedIn, setIsLoggedIn])

  if (isLoading) {
    return <Loading />
  }

  return (
    <> 
      <Providers>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <>
            <Toaster />
            {!isLoggedIn ? (
              <Login />
            ) : (
              <>
                <Header />
                <div className="flex h-screen border-collapse ">
                  <Sidebar />
                  {/* <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1 pt-16 bg-green-500"> */}
                  <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10  pt-16">
                    <Pages/>
                  </main>
                </div>
                <TailwindIndicator />
              </>
                )}
          </>
        </ThemeProvider>
      </Providers>
       
    </>
  )
}

export default App
