import React, { useState } from "react"
import Blinking from "./Blinking"

interface TabsProps {
  children: React.ReactNode
}

const Tabs = ({ children }: TabsProps) => {
  return React.Children.map(children, (child) => {
    return <button>{child}</button>
  })
}

const Sandbox = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div style={{ border: "1px solid" }}>
      <Tabs>a</Tabs>

      <div>Content Tab 1</div>
    </div>
  )
}

// export default Blinking
export default Sandbox
