export default function RootLayout() //nav bar, 
  
  //have stuff that sticks around forever


  // after login, username state "setUserId" will be initialized 
  // and prop drilled down throughtout the pages
  // this is the _id of User document in User collection of the Mongo database
  const [username, setUsername] = useState(null);

  // pass in trip obj
  const [currentTrip, setCurrentTrip] = useState(null);

return (
    <div> 
      <header>
        <nav></nav>
        <h1>Root Layout</h1>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )