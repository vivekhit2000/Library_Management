import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'admin-homepage',
  styleUrl: 'admin-homepage.css',
  shadow: true,
})
export class AdminHomePage {
  @State() showRegistrationOptions = false;

  toggleRegistrationOptions() {
    this.showRegistrationOptions = !this.showRegistrationOptions;
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
              
              <a href="/return-request">
                <li class="fa fa-user">Return Request</li>
              </a>
              <a href="/add-books">
                <li class="fa fa-user">Add Book</li>
              </a>
              <a href="/book-search">
                <li class="fa fa-user">Book Search</li>
              </a>
              <a href="/view-orders">
                <li class="fa fa-user">View Order</li>
              </a>
              <a href="/">
                <li class="fa fa-user">Logout</li>
              </a>
            </ul>
          </div>
        </div>
        <div id="slider">
          <div id="x">
            WELCOME TO LIBRARY<b style={{ color: '#2c7ad6' }}>ZONE</b>
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