function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setStatus('');
        props.setShow(true)
      }}>
        Make another withdrawal
    </button>
  </>);
}

function WithdrawForm(props){
  const userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};
  const [email, setEmail]   = React.useState(userData.user);
  const [amount, setAmount] = React.useState('');
 
  function handle(){
    let amt = amount * -1;
    console.log(email,amt);
    var url=`/account/transaction/${email}/${amt}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length == 0) {
          props.setStatus('This user is not in our records')      
          return;      
        } else {
        console.log(data);
        console.log(data.length);
        props.setStatus('Your balance has been updated'); 
        props.setShow(false);
      }});
    // then respond with the new balance after waiting a half second
    var url=`/account/balance/${email}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length == 0) {
          props.setStatus('This user is not in our records')      
          return;      
        } else {
        console.log(data);
        console.log(data.length);
        props.setStatus('Your balance is: $' + data[0].balance); 
        props.setShow(false);
    }});
  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email"
      readOnly="readonly" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={()=>(setTimeout(handle(),1000))}>
        Withdraw
    </button>

  </>);
}
