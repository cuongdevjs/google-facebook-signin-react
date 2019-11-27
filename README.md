# google-facebook-signin-react

> Google &amp; Facebook SignIn Button React.js

[![NPM](https://img.shields.io/npm/v/google-facebook-signin-react.svg)](https://www.npmjs.com/package/google-facebook-signin-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save google-facebook-signin-react
```

## Usage

```tsx
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

```

## License

MIT © [CuongStf](https://github.com/CuongStf)
