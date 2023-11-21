import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
  shadow: true,
})
export class HomePage {
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
              <a href="#">
                <li class="fa fa-home">Home</li>
              </a>
              {/* <a href="/user-home-page">
                <li class="fa fa-image">Gallery</li>
              </a> */}
              <a href="/admin-login">
                <li class="fa fa-user">Admin Login</li>
              </a>
              <a href="/user-login">
                <li class="fa fa-user">Login</li>
              </a>
              
             
              <span onClick={() => this.toggleRegistrationOptions()}>
                <li class="fa fa-registered">Register</li>
              </span>

              {this.showRegistrationOptions && (
                <ul class="registration-options">
                  <a href="/user-registration">
                    <li>User Registration</li>
                  </a>
                  <a href="/admin-registration">
                    <li>Admin Registration</li>
                  </a>
                </ul>
              )}
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

