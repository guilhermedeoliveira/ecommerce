import { useSelector, useDispatch } from "react-redux"
import { addUser, updateName } from "../../redux/user/index"
import type { RootState } from "../../redux/store"

const newUser = {
  id: "NEW_USER_ID",
  name: "Alice Smith",
  age: 30,
  address: "123 Main St, Anytown",
  occupation: "Software Engineer",
}

const newName = "NEW_NAME"

const Product = () => {
  const state = useSelector((state: RootState) => state)
  const users = state.user.users
  const dispatch = useDispatch()

  return (
    <div>
      Product
      <button onClick={() => dispatch(addUser(newUser))}>
        Add New User
      </button>
      <button
        onClick={() =>
          users[0] && dispatch(updateName({ id: users[0].id, name: newName }))
        }
      >
        Update User
      </button>
      <pre>{JSON.stringify({ users }, null, 2)}</pre>
    </div>
  )
}

export default Product
