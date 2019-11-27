import * as React from 'react'
import * as PropTypes from "prop-types";
import { objectType } from "./types";

class GoogleSSO extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSdkLoaded: false,
      isProgressing: false
    };
    this.loginGoogle = this.loginGoogle.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  private JS_SRC = "https://apis.google.com/js/api.js";
  private SCRIPT_ID = "google-login";
  private SCOPE = "https://www.googleapis.com/auth/drive.file";
  private _window = window as any;

  static propTypes = {
    client_id: PropTypes.string,
    cookie_policy: PropTypes.oneOf(["", "single_host_origin"]),
    scope: PropTypes.string,
    fetch_basic_profile: PropTypes.bool,
    hosted_domain: PropTypes.string,
    openid_realm: PropTypes.string,
    ux_mode: PropTypes.string,
    redirect_uri: PropTypes.string,
    prompt: PropTypes.oneOf(["consent", "select_account", "none", ""]),
    response_type: PropTypes.oneOf(["id_token", "permission", "code", ""]),
    login_hint: PropTypes.string,
    discoveryDocs: PropTypes.string,
    access_type: PropTypes.string,
    onResolve: PropTypes.func,
    onReject: PropTypes.func,
    isDisabled: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    client_id: process.env.REACT_APP_GOOGLE_LOGIN_KEY,
    cookie_policy: "single_host_origin",
    scope: "email profile",
    fetch_basic_profile: true,
    ux_mode: "popup",
    prompt: "select_account",
    response_type: "permission",
    login_hint: "",
    discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    access_type: "online",
    isDisabled: false
  };

  componentDidMount(): void {
    if (this.checkIsExistsSDKScript()) {
      this.setState({
        isSdkLoaded: true
      });
    } else {
      this.insertScriptGoogle(
        document,
        "script",
        this.SCRIPT_ID,
        this.JS_SRC,
        () => {
          const params = {
            client_id: this.props.client_id,
            cookie_policy: this.props.cookie_policy,
            login_hint: this.props.login_hint,
            hosted_domain: this.props.hosted_domain,
            fetch_basic_profile: this.props.fetch_basic_profile,
            discoveryDocs: this.props.discoveryDocs,
            ux_mode: this.props.ux_mode,
            redirect_uri: this.props.redirect_uri,
            access_type: this.props.access_type,
            scope: this.SCOPE,
            immediate: true
          };
          this._window.gapi.load("auth2", () => {
            const gapiAuth = this._window.gapi.auth2;
            if (!gapiAuth.getAuthInstance()) {
              gapiAuth.init(params).then(() => {
                this.setState({
                  isSdkLoaded: true
                });
              });
            } else {
              console.log("not exist an instance: ", gapiAuth);
            }
          });
        }
      );
    }
  }

  checkIsExistsSDKScript() {
    return !!document.getElementById(this.SCRIPT_ID);
  }

  insertScriptGoogle(
    d: HTMLDocument,
    s: string = "script",
    id: string,
    jsSrc: string,
    cb: () => void
  ) {
    const ggScriptTag: any = d.createElement(s);
    ggScriptTag.id = id;
    ggScriptTag.src = jsSrc;
    ggScriptTag.async = true;
    ggScriptTag.defer = true;
    const scriptNode = document.getElementsByTagName("script")![0];
    scriptNode &&
      scriptNode.parentNode &&
      scriptNode.parentNode.insertBefore(ggScriptTag, scriptNode);
    ggScriptTag.onload = cb;
  }

  handleResponse(res: objectType | string) {
    // const auth2 = this._window.gapi.auth2.getAuthInstance();
    // var user = auth2.currentUser.get();
    // var auth = user.getAuthResponse();
    console.log("login success: ", res);
    this.props.onResolve({ provider: "google", data: res }).then(() => {
      this.setState({
        isProgressing: false
      });
    });
  }

  handleError(err: objectType | string) {
    console.log("login failed: ", err);
    this.setState({
      isProgressing: false
    });
    this.props.onReject(err);
  }

  loginGoogle() {
    if (!this.state.isSdkLoaded) return;
    this.setState({
      isProgressing: true
    });
    const auth2 = this._window.gapi.auth2.getAuthInstance();
    let options = {
      prompt: this.props.prompt,
      scope: this.props.scope,
      ux_mode: this.props.ux_mode
    };
    // responseType = code then =>
    // auth2.grantOfflineAccess(options).then((res: any) => {
    //   console.log(res);
    // });
    auth2
      .signIn(options)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    return (
      <button
        className={[this.props.className, "loginBtn loginBtn--google"].join(" ")}
        disabled={this.props.isDisabled || this.state.isProgressing}
        onClick={this.loginGoogle}>
        {this.props.children}
      </button>
    );
  }
}

export default GoogleSSO;
