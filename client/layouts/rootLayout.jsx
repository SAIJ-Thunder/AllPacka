export default function RootLayout() //nav bar, 
  
  //have stuff that sticks around forever


  // after login, username state "setUserId" will be initialized 
  // and prop drilled down throughtout the pages
  // this is the _id of User document in User collection of the Mongo database
  const [username, setUsername] = useState(null);

  // pass in trip obj
  const [currentTrip, setCurrentTrip] = useState(null);

  return (
    <header>
      <nav></nav>
        Component2 //different pages
        
      
      Component3
        Component4
    </header>
  )