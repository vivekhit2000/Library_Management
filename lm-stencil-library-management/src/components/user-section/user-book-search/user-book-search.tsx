
import { Component, State, h } from '@stencil/core';

@Component({
    tag: 'user-book-search',
    styleUrl: 'user-book-search.css',
    scoped: true,
})
export class UserBookSearch {
    @State() bookData: any[] = [];
    @State() searchTitle: string = '';
    @State() isEditingBookFields: boolean = false;

    async searchBooks() {
        try {
            const response = await fetch(`https://localhost:7239/api/Books/byName?bookName=${this.searchTitle}`);

            if (response.ok) {
                const data = await response.json();
                this.bookData = data;
            } else {
                // Handle error
                console.error('Failed to fetch books by title');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    }

    async prepareOrder(book) {
        // Prepare the order data with bookId and bookName
        const orderData = {
            bookId: book.bookId,
            bookName: book.title,
        };

        // Store the order data in local storage for retrieval on the place-order page
        localStorage.setItem('orderData', JSON.stringify(orderData));

        // Redirect to the place-order page
        window.location.href = '/place-order';
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
                            <a href="/view-date-info">
                                <li class="fa fa-user">Book Request</li>
                            </a>
                            <a href="/book-return">
                                <li class="fa fa-user">Return Book</li>
                            </a>
                            <a href="/place-order">
                                <li class="fa fa-user">Place Order</li>
                            </a>
                            <a href="/">
                                <li class="fa fa-user">Logout</li>
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
                            <h1 style={{ textAlign: 'center', color: 'black' }}>BOOK SEARCH</h1>
                            <div id="student">
                                Book Name <br />
                                <input
                                    type="text"
                                    placeholder="Enter book title"
                                    value={this.searchTitle}
                                    onInput={(event: Event) => (this.searchTitle = (event.target as HTMLInputElement).value)}
                                />
                                <button onClick={() => this.searchBooks()}>Search</button>
                                <br />
                            </div>
                        </div>
                        <div id="m">
                            <h1 style={{ textAlign: 'center', color: 'black' }}>Search Result</h1>

                            <div id="student" >
                                {this.bookData.length > 0 ? (
                                    <ul>
                                        {this.bookData.map((book) => (
                                            <li>
                                                <div>
                                                    <p>
                                                        Book ID:{" "}
                                                        {this.isEditingBookFields ? (
                                                            <input
                                                                type="text"
                                                                value={book.bookId || ""}
                                                                onInput={(event: Event) => {
                                                                    book.bookId = (event.target as HTMLInputElement).value;
                                                                }}
                                                            />
                                                        ) : (
                                                            book.bookId || "N/A"
                                                        )}
                                                    </p>
                                                    <p>
                                                        Title:{" "}
                                                        {this.isEditingBookFields ? (
                                                            <input
                                                                type="text"
                                                                value={book.title || ""}
                                                                onInput={(event: Event) => {
                                                                    book.title = (event.target as HTMLInputElement).value;
                                                                }}
                                                            />
                                                        ) : (
                                                            book.title || "N/A"
                                                        )}
                                                    </p>
                                                    <p>
                                                        Author:{" "}
                                                        {this.isEditingBookFields ? (
                                                            <input
                                                                type="text"
                                                                value={book.authorName || ""}
                                                                onInput={(event: Event) => {
                                                                    book.authorName = (event.target as HTMLInputElement).value;
                                                                }}
                                                            />
                                                        ) : (
                                                            book.authorName || "N/A"
                                                        )}
                                                    </p>
                                                    <button onClick={() => this.prepareOrder(book)}>Order</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>


                            <a href="#" class="custom-button">View All Books</a>
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
                        Greenfield Ambition, Action Area IID, Newtown, Kolkata, West Bengal-700161
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
                <div class="footer">Developed By</div>

            </div>
        );
    }
}