import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router"

const App = lazy(() => import("./App"))
const Product = lazy(() => import("./components/Product"))
const Sandbox = lazy(() => import("./modules/sandbox/Sandbox"))

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<Sandbox />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default Router
