import { Component, h, Prop, State } from '@stencil/core';


@Component({
  tag: 'admin-registration',
  styleUrl: 'admin-registration.css',
})
export class AdminRegistration {
  @Prop() userName: string;
  @State() adminInfo = {
    adminName: '',
    password: '',
    dob: '',
    phone: '',
  };

  handleInputChange(event, field) {
    this.adminInfo[field] = event.target.value;
  }

  async handleSaveClick(event) {
    event.preventDefault();

    // Check if adminName is not empty
    if (!this.adminInfo.adminName) {
      console.error('Admin Name is required.');
      return;
    }

    try {
      const serializedAdminInfo = JSON.stringify(this.adminInfo);

      const response = await fetch('https://localhost:7239/api/Admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: serializedAdminInfo,
      });

      if (response.ok) {
        this.adminInfo = {
          adminName: '',
          password: '',
          dob: '',
          phone: '',
        };
        alert('Data saved successfully!');
        window.location.href = '/';
      } else {
        console.error('Error saving data to the backend:', await response.text());
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
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
              <a href="#">
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
              <h1 style={{ textAlign: 'center', color: 'black' }}>ADMIN REGISTRATION</h1>
              <div id="student">
                ADMIN NAME <br />
                <input
                  type="text"
                  class="t"
                  value={this.adminInfo.adminName}
                  onInput={(e) => this.handleInputChange(e, 'adminName')}
                  autoComplete="off"
                  required  // Ensure the 'required' attribute is present
                />
                <br />
                PASSWORD <br />
                <input
                  type="password"
                  class="t"
                  value={this.adminInfo.password}
                  onInput={(e) => this.handleInputChange(e, 'password')}
                />
                <br />
                DOB <br />
                <input
                  type="date"
                  class="t"
                  value={this.adminInfo.dob.toString().substring(0, 10)} // Format the Date to ISO string
                  onInput={(e) => this.handleInputChange(e, 'dob')}
                />
                <br />
                <br />
                PHONE <br />
                <input
                  type="number"
                  class="t"
                  value={this.adminInfo.phone}
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
