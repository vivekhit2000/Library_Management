import { Component, h, Prop, State} from '@stencil/core';

@Component({
  tag: 'user-login',
  styleUrl: 'user-login.css',
})
export class UserLogin {
  @Prop() userName: string;

  @State() loginInfo = {
    username: '',
    password: '',
  };

  // Import the Router service to enable navigation
  @Prop() history: any;

  handleInputChange(event, field) {
    this.loginInfo[field] = event.target.value;
  }

  

  async handleLoginClick(event) {
    event.preventDefault();
  
    try {
      const response = await fetch('https://localhost:7239/api/Users/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.loginInfo),
      });
  
      if (response.ok) {
        const user = await response.json();
        if (user) {
          alert('Login successful!');
          localStorage.setItem('loginUser', JSON.stringify(user));
          window.location.href = 'user-homepage';
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

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
              <a href="/admin-login">
                <li class="fa fa-user">Admin Login</li>
              </a>
              <a href="#">
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
              <h1 style={{ textAlign: 'center', color: '#2c7ad6' }}>USER LOGIN</h1>
              <div id="student">
                USER NAME <br />
                <input
                  type="text"
                  class="t"
                  value={this.loginInfo.username} // Bind value to loginInfo.username
                  onInput={(e) => this.handleInputChange(e, 'username')}
                />
                PASSWORD <br />
                <input
                  type="password"
                  class="t"
                  value={this.loginInfo.password} // Bind value to loginInfo.password
                  onInput={(e) => this.handleInputChange(e, 'password')}
                />
                <br />
                <a href="">
                  <input
                    type="submit"
                    value="LOGIN" 
                    style={{ border: 'none',
                    width: '50%',
                    height: '30px',
                    backgroundColor: '#c7a0dd' }}
                    onClick={(e) => this.handleLoginClick(e)} // 
                  />
                </a>
                <a href="#" style={{ color: 'blue', textDecoration: 'none' }}>
                  <p>forget password</p>
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
        <div class="footer">Developed By : </div>
      </div>
    );
  }
}
