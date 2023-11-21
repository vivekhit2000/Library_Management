import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'user-registration',
  styleUrl: 'user-registration.css',
})
export class UserRegistration {
  @Prop() userName: string;
  @State() userInfo = {
    username: '',
    password: '',
    dob: '',
    phone: '',
  };

  handleInputChange(event: Event, field: string): void {
    this.userInfo[field] = (event.target as HTMLInputElement).value;
  }

  async handleSaveClick(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.userInfo.username || !this.userInfo.password) {
      console.error('Username and Password are required.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7239/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userInfo),
      });

      if (response.ok) {
        this.userInfo = {
          username: '',
          password: '',
          dob: '',
          phone: '',
        };
        alert('Data saved successfully!');
        window.location.href = '/';
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (errorData.errors) {
          for (const key in errorData.errors) {
            if (errorData.errors.hasOwnProperty(key)) {
              const errorMessages = errorData.errors[key];
              console.error(`Validation error in field ${key}: ${errorMessages.join(', ')}`);
            }
          }
        }
      } else {
        console.error('Error saving data to the server:', await response.text());
      }
    } catch (error) {
      console.error('Error saving data to the server:', error);
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
              <a href="/admin-registration">
                <li class="fa fa-user">Admin Registration</li>
              </a>
              <a href="/user-registration">
                <li class="fa fa-registered">User Registration</li>
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
              <h1 style={{ textAlign: 'center', color: 'black' }}>USER REGISTRATION</h1>
              <div id="student">
                USER NAME <br />
                <input
                  type="text"
                  class="t"
                  value={this.userInfo.username}
                  onInput={(e) => this.handleInputChange(e, 'username')}
                  autoComplete="off"
                />
                <br />
                PASSWORD <br />
                <input
                  type="password"
                  class="t"
                  value={this.userInfo.password}
                  onInput={(e) => this.handleInputChange(e, 'password')}
                />
                <br />
                DOB <br />
                <input
                  type="date"
                  class="t"
                  value={this.userInfo.dob}
                  onInput={(e) => this.handleInputChange(e, 'dob')}
                />
                <br />
                PHONE <br />
                <input
                  type="number"
                  class="t"
                  value={this.userInfo.phone}
                  onInput={(e) => this.handleInputChange(e, 'phone')}
                />
                <br />
                <form onSubmit={(e) => this.handleSaveClick(e)}>
                  <input
                    type="submit"
                    value="SAVE"
                    style={{
                      border: 'none',
                      width: '50%',
                      height: '30px',
                      backgroundColor: '#c7a0dd'
                    }}
                  />
                </form>
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
          <h2>Contact Address</h2>
          <a
            href="#"
            class="fa fa-home"
            style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}
          >
            Greenfield Ambition, ActionArea IID, Newtown, Kolkata, WestBengal-700161
          </a>
          <br />
          <a
            href="#"
            class="fa fa-phone"
            style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}
          >
            9835894821
          </a>
          <br />
          <a
            href="#"
            class="fa fa-envelope"
            style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}
          >
            vivek15@gmail.com
          </a>
        </div>
        <div class="footer">Developed By : {this.userName}</div>
      </div>
    );
  }
}

