function CreateAccount(){
  const user = localStorage.getItem('user'); 
  console.log('logged in as: ', user);
  const [show, setShow]     = React.useState((user === null));
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handle(){
    // first, create new user
    console.log(name,email,password);
    const url=`/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);

    // then, log the user into their account
    console.log(email, password)
    var loginUrl=`/account/login/${email}/${password}`;
    await fetch(loginUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data, data.length)
        if (data.length === 0) {
          // props.setStatus('This user is not in our records');
          return;
        } else {
          // props.setStatus(`Welcome, ${data[0].email}.`);
          // props.setShow(false);
      
          // store the details in localStorage
          localStorage.setItem('user', data[0].email);
          localStorage.setItem('role', data[0].role);

          // call back to console
          let userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};
          console.log('User Updated: ',userData);
          // location.reload(); 
          location.assign("./")
          
        }


    })
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}