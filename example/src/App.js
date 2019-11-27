import React, { Component } from "react";

import { FacebookSignIn, GoogleSignIn } from "google-facebook-signin-react";

export default class App extends Component {
  success(res) {
    console.log(res);
  }

  error(err) {
    console.log(err);
  }

  render() {
    return (
      <div>
        <FacebookSignIn onReject={this.error} onResolve={this.success}>
          Facebook
        </FacebookSignIn>
        <GoogleSignIn onReject={this.error} onResolve={this.success}>
          Google
        </GoogleSignIn>
      </div>
    );
  }
}
