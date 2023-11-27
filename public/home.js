function Home(){
  const userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};;
  const user = localStorage.getItem('user'); 
  var textBlock = (user === null)? "Please login or create an account to begin." : "Please select an option from the Navbar."; 
  console.log('logged in as: ', user);
  console.log(textBlock);
  const [show, setShow]     = React.useState((user === null));
  const [status, setStatus] = React.useState(textBlock);    

  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text={status}
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
