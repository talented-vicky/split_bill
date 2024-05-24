import { useState } from "react";


export default function App() {
  const [form, setForm] = useState(false);
  const [friends, setFriends] = useState([]);
  // const [selFriend, setSelFriend] = useState({});
  const [selFriend, setSelFriend] = useState(null);

  function handleAddFriend() {
    setForm(!form)
  }

  function handleFriendInput(frnd) {
    setFriends(existingFriends => [ ...existingFriends, frnd ]);
    setForm(!form)
  }

  function handleSelectFriend(frnd) {
    setSelFriend(currentFriend => currentFriend?.id === frnd.id ? null : frnd);
    setForm(false)
  }

  function handleUpdateFriend(bal) {
    // console.log(bal)
    setFriends(existingFriends => existingFriends.map(friend => friend.id === selFriend.id 
      ? { ...friend, balance: friend.balance + bal}
      : friend
    ))
    setSelFriend(null)
  }

  return (
    <div className="app"> 
      <div className="sidebar">
        <FriendsList friends={friends} onSelectFriend={handleSelectFriend} selFriend={selFriend}></FriendsList>
        {form && <AddFriend onFriendInput={handleFriendInput}></AddFriend>}
        <Button customOnClick={handleAddFriend}> {form ? "Close" : "Add Friend"} </Button>
      </div>
      {selFriend && 
        <SplitBill 
          key={selFriend.id}
          selFriend={selFriend} 
          onUpdateFriend={handleUpdateFriend}>
        </SplitBill>}
    </div>
    
  )
}

function FriendsList({friends, onSelectFriend, selFriend}) {
  return (
    <ul>
      {friends.length === 0 
        ? <h3>No friends yet, start adding 👌</h3>
        : friends.map(friend => 
          (<Friend 
              key={friend.id} 
              friend={friend} 
              onSelectFriend={onSelectFriend} 
              selFriend={selFriend}>
            </Friend>
          ))
      }
    </ul>
  )
}

function Friend({friend, onSelectFriend, selFriend}) {
  const friendClicked = selFriend?.id === friend.id;
  
  let classname;
  let billStatement = `You and ${friend.name} are even`;
  if(friend.balance > 0){
    classname = "green";
    billStatement = `You owe ${friend.name} #${friend.balance}`;
  } else if(friend.balance < 0){
    classname = "red";
    billStatement = `${friend.name} owes you #${Math.abs(friend.balance)}`;
  }
  
  return (
    <li className={friendClicked ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
        <h3> {friend.name} </h3>
        <p className={classname}> {billStatement} </p>
      <Button customOnClick={() => onSelectFriend(friend)
        }> {friendClicked ? "Close" : "Select"} </Button>
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
      id,
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

function SplitBill({selFriend, onUpdateFriend}){
  const [totalBill, setTotalBill] = useState("");
  const [userBill, setuserBill] = useState("");
  const friendBill = totalBill - userBill;
  const [payer, setPayer] = useState("me");

  function handleSplit(e) {
    e.preventDefault();
    if(!userBill || !userBill) return;

    onUpdateFriend(payer === "me" ? friendBill*-1 : userBill)
  }

  return <form className="form-split-bill" onSubmit={handleSplit}>
    <h2> Split Bill with {selFriend.name} </h2>
    <label> 💸 Total Bill </label>
    <input type="text" value={totalBill} onChange={e => setTotalBill(Number(e.target.value))}/>

    <label> 👨‍🔧 Your bill </label>
    <input type="text" value={userBill} onChange={e => setuserBill(Number(e.target.value) > totalBill ? userBill : Number(e.target.value))}/>
    
    <label> 🥰 {selFriend.name}'s bill </label>
    <input type="text" disabled value={friendBill}/>
    
    <label> ✔ Who is paying the bill </label>
    <select 
      value={payer}
      onChange={e => setPayer(e.target.value)}
    >
      <option value="me"> Me </option>
      <option value="friend"> {selFriend.name} </option>
    </select>
    <Button> Split bill </Button>
  </form>
}

function Button({customOnClick, children}) {
  return (
    <button className="button" onClick={customOnClick}> {children} </button>
  )
}