import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'user-homepage',
  styleUrl: 'user-homepage.css',
  shadow: true,
})
export class UserHomePage {
  @State() showRegistrationOptions = false;
  @State() username = ''; // Initialize a state variable for the username

  componentDidLoad() {
    // Get the username from local storage
    const storedUser = localStorage.getItem('loginUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.userName; // Assuming that the username is stored in the 'username' property
    }
  }
  // method to handle logout
  handleLogout() {
    // Remove the logged-in user's data from local storage
    localStorage.removeItem('loginUser');

    // Redirect to the login page
    window.location.href = '/'; 
  }


  render() {
    return (
      <div id="background">
        <div id="top">
         
          <a href="#" class="fa fa-facebook" style={{ textDecoration: 'none', padding: '7px', float: 'right', color: 'white' }}></a>
          <a href="#" class="fa fa-instagram" style={{ textDecoration: 'none', padding: '7px', float: 'right', color: 'white' }}></a>
          <a href="#" class="fa fa-twitter" style={{ textDecoration: 'none', padding: '7px', float: 'right', color: 'white' }}></a>
        </div>
        <div id="menu">
          <div id="logo">
            LIBRARY<b style={{ color: '#2c7ad6' }}>ZONE</b>
          </div>
          <div id="menu1">
            <ul>
              <a href="/user-book-search">
                <li class="fa fa-home">Book Search</li>
              </a>
              <a href="/view-date-info">
                <li class="fa fa-user">Book Request</li>
              </a>
              <a href="/book-return">
                <li class="fa fa-user">Return Book</li>
              </a>
              <a href="/place-order">
                <li class="fa fa-user">Place Order</li>
              </a>
              <a href="/">
                <li class="fa fa-user">LogOut</li>
              </a>
            </ul>
          </div>
        </div>
        <div id="slider">
          <div id="x">
            WELCOME TO LIBRARY<b style={{ color: '#2c7ad6' }}>ZONE</b>
            {this.username && (
              <p style={{ fontSize: '25px' }}> Hello {this.username}</p>
            )}
            <p style={{ fontSize: '15px' }}>The World is Quiet Here</p>
          </div>
          
          
        </div>
        <div id="down">
          <h3>Stay Connected</h3>
          <a href="#" class="fa fa-facebook" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}></a>
          <a href="#" class="fa fa-instagram" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}></a>
          <a href="#" class="fa fa-twitter" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}></a>
          <h2>Contact Address</h2>
          <a href="#" class="fa fa-home" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}>
            Greenfield Ambition, ActionArea IID, Newtown, Kolkata, WestBengal-700161
          </a>
          <br />
          <a href="#" class="fa fa-phone" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}>
            9835894821
          </a>
          <br />
          <a href="#" class="fa fa-envelope" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}>
            vivek15@gmail.com
          </a>
        </div>
        <div class="footer">Developed By :</div>
      </div>
    );
  }
}
