import { Component, Prop, State, h} from '@stencil/core';

@Component({
  tag: 'add-books',
  styleUrl: 'add-books.css',
})
export class AdminLogin {
  @Prop() adminName: string;
  @State() bookData = {
    bookId: '',
    title: '',
    authorName: '',
    price: '',
    quantity: '',
  };

  handleInputChange(event: Event, field: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.bookData = {
      ...this.bookData,
      [field]: inputValue,
    };
  }

  handleAddBook() {
    const bookData = {
        title: this.bookData.title,
        authorName: this.bookData.authorName,
        price: parseFloat(this.bookData.price),
        quantity: parseInt(this.bookData.quantity)
    };

    fetch('https://localhost:7239/api/Books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    })
    .then(response => {
        if (response.status === 201) {
            // Book added successfully
            alert('Book added successfully');
            this.bookData = {
                bookId: '',
                title: '',
                authorName: '',
                price: '',
                quantity: '',
            };
        } else {
            // Handle other status codes or errors
            alert('Error adding book');
        }
    })
    .catch(error => {
        console.error('Error adding book:', error);
        // Handle errors as needed
    });
}


  


  render() {
    return (
      <div id="background">
        <div id="top">
          {/* <a href="#" class="fa fa-envelope">
            raviverma@gmail.com
          </a>
          <a href="#" class="fa fa-phone">
            +91-73
          </a> */}
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
              <a href="/admin-homepage">
                <li class="fa fa-home">Home</li>
              </a>
              <a href="/return-request">
                <li class="fa fa-user">Return Request</li>
              </a>
              <a href="/book-search">
                <li class="fa fa-user">Book Search</li>
              </a>
              <a href="/view-orders">
                <li class="fa fa-user">View Order</li>
              </a>
              <a href="/user-login">
                <li class="fa fa-user">LogOut</li>
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
              <h1 style={{ textAlign: 'center', color: 'black' }}>ADD BOOK</h1>
              <div id="student">
              
              <br />
              Title <br />
              <input
                type="text"
                value={this.bookData.title}
                onInput={(event) => this.handleInputChange(event, 'title')}
                class="t"
              />
              <br />
              Author Name <br />
              <input
                type="text"
                value={this.bookData.authorName}
                onInput={(event) => this.handleInputChange(event, 'authorName')}
                class="t"
              />
              <br />
              Price <br />
              <input
                type="text"
                value={this.bookData.price}
                onInput={(event) => this.handleInputChange(event, 'price')}
                class="t"
              />
              <br />
              Quantity <br />
              <input
                type="text"
                value={this.bookData.quantity}
                onInput={(event) => this.handleInputChange(event, 'quantity')}
                class="t"
              />
              <br />
              <a href="#">
                <input
                  type="button"
                  value="Add Book"
                  style={{
                    border: 'none',
                      width: '50%',
                      height: '30px',
                      backgroundColor: '#c7a0dd'
                  }}
                  onClick={() => this.handleAddBook()}
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
