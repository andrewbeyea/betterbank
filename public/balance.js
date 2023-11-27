function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};
  const [email, setEmail]   = React.useState(userData.user);
  const [balance, setBalance] = React.useState('');   

  function handle(){
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
  };

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={userData.user} 
      readOnly='readonly'
    /><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}