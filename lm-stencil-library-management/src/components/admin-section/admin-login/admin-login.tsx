import { Component, h } from '@stencil/core';

@Component({
  tag: 'admin-login',
  styleUrl: 'admin-login.css',
})
export class AdminLogin {
  adminName: string = '';
  password: string = '';

  handleAdminNameInput = (event: Event) => {
    this.adminName = (event.target as HTMLInputElement).value;
  };

  handlePasswordInput = (event: Event) => {
    this.password = (event.target as HTMLInputElement).value;
  };

  handleLogin = async () => {
    try {
      const loginData = {
        adminName: this.adminName,
        password: this.password,
      };

      const response = await fetch('https://localhost:7239/api/Admins/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const authenticatedAdmin = await response.json();
        console.log('Authenticated Admin:', authenticatedAdmin);
        window.alert('Login successful');
        window.location.href = '/admin-homepage'; // Replace with the correct URL
      } else {
        window.alert('Login failed. Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };



  render() {
    return (
      <div id="background">
        <div id="top">
          
          <a href="#" class="fa fa-facebook"></a>
          <a href="#" class="fa fa-instagram"></a>
          <a href="#" class="fa fa-twitter"></a>
        </div>
        <div id="menu">
          <div id="logo">
            LIBRARY<b style={{ color: '#2c7ad6' }}>ZONE</b>
          </div>
          <div id="menu1">
            <ul>
              <a href="/">
                <li class="fa fa-home">Home</li>
              </a>
              <a href="#">
                <li class="fa fa-user">Admin Login</li>
              </a>
              <a href="/user-login">
                <li class="fa fa-user">User Login</li>
              </a>
            </ul>
          </div>
        </div>
        <div id="slider">
          <div id="x">
            WELCOME TO LIBRARY<b style={{ color: 'blue' }}>ZONE</b>
            <p style={{ fontSize: '15px' }}>The World is Quiet Here</p>
          </div>
          <div id="y">
            <div id="l">
              <h1 style={{ textAlign: 'center', color: '#2c7ad6' }}>ADMIN LOGIN</h1>
              <div id="student">
              ADMIN NAME <br />
              <input
          type="text"
          id="adminname"
          class="t"
          value={this.adminName}
          onInput={this.handleAdminNameInput}
        />
        <br />
        PASSWORD <br />
        <input
          type="password"
          id="password"
          class="t"
          value={this.password}
          onInput={this.handlePasswordInput}
        />
        <br />
        <a href="#">
          <input
            type="button"
            value="LOGIN"
            style={{
              border: 'none',
              width: '50%',
              height: '30px',
              backgroundColor: '#c7a0dd',
            }}
            onClick={this.handleLogin}
          />
        </a>
              </div>
            </div>
          </div>
        </div>
        <div id="down">
          <h3>Stay Connected</h3>
          <a href="#" class="fa fa-facebook"></a>
          <a href="#" class="fa fa-instagram"></a>
          <a href="#" class="fa fa-twitter"></a>
          <h2>Contant Address</h2>
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
        <div class="footer">Developed By : {this.adminName}</div>
      </div>
    );
  }
}