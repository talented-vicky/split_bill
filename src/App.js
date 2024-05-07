import { useState } from "react";

// const friendship = [
//   {
//     id: 118836,
//     name: "vicky",
//     image: "https://i.pravatar.cc/48?u=118836",
//     balance: -7
//   },
//   {
//     id: 933372,
//     name: "Nicole",
//     image: "https://i.pravatar.cc/48?u=933372",
//     balance: 20
//   },
//   {
//     id: 499476,
//     name: "Martial",
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 0
//   },
// ]

export default function App() {
  const [form, setForm] = useState(false);
  const [friends, setFriend] = useState([]);

  function handleAddFriend() {
    setForm(!form)
  }

  function handleFriendInput(frnd) {
    setFriend(existingFriends => [ ...existingFriends, frnd ])
  }

  return (
    <div className="app"> 
      <div className="sidebar">
        <FriendsList friends={friends}></FriendsList>
        {form && <AddFriend onFriendInput={handleFriendInput}></AddFriend>}
        <Button customOnClick={handleAddFriend}> {form ? "Close" : "Add Friend"} </Button>
      </div>
      <SplitBill ></SplitBill>
    </div>
    
  )
}

function FriendsList({friends}) {
  return (
    <ul>
      {friends.length === 0 
        ? <h3>No friends yet, start adding 👌</h3>
        : friends.map(friend => (<Friend friend={friend} key={friend.id}></Friend>))
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

function AddFriend({onFriendInput}) {
  const [username, setUsername] = useState("");
  const [img, setImage] = useState("https://i.pravatar.cc/48");

  // https://i.pravatar.cc/48 => generates random avatar

  function insertFriend(e) {
    e.preventDefault(); // prevent auto re-load of whole page

    if(!username || !img) return;

    const id = crypto.randomUUID() // won't work in older browsers tho
    const frnd = {
      name: username,
      image: `${img}?u=${id}`,
      balance: 0
    }
    
    onFriendInput(frnd);
    setUsername(""); setImage("https://i.pravatar.cc/48");
  }
  
  return (
    <form className="form-add-friend" onSubmit={insertFriend}>
      <label> 🤗 Friend name </label>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      
      <label> 📷 Image URL </label>
      <input type="text" value={img} onChange={e => setImage(e.target.value)}/>
      
      {/* <Button customOnClick={insertFriend}> Add </Button> */}
      {/* 'cos this form can also be submitted by hitting enter ↩ on last input */}
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
      <option value="me" onChange={e => setBill(e.target.value)}> </option>
      <option value="you" onChange={e => setBill(e.target.value)}> </option>
    </select>
    <Button> Split bill </Button>
  </form>
}

function Button({customOnClick, children}) {
  return (
    <button className="button" onClick={customOnClick}> {children} </button>
  )
}