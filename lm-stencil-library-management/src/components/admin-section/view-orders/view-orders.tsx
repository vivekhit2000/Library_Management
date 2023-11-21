import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'view-orders',
  styleUrl: 'view-orders.css',
})
export class ViewOrders {
  @State() tempOrders: Array<any>;

  constructor() {
    this.tempOrders = []; // Initialize with an empty array
  }

  async componentDidLoad() {
    // Fetch order data from your API endpoint
    try {
      const response = await fetch('https://localhost:7239/api/PlaceOrders'); // Replace with your actual API endpoint
      if (response.ok) {
        const orderData = await response.json();
        // Filter out orders with issueStatus "Returned"
        this.tempOrders = orderData.filter((order) => order.issueStatus !== 'Returned');
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString); // Convert the date string to a JavaScript Date object
    const formattedDate = date.toLocaleDateString(); // Format the date to a human-readable format (MM/DD/YYYY or DD/MM/YYYY depending on the locale)
    return formattedDate;
  }

  handleAcceptOrderClick(orderIndex: number) {
    const acceptedOrder = this.tempOrders[orderIndex];
    if (acceptedOrder.issueStatus === 'pending') {
      fetch(`https://localhost:7239/api/PlaceOrders/accept/${acceptedOrder.orderId}`, {
        method: 'PUT',
      })
        .then(response => {
          if (response.ok) {
            // Update the UI or perform any necessary actions
            acceptedOrder.issueStatus = 'Accepted'; // Update the local order object
            // ... (you can update the UI as needed)
          } else {
            console.error('Failed to accept the order');
          }
        })
        .catch(error => {
          console.error('Error accepting the order:', error);
        });
    }
  }

  handleRejectOrderClick(orderIndex: number) {
    const rejectedOrder = this.tempOrders[orderIndex];
    if (rejectedOrder.issueStatus === 'pending') {
      fetch(`https://localhost:7239/api/PlaceOrders/reject/${rejectedOrder.orderId}`, {
        method: 'PUT',
      })
        .then(response => {
          if (response.ok) {
            // Update the UI or perform any necessary actions
            // ...
          } else {
            console.error('Failed to reject the order');
          }
        })
        .catch(error => {
          console.error('Error rejecting the order:', error);
        });
    }
  }

  render() {
    return (
      <div id="background">
        <div id="top">
          {/* Social media links */}
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
              <a href="/admin-homepage"><li class="fa fa-home">Home</li></a>
              <a href="/return-request"><li class="fa fa-user">Return Request</li></a>
              <a href="/book-search"><li class="fa fa-user">Book Search</li></a>
              <a href="/add-books"><li class="fa fa-user">Add Books</li></a>
              <a href="/user-login"><li class="fa fa-user">LogOut</li></a>
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
              <h1 style={{ textAlign: 'center', color: 'black' }}>View Orders</h1>
              <div id="student">
                <form>
                  <div class="scrollable-table">
                    <table>
                      <thead>
                        <tr class="table-header">
                          <th>OrderID</th>
                          <th>Book ID</th>
                          <th>Book Name</th>
                          <th>User ID</th>
                          <th>User Name</th>
                          <th>Issue Date</th>
                          <th>Issue Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.tempOrders.map((order, index) => (
                          <tr key={index}>
                            <td style={{ padding: '5px' }}>{order.orderId}</td>
                            <td style={{ padding: '5px' }}>{order.bookId}</td>
                            <td style={{ padding: '5px' }}>{order.bookName}</td>
                            <td style={{ padding: '5px' }}>{order.userId}</td>
                            <td style={{ padding: '5px' }}>{order.userName}</td>
                            <td style={{ padding: '5px' }}>
                              <div style={{ whiteSpace: 'nowrap' }}>{this.formatDate(order.issueDate)}</div>
                            </td>
                            {order.issueStatus === 'Accepted' ? (
                              <button type="button" disabled>Accepted</button>
                            ) : order.issueStatus === 'Rejected' ? (
                              <button type="button" disabled>Rejected</button>
                            ) : (
                              <div>
                                <button type="button" onClick={() => this.handleAcceptOrderClick(index)}>Accept</button>
                                <button type="button" onClick={() => this.handleRejectOrderClick(index)}>Reject</button>
                              </div>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
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
          <a href="#" class="fa fa-home" style={{ textDecoration: 'none', padding: '10px 12px', color: 'white' }}>
            Greenfield Ambition, Action Area IID, Newtown, Kolkata, West Bengal-700161
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

        <div class="footer">Developed By:</div>
      </div>
    );
  }
}

