# google-facebook-signin-react
[![npm version](https://badge.fury.io/js/google-facebook-signin-react.svg)](https://badge.fury.io/js/google-facebook-signin-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

#

> Social Single SignOn React.JS: (Google &amp; Facebook) (Needed additional other social platform)

#

![Image](https://d3l69s690g8302.cloudfront.net/wp-content/uploads/2016/09/26191011/SCJZO.png)

#

## Install

```
npm install --save google-facebook-signin-react
```


#### [Link Web: https://socialsso.netlify.com](https://socialsso.netlify.com)

#### [Link Demo](https://codesandbox.io/s/google-facebook-signin-sso-reactjs-fum4f)

#### [NPM](https://www.npmjs.com/package/google-facebook-signin-react)
#### [Github](https://github.com/CuongStf/google-facebook-signin-react)


## Contribute
Create pull request. Thanks ( needed additional github, instagram, twitter)

## Usage

```tsx
import React, { Component } from "react";

import { FacebookSignIn, GoogleSignIn } from "sso-login-react";

export default class App extends Component {
  success(res) {
    return new Promise((resolve, reject) => {
      console.log(res);
      resolve();
    });
  }

  error(err) {
    console.log(err);
  }

  render() {
    return (
      <div>
        <FacebookSignIn
          appId={"YOUR_APP_ID"}
          onReject={this.error}
          onResolve={this.success}
        >
          Facebook
        </FacebookSignIn>
        <GoogleSignIn
          client_id={
            "YOUR_CLIENT_ID"
          }
          onReject={this.error}
          onResolve={this.success}
        >
          Google
        </GoogleSignIn>
      </div>
    );
  }
}
```

## Props

#
> ### Google Button
> [More detail: Google Developer](https://developers.google.com)
>
#
| Prop                  | Type                                | Default | Description |
| :---------            | :-------:                           | :-----: | :----------- |
| onResolve             | `promise function (required)`                     | `-`       | Response when logged |
| onReject             | `function (required)`                     | `-`       | Return rrror |
| client_id    | `string (require)`      | `-`       | id application |
| className             | `string (optional)`                     | `-`       | class for button |
| cookie_policy           | `string (optional)`                            | `single_host_origin`    |  |
| scope             | `string (optional)`                     | `email profile`       |  |
| fetch_basic_profile             | `boolean (optional)`                     | `true`       | get profile information |
| hosted_domain             | `string (optional)`                     |`-`       |  |
| openid_realm             | `string (optional)`                     | `-`       |  |
| ux_mode    | `string (optional)`      | `popup`       | Text display when start touch |
| redirect_uri           | `string (optional)`                            | `/`    | only mobile |
| prompt             | `string (optional)`                     | `select_account`       | "consent", "select_account", "none" |
| response_type             | `string (optional)`                     | `permission`       | "id_token", "permission", "code" |
| login_hint             | `string (optional)`                     | `true`       | |
| discoveryDocs             | `string (optional)`                     | `https://www.googleapis.com/discovery/v1/apis/drive/v3/rest`       | request permision |
| access_type             | `string (optional)`                     | `online`       | "online , "offline|
| isDisabled             | `boolean (optional)`                     | `true`       | |

#
> ### Facebook Button
> [More detail: Facebook Developer](https://developers.facebook.com)
#
| Prop                  | Type                                | Default | Description |
| :---------            | :-------:                           | :-----: | :----------- |
| onResolve             | `promise function (required)`                     | `-`       | Response when logged |
| onReject             | `function (required)`                     | `-`       | Return rrror |
| appId    | `string (require)`      | `-`       | id application |
| className             | `string (optional)`                     | `-`       | class for button |
| scope             | `string (optional)`                     | `"email, public_profile"`       | separate by comma symbol |
| redirect_uri           | `string (optional)`                            | `/`    | only mobile |
| state           | `string (optional)`                            | `facebookdirect`    |  |
| response_type             | `string (optional)`                     | `code`       |  |
| auth_type             | `string (optional)`                     | `-`       |  |
| return_scopes             | `boolean (optional)`                     | `true`       | return list scope in response |
| enable_profile_selector             | `boolean (optional)`                     | `true`       |  |
| profile_selector_id    | `boolean (optional)`      | `true`       |  |
| language             | `string (optional)`                     | `vi_VN`       |  |
| isDisabled             | `boolean (optional)`                     | `true`       | |
| fieldsProfile             | `string (optional)`                     | `name, email, birthday`       | info field profile in response |
| xfbml             | `boolean (optional)`                     | `true`        | enabled embedded iframe xml facebook |
| version             | `string (optional)`                     | `v5.0`        |  |
| cookie             | `boolean (optional)`                     | `true`        | enabled cookie send facebook |



## License
MIT © [CuongStf](https://github.com/CuongStf)
