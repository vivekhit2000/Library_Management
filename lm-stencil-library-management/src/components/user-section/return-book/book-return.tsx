import { Component, State, h } from '@stencil/core';

interface AcceptedOrder {
    orderId: number;
    userId: number;
    userName: string;
    bookName: string;
    bookId: number;
    issueDate: string;
    // Add any other properties if necessary
}

@Component({
    tag: 'book-return',
    styleUrl: 'book-return.css',
})
export class BookReturn {
    @State() acceptedOrders: AcceptedOrder[] = [];

    async componentDidLoad() {
        try {
            const storedUser = localStorage.getItem('loginUser');

            if (!storedUser) {
                console.error('User not found in local storage');
                return;
            }

            const user = JSON.parse(storedUser);
            const userId = user.userId;

            const apiUrl = `https://localhost:7239/api/PlaceOrders/AcceptedOrdersByUser/${userId}`;
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data = await response.json();
                this.acceptedOrders = data;
                console.log('Accepted Orders Data:', data);
            } else {
                console.error(`Failed to fetch data: ${response.statusText}`);
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    }

    formatDate(dateString: string) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    }

    // Inside your showCustomDialog method
    showCustomDialog(title: string, message: string, buttons: { label: string; action: () => void }[]) {
        const modal = document.createElement("div");
        modal.className = "custom-dialog";

        modal.innerHTML = `
        <div class="dialog-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="buttons">
                ${buttons.map((button, index) => `
                    <button id="button-${index}">${button.label}</button>
                `).join("")}
            </div>
        </div>
    `;

        document.body.appendChild(modal);

        // Add event listeners for button clicks
        buttons.forEach((button, index) => {
            const buttonElement = modal.querySelector(`#button-${index}`);
            buttonElement?.addEventListener('click', () => {
                document.querySelector('.custom-dialog').remove();
                button.action(); // Call the action associated with the button
            });
        });
    }


    handleReturn = () => {
        console.log('Inside handleReturn'); // Check if the function is triggered
        const today = new Date();
        let totalFine = 0;
        let checkedOrderId: number | null = null;
        let anyRadioChecked = false;

        this.acceptedOrders.forEach((order) => {
            const radio = document.getElementById(`radio-${order.orderId}`) as HTMLInputElement;
            if (radio.checked) {
                checkedOrderId = order.orderId;
                anyRadioChecked = true;
            }
        });

        if (!anyRadioChecked) {
            console.log("No order selected."); // Check if no order is selected
            return;
        }

        this.acceptedOrders.forEach((order) => {
            const radio = document.getElementById(`radio-${order.orderId}`) as HTMLInputElement;
            if (radio.checked) {
                const issueDate = new Date(order.issueDate);
                const expiryDate = new Date(issueDate);
                expiryDate.setDate(expiryDate.getDate() + 15);

                if (today > expiryDate) {
                    const daysLate = Math.floor((today.getTime() - expiryDate.getTime()) / (1000 * 60 * 60 * 24));
                    const fine = daysLate * 10;
                    totalFine += fine;
                }
            }
        });

        if (totalFine > 0) {
            console.log(`Total Fine: $${totalFine}`);
            this.showCustomDialog("Total Fine", `Total Fine: $${totalFine}`, [
                {
                    label: "Move to Payment",
                    action: () => {
                        // Handle the action when the "Move to Payment" button is clicked.
                        // You can navigate to the payment page or perform any other action here.
                    },
                },
                {
                    label: "Cancel",
                    action: () => { },
                },
            ]);
        } else {

            this.showCustomDialog("No Fine", "No fines to be paid.", [
                {
                    label: "Return Request",
                    action: () => {
                        this.sendReturnRequest(checkedOrderId);
                    },
                },
                {
                    label: "Cancel",
                    action: () => { },
                },
            ]);
        }
    };

    sendReturnRequest(checkedOrderId: number | null) {
        if (checkedOrderId) {
            console.log('Inside sendReturnRequest'); // Check if the function is triggered
            try {
                fetch(`https://localhost:7239/api/PlaceOrders/return-request/${checkedOrderId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("Return Requested for the selected book.");
                            alert("Return Requested for the selected book.");
                        } else {
                            console.error(`Failed to request return: ${response.statusText}`);
                            alert(`Failed to request return: ${response.statusText}`);
                        }
                    })
                    .catch((error) => {
                        console.error("An error occurred while making the request:", error);
                        alert("An error occurred while making the request.");
                    });
            } catch (error) {
                console.error("An error occurred while making the request:", error);
                alert("An error occurred while making the request.");
            }
        } else {
            console.error("No selected order found.");
            alert("No selected order found.");
        }
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
                            <a href="/user-homepage">
                                <li class="fa fa-home">Home</li>
                            </a>
                            <a href="/user-book-search">
                                <li class="fa fa-user">Book Search</li>
                            </a>
                            <a href="/view-date-info">
                                <li class="fa fa-user">Book Request</li>
                            </a>
                            <a href="/place-order">
                                <li class="fa fa-user">Place Order</li>
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
                            <h1 style={{ textAlign: 'center', color: 'black' }}>Return Book</h1>
                            <div id="student">

                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: '5px' }}>Order ID</th>
                                            <th style={{ padding: '5px' }}>Book ID</th>
                                            <th style={{ padding: '5px' }}>Book Name</th>
                                            <th style={{ padding: '5px' }}>User ID</th>
                                            <th style={{ padding: '5px' }}>User Name</th>
                                            <th style={{ padding: '5px' }}>Issue Date</th>
                                            <th style={{ padding: '5px' }}>Return</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.acceptedOrders.map((order) => (
                                            <tr key={order.orderId}>
                                                <td style={{ padding: '5px' }}>{order.orderId}</td>
                                                <td style={{ padding: '5px' }}>{order.bookId}</td>
                                                <td style={{ padding: '5px' }}>{order.bookName}</td>
                                                <td style={{ padding: '5px' }}>{order.userId}</td>
                                                <td style={{ padding: '5px' }}>{order.userName}</td>
                                                <td style={{ padding: '5px' }}>{this.formatDate(order.issueDate)}</td>
                                                <td style={{ padding: '5px' }}>
                                                    <input type="radio" name="selectedOrder" id={`radio-${order.orderId}`} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <button class="center-button" onClick={this.handleReturn}>Return</button>
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
