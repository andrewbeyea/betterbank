function Login(){
  const user = localStorage.getItem('user'); 
  console.log('logged in as: ', user);
  const [show, setShow]     = React.useState((user === null));
  const [status, setStatus] = React.useState();    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>You are currently logged in.</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        location.reload();  
        props.setShow(true);
        props.setStatus('');
      }}>
        Log Out
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handle(){
    console.log(email, password)
    var url=`/account/login/${email}/${password}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data, data.length)
        if (data.length === 0) {
          props.setStatus('This user is not in our records');
          return;
        } else {
          props.setStatus(`Welcome, ${data[0].email}.`);
          props.setShow(false);
      
          // store the details in localStorage
          localStorage.setItem('user', data[0].email);
          localStorage.setItem('role', data[0].role);

          // call back to console
          let userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};
          console.log('User Updated: ',userData);

          
        }
    location.reload(); 
    })
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}