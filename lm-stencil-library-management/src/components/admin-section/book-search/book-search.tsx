import { Component, State, h } from '@stencil/core';

@Component({
    tag: 'book-search',
    styleUrl: 'book-search.css',
    scoped: true,
})
export class BookSearch {
    @State() bookData: any[] = [];
    @State() searchTitle: string = '';
    @State() isEditingBookFields: boolean = false;

    async searchBooks() {
        try {
            console.log('Making API request...');
            const response = await fetch(`https://localhost:7239/api/Books/byName?bookName=${this.searchTitle}`);
            console.log('API request completed.');

            if (response.ok) {
                console.log('Response is OK.');
                const data = await response.json();
                console.log('API Response Data:', data);
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

    toggleEditBookFields() {
        this.isEditingBookFields = !this.isEditingBookFields;
    }

    async updateBook(book: any) {
        try {
            const response = await fetch(`https://localhost:7239/api/Books/${book.bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set the appropriate content type
                },
                body: JSON.stringify(book), // Convert the book data to JSON
            });
    
            if (response.ok) {
                console.log('Book updated successfully');
                // Optionally, you can update the local bookData state here
    
                // Display an alert
                window.alert('Book updated Successfully');
                
                // Reload the page after closing the alert
                window.location.reload();
            } else {
                // Handle error
                console.error('Failed to update book');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
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
                            <a href="/return-request">
                                <li class="fa fa-user">Return Request</li>
                            </a>
                            <a href="/add-books">
                                <li class="fa fa-user">Add Books</li>
                            </a>
                            <a href="#">
                                <li class="fa fa-user">View Order</li>
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
                                                    {this.isEditingBookFields ? (
                                                        <button onClick={() => this.updateBook(book)}>Update</button>
                                                    ) : null}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>

                            <a class="custom-button" onClick={() => this.toggleEditBookFields()}>Edit Book</a>
                            <a href="/all-books" class="custom-button">View All Books</a>
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
