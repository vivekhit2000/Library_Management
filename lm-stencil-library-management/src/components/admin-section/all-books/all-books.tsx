import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'all-books',
    styleUrl: 'all-books.css',
})
export class AllBooks {
    @Prop() adminName: string;

    // Create a property to hold the book data
    books: any[] = [];

    // Load book data from the API when the component is initialized
    async componentWillLoad() {
        console.log('Component is initializing');
        try {
            const response = await fetch('https://localhost:7239/api/Books');

            if (response.ok) {
                const data = await response.json();
                this.books = data;
                console.log('Data fetched successfully:', this.books);
            } else {
                console.error('Failed to fetch data from the API. Response status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
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
                            <a href="/add-books">
                                <li class="fa fa-user">Add Book</li>
                            </a>
                            <a href="/book-search">
                                <li class="fa fa-user">Search Book</li>
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
                            <h1 style={{ textAlign: 'center', color: 'black' }}>BOOKS DETAILS</h1>
                            <div id="student-scroll">
                                {this.books.length > 0 ? (
                                    <div id="student">
                                        {this.books.map((book) => (
                                            <div key={book.bookId}>
                                                Book ID: {book.bookId} <br />
                                                Title: {book.title} <br />
                                                Author Name: {book.authorName} <br />
                                                Price: {book.price} <br />
                                                Quantity: {book.quantity} <br />
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                    ) : (
                        <div>No books Found</div>
                    )}
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
