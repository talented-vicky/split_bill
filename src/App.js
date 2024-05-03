import { useState } from "react";

const friends = [
  {
    id: 118836,
    name: "vicky",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7
  },
  {
    id: 933372,
    name: "Nicole",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20
  },
  {
    id: 499476,
    name: "Martial",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0
  },
]
export default function App() {

  return (
    <div className="app"> 
      <div className="sidebar">
        <FriendsList></FriendsList>
        <AddFriend ></AddFriend>
        <Button> Add Friend </Button>
      </div>
      <SplitBill></SplitBill>
    </div>
    
  )
}

function FriendsList() {
  return (
    <ul>
      {
        friends.map(friend => (<Friend friend={friend} key={friend.id}></Friend>))
      }
    </ul>
  )
}

function Friend({friend}) {
  let classname;
  let billStatement = `You and ${friend.name} are even`;
  if(friend.balance > 0){
    classname = "green";
    billStatement = `You owe ${friend.name} ___`;
  } else if(friend.balance < 0){
    classname = "red";
    billStatement = `${friend.name} owes you ___`;
  }
  
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <div>
        <h3> {friend.name} </h3>
        <p className={classname}> {billStatement} </p>
      </div>
      <Button> Select </Button>
    </li>
  )
}

function AddFriend() {
  const [text, setText] = useState(friends.name);
  const [img, setImage] = useState(friends.image);
  
  return (
    <form className="form-add-friend">
      <label> 🤗 Friend name </label>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      
      <label> 📷 Image URL </label>
      <input type="text" value={img} onChange={e => setImage(e.target.value)}/>
      
      <Button> Add </Button>
    </form>
  )
}
function SplitBill({friend}){
  const [bill, setBill] = useState();
  function handleSplit() {
    //
  }

  return <form className="form-split-bill">
    <h2> Split Bill </h2>
    <label> 💸 Total Bill </label>
    <input type="text" value={bill} onChange={e => e.target.value}/>

    <label> 👨‍🔧 Your bill </label>
    <input type="text" value={bill} onChange={e => e.target.value}/>
    
    <label> 🥰 `${3} s bill` </label>
    <input type="text" disabled value={bill} onChange={e => e.target.value}/>
    
    <label> ✔ Who is paying the bill </label>
    <select value={bill}>
      <option value={"me"} onChange={e => setBill(e.target.value)}> </option>
      <option value={"you"} onChange={e => setBill(e.target.value)}> </option>
    </select>
    <Button> Split bill </Button>
  </form>
}

function Button({children}) {
  return (
    <button className="button"> {children} </button>
  )
}