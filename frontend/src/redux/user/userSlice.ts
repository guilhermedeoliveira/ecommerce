import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "types"

export interface UserState {
  users: User[]
}

const mockedUsers: User[] = [
  {
    id: "user_001",
    name: "Alice Smith",
    age: 30,
    address: "123 Main St, Anytown",
    occupation: "Software Engineer",
  },
  {
    id: "user_002",
    name: "Bob Johnson",
    age: 45,
    address: "456 Oak Ave, Otherville",
    occupation: "Marketing Manager",
  },
  {
    id: "user_003",
    name: "Charlie Brown",
    age: 22,
    address: "789 Pine Ln, Villageton",
    occupation: "Student",
  },
  {
    id: "user_004",
    name: "Diana Prince",
    age: 38,
    address: "101 Royal Rd, Capital City",
    occupation: "Architect",
  },
  {
    id: "user_005",
    name: "Eve Adams",
    age: 55,
    address: "202 Elm St, Suburbia",
    occupation: "Retired Teacher",
  },
  {
    id: "user_006",
    name: "Frank White",
    age: 29,
    address: "303 Maple Dr, Countryside",
    occupation: "Graphic Designer",
  },
  {
    id: "user_007",
    name: "Grace Lee",
    age: 41,
    address: "404 Cedar Ct, Lakeside",
    occupation: "Doctor",
  },
  {
    id: "user_008",
    name: "Henry Green",
    age: 60,
    address: "505 Birch Blvd, Mountainview",
    occupation: "Consultant",
  },
  {
    id: "user_009",
    name: "Ivy King",
    age: 25,
    address: "606 Willow Way, Rivertown",
    occupation: "Chef",
  },
  {
    id: "user_010",
    name: "Jack Hall",
    age: 50,
    address: "707 Spruce Sq, Forest Hills",
    occupation: "Accountant",
  },
]

const initialState: UserState = {
  users: mockedUsers,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const user = state.users.find((user) => user.id === action.payload.id)

      if (user) {
        user.name = action.payload.name
      }

      /*
      state.users.map((user) =>
        user.id === action.payload.id
          ? { ...user, name: action.payload.name }
          : user
      )
      */
    },
  },
})

export const { addUser, updateName } = userSlice.actions
export default userSlice.reducer
