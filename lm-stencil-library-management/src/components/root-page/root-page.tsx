import { Component, h } from '@stencil/core';
import { Route, createRouter } from 'stencil-router-v2';
const Router = createRouter();


@Component({
  tag: 'root-page',
})
export class AppRoot {
  render() {
    return (
      <Router.Switch>
        <Route path="/">
          <home-page></home-page>
        </Route>
        <Route path="/admin-login">
          <admin-login></admin-login>
        </Route>
        <Route path="/user-login">
          <user-login></user-login>
        </Route>
        <Route path="/admin-registration">
          <admin-registration></admin-registration>
        </Route>
        <Route path="/user-registration">
          <user-registration></user-registration>
        </Route>
        <Route path="/user-homepage">
          <user-homepage></user-homepage>
        </Route>
        <Route path="/admin-homepage">
          <admin-homepage></admin-homepage>
        </Route>
        <Route path="/add-books">
          <add-books></add-books>
        </Route>
        <Route path="/book-search">
          <book-search></book-search>
        </Route>
        <Route path="/all-books">
          <all-books></all-books>
        </Route>
        <Route path="/user-book-search">
          <user-book-search></user-book-search>
        </Route>
        <Route path="/place-order">
          <place-order></place-order>
        </Route>
        <Route path="/view-date-info">
          <view-date-info></view-date-info>
        </Route>
        <Route path="/book-return">
          <book-return></book-return>
        </Route>
        <Route path="/view-orders">
          <view-orders></view-orders>
        </Route>
        <Route path="/return-request">
          <return-request></return-request>
        </Route>
      </Router.Switch>
    );
  }
}
