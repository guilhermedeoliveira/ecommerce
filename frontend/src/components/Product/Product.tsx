import { useSelector } from "react-redux"

const Product = () => {
  const store = useSelector((state) => state)
  return (
    <div>
      <pre>{JSON.stringify({ store }, null, 2)}</pre>
      Product
    </div>
  )
}

export default Product
