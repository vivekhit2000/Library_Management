import { Component, State, h } from '@stencil/core';

@Component({
    tag: 'view-date-info',
    styleUrl: 'view-date-info.css',
})
export class ViewDateInfo {
    @State() pendingOrders: any[] = [];
  
    async fetchPendingOrders() {
        try {
            // Retrieve the user from local storage
            const storedUser = localStorage.getItem('loginUser');
    
            if (!storedUser) {
                console.error('User not found in local storage');
                return;
            }
    
            const user = JSON.parse(storedUser);
            const userId = user.userId;
            const apiUrl = `https://localhost:7239/api/PlaceOrders/ByUser/${userId}`;
    
            // Fetch data using the constructed URL
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                this.pendingOrders = data.map(order => ({
                    ...order,
                    // Format issueDate and returnDate to display date only (YYYY-MM-DD)
                    issueDate: new Date(order.issueDate).toLocaleDateString(),
                    returnDate: new Date(order.returnDate).toLocaleDateString(),
                }));
            } else {
                console.error('Failed to fetch pending orders.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    componentWillLoad() {
        // Fetch pending orders using the retrieved user from local storage
        this.fetchPendingOrders();
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
                            <a href="/user-homepage">
                                <li class="fa fa-home">Home</li>
                            </a>
                            <a href="/user-book-search">
                                <li class="fa fa-user">Book Search</li>
                            </a>
                            <a href="/place-order">
                                <li class="fa fa-user">Place Order</li>
                            </a>
                            <a href="/book-return">
                                <li class="fa fa-user">Return Book</li>
                            </a>
                            <a href="/">
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
                            <h1 style={{ textAlign: 'center', color: 'black' }}>Book Request</h1>
                            <div id="student">
                                <table>
                        <thead>
                            <tr class="table-header">
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Issue Date</th>
                                <th>Return Date</th>
                                <th>Issue Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.pendingOrders.map(order => (
                                <tr>
                                    <td style={{ padding: '5px' }}>{order.bookId}</td>
                                    <td style={{ padding: '5px' }}>{order.bookName}</td>
                                    <td style={{ padding: '5px' }}>{order.issueDate}</td>
                                    <td style={{ padding: '5px' }}>{order.returnDate}</td>
                                    <td style={{ padding: '10px' }}>{order.issueStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                                   
                                    
                                        
                                </table>


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
                <div class="footer">Developed By : { }</div>
            </div>
        );
    }
}
