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
      </div>
    </div>
    
  )
}

function FriendsList() {
  return (
    <>
      <ul>
        {
          friends.map(friend => (<Friend friend={friend} key={friend.id}></Friend>))
        }
      </ul>
      <button className="button"> Add friend </button>
    </>
  )
}

function Friend({friend}) {
  let classname;
  if(friend.balance > 0){
    classname = "green"
  } else if(friend.balance < 0){
    classname = "red";
  }

  let billStatement = `You and ${friend.name} are even`;
  if(friend.balance > 0){
    billStatement = `You owe ${friend.name} ___`
  } else if(friend.balance < 0){
    billStatement = `${friend.name} owes you ___`;
  }
  
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <div>
        <h3> {friend.name} </h3>
        <p className={classname}> {billStatement} </p>
      </div>
      <button className="button"> select </button>
    </li>
  )
}
