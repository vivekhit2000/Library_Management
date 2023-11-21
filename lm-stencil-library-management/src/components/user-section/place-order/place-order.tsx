import { Component, State, h } from '@stencil/core';

@Component({
    tag: 'place-order',
    styleUrl: 'place-order.css',
})
export class PlaceOrder {
    @State() orderData = {
        bookId: '',
        bookName: '',
        userName: '',
    };
    returnSuccessful: boolean;
    loginUser: any; // Define loginUser object

    async componentWillLoad() {
        // Retrieve the pre-filled order data from local storage
        const orderDataJSON = localStorage.getItem('orderData');
        if (orderDataJSON) {
            const orderData = JSON.parse(orderDataJSON);

            // Set the pre-filled bookId and bookName in the component's state or fields
            this.orderData.bookId = orderData.bookId;
            this.orderData.bookName = orderData.bookName;
        }
        const loginUserJSON = localStorage.getItem('loginUser');
        if (loginUserJSON) {
            this.loginUser = JSON.parse(loginUserJSON);
            this.orderData.userName = this.loginUser.userName;
        }
    }


    handleLogout() {
        // Remove the logged-in user's data from local storage
        localStorage.removeItem('loginUser');

        // Redirect to the login page (you may adjust the URL accordingly)
        window.location.href = '/'; // Change to the appropriate URL
    }

    handleInputChange(event, field) {
        const value = event.target.value;

        // Use the spread operator to create a copy of the current orderData state
        const updatedOrderData = { ...this.orderData };

        // Update the specific field in the copied state
        updatedOrderData[field] = value;

        // Set the updated state
        this.orderData = updatedOrderData;
    }

    async handlePlaceOrderClick() {
        if (!this.loginUser) {
            // Handle the case where loginUser data is missing from local storage
            alert('Login user data is missing. Please log in again.');
            window.location.href = '/'; // Redirect to the login page
            return;
        }

        // Calculate the expiry date (10 days from the issue date)
        const issueDate = new Date();
        const returnDate = new Date(issueDate);
        returnDate.setDate(returnDate.getDate() + 10);

        // Format the issueDate and returnDate in ISO 8601 format (YYYY-MM-DD)
        const formattedIssueDate = issueDate.toISOString().substring(0, 10);
        const formattedReturnDate = returnDate.toISOString().substring(0, 10);

        // Create a new PlaceOrder object using the user input and loginUser data
        const placeOrderData = {
            bookId: this.orderData.bookId,
            bookName: this.orderData.bookName,
            userName: this.orderData.userName,
            userId: this.loginUser.userId, // Use the userId from loginUser
            phoneNo: this.loginUser.phone.toString(), // Use the phoneNo from loginUser
            issueDate: formattedIssueDate, // Current date as the issue date
            issueStatus: 'pending', // Default issue status
            returnDate: formattedReturnDate, // Format the date in ISO 8601 format
            returnStatus: '', // You can set the return status as needed
        };

        // Send the placeOrderData to your backend API
        try {
            const response = await fetch('https://localhost:7239/api/PlaceOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(placeOrderData),
            });

            if (response.ok) {
                // Order placed successfully
                alert('Order placed successfully!');
                window.location.href = '/user-homepage'; // Redirect to the user homepage
            } else {
                // Log the status and response text for debugging
                console.error('Failed to place the order. Status:', response.status);
                const responseText = await response.text();
                console.error('Response:', responseText);
                alert('Failed to place the order. See console for details.');
            }
        } catch (error) {
            console.error('Error placing the order:', error);
            alert('An error occurred while placing the order.');
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
                            <a href="/user-homepage">
                                <li class="fa fa-home">Home</li>
                            </a>
                            <a href="/user-book-search">
                                <li class="fa fa-user">Book Search</li>
                            </a>
                            <a href="/view-date-info">
                                <li class="fa fa-user">Book Request</li>
                            </a>
                            <a href="/book-return">
                                <li class="fa fa-user">Return Order</li>
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
                            <h1 style={{ textAlign: 'center', color: 'black' }}>PLACE ORDER</h1>
                            <div id="student">
                                <div>
                                    Book ID:
                                    <input
                                        type="text"
                                        value={this.orderData.bookId}
                                        onInput={(e) => this.handleInputChange(e, 'bookId')}
                                    />
                                </div>
                                <div>
                                    Book Name:
                                    <input
                                        type="text"
                                        value={this.orderData.bookName}
                                        onInput={(e) => this.handleInputChange(e, 'bookName')}
                                    />
                                </div>

                                <div>
                                    User Name:
                                    <input
                                        type="text"
                                        value={this.orderData.userName}
                                        onInput={(e) => this.handleInputChange(e, 'userName')}
                                    />
                                </div>

                                <div>
                                    <button onClick={() => this.handlePlaceOrderClick()}>Place Order</button>
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
                <div class="footer">Developed By : { }</div>
            </div>
        );
    }
}

