function NavBar() {
  const userData = {user: localStorage.getItem('user'), role: localStorage.getItem('role')};;
  console.log('user: ', userData.user);
  console.log('role: ', userData.role);
  const role = userData.role;

  // const role = "user";
  // const role = "admin";
  // ctx.user = "bob@mit.edu";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {/* menu sets:
      1) not logged in - gets create account and login (role === null)
      2) logged in as user - gets logout, deposit, withdraw, balance (role === user)
      3) logged in as admin - gets user + all data (role === admin)
*/}
        {role === null ? (
          <>
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/CreateAccount/">
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login/">
                  Log In
                </a>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance/">
                  Balance
                </a>
              </li>
              {role == "admin" && (
                <li className="nav-item">
                  <a className="nav-link" href="#/alldata/">
                    AllData
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#/login/">
                  Log Out
                </a>
              </li>
            </ul>
            <ul className="navbar-nav"></ul>
            <span className="navbar-text">Logged in as {userData.user} ({userData.role})</span>
          </>
        )}
      </div>
    </nav>
  );
}
