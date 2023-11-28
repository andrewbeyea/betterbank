function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setStatus('');
        props.setShow(true)
      }}>
        Make another deposit
    </button>
  </>);
} 

function DepositForm(props){
  const userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};
  const [email, setEmail]   = React.useState(userData.user);
  const [amount, setAmount] = React.useState('');

  function handle(){
    console.log(email,amount);
    props.setStatus('Your balance is being updated'); 
    props.setShow(false);
    var url=`/account/transaction/${email}/${amount}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length == 0) {
          props.setStatus('This user is not in our records')      
          return;      
        } else {
        console.log(data);
        console.log(data.length);
      }});
    // then respond with the new balance
    var url=`/account/balance/${email}`;                          
    setTimeout(()=>{
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
    },2000)
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder={userData.user} 
      readOnly='readonly'
      // value={email} onChange={e => setEmail(e.currentTarget.value)}
    /><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}
    /><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}
