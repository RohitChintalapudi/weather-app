import {createRoot} from "react-dom/client"
import Header from "./Header"
import Main from "./main"
const root = createRoot(document.getElementById('root'))
root.render(
  <>
    <Header />
    <Main />
  </>
)
