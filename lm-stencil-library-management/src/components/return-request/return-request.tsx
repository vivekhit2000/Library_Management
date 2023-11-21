import { Component, h, State } from '@stencil/core';

interface PlaceOrder {
    orderId: number;
    userId: number;
    userName: string;
    bookId: number;
    bookName: string;
    issueDate: string;
    returnDate: string;
}
// Define a CSS class for the common button style
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    background: '#2c7ad6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const centerButtonStyle = {
    textAlign: 'center',
};


@Component({
    tag: 'return-request',
    styleUrl: 'return-request.css',
})
export class ReturnRequest {
    @State() returnRequests: PlaceOrder[] = [];
    // Add a state to keep track of the selected order
    @State() selectedOrderId: number | null = null;

    async componentWillLoad() {
        try {
            
            const apiUrl = 'https://localhost:7239/api/PlaceOrders/ReturnRequestedOrders';
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data: PlaceOrder[] = await response.json();
                this.returnRequests = data;
            } else {
                console.error(`Failed to fetch return requested orders: ${response.statusText}`);
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    }

    // Helper function to format a date string (removing time)
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    }

    // Function to handle the selection of an order
    handleOrderSelection(orderId: number) {
        this.selectedOrderId = orderId;
    }

    // Function to handle the approval of the selected order
    handleRequestApproval() {
        if (this.selectedOrderId !== null) {
            // Send an API request to approve the order
            fetch(`https://localhost:7239/api/PlaceOrders/return-approve/${this.selectedOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.ok) {
                    alert(`Order ${this.selectedOrderId} Request is Approved.`);
                } else {
                    console.error(`Failed to approve order: ${response.statusText}`);
                }
            })
            .catch((error) => {
                console.error('An error occurred while making the request:', error);
            });
        } else {
            alert('No order selected for approval.');
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
                            <a href="/admin-homepage">
                                <li class="fa fa-home">Home</li>
                            </a>
                            <a href="/book-search">
                                <li class="fa fa-user">Book Search</li>
                            </a>
                            <a href="/add-boks">
                                <li class="fa fa-user">Add Books</li>
                            </a>
                            <a href="/view-orders">
                                <li class="fa fa-user">View Orders</li>
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
                            <h1 style={{ textAlign: 'center', color: 'black' }}>Return Request</h1>
                            <div id="student">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: '5px' }}>User ID</th>
                                            <th style={{ padding: '5px' }}>User Name</th>
                                            <th style={{ padding: '5px' }}>Book ID</th>
                                            <th style={{ padding: '5px' }}>Book Name</th>
                                            <th style={{ padding: '5px' }}>Issue Date</th>
                                            <th style={{ padding: '5px' }}>Return Date</th>
                                            <th style={{ padding: '5px' }}>Select</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.returnRequests.map((request, index) => (
                                            <tr key={index}>
                                                <td style={{ padding: '5px' }}>{request.userId}</td>
                                                <td style={{ padding: '5px' }}>{request.userName}</td>
                                                <td style={{ padding: '5px' }}>{request.bookId}</td>
                                                <td style={{ padding: '5px' }}>{request.bookName}</td>
                                                <td style={{ padding: '5px' }}>{this.formatDate(request.issueDate)}</td>
                                                <td style={{ padding: '5px' }}>{this.formatDate(request.returnDate)}</td>
                                                <td style={{ padding: '5px' }}>
                                                    <input
                                                        type="radio"
                                                        name="selectedOrder"
                                                        onClick={() => this.handleOrderSelection(request.orderId)}
                                                        checked={this.selectedOrderId === request.orderId}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={centerButtonStyle}>
                                    <button class="center-button" style={buttonStyle} onClick={() => this.handleRequestApproval()}>Request Approve</button>
                                </div>
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
