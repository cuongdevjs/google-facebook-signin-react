import * as React from 'react'
import { objectType } from "./types";
import * as PropTypes from "prop-types";

class FacebookSSO extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSdkLoaded: false,
      isProgressing: false
    };
    this.loginFB = this.loginFB.bind(this);
    this.getMe = this.getMe.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  private SDK_URL: string = "https://connect.facebook.net/vi_VI/sdk.js";
  private SCRIPT_ID: string = "facebook-jssdk";
  static propTypes = {
    scope: PropTypes.string,
    redirect_uri: PropTypes.string,
    state: PropTypes.string,
    response_type: PropTypes.string,
    auth_type: PropTypes.string,
    return_scopes: PropTypes.bool,
    enable_profile_selector: PropTypes.bool,
    profile_selector_id: PropTypes.bool,
    language: PropTypes.string,
    appId: PropTypes.string,
    isDisabled: PropTypes.bool,
    fieldsProfile: PropTypes.string,
    xfbml: PropTypes.bool,
    version: PropTypes.string,
    cookie: PropTypes.bool,
    onResolve: PropTypes.func,
    onReject: PropTypes.func,
    className: PropTypes.string
  };
  static defaultProps = {
    scope: "email, public_profile",
    redirect_uri: typeof window !== "undefined" ? window.location.href : "/",
    state: "facebookdirect",
    response_type: "code",
    auth_type: "",
    return_scopes: true,
    enable_profile_selector: true,
    profile_selector_id: true,
    language: "vi_VN",
    fieldsProfile: "name, email, birthday",
    appId: process.env.REACT_APP_FACEBOOK_APP_KEY,
    xfbml: true,
    version: "v5.0",
    cookie: true,
    isDisabled: false,
    className: ""
  };

  componentDidMount(): void {
    if (this.checkIsExistsSDKScript()) {
      this.setState({
        isSdkLoaded: true
      });
      return;
    } else {
      this.insertSDKScript(document);
      this.initFbSDK(
        {
          appId: this.props.appId,
          xfbml: this.props.xfbml,
          version: this.props.version,
          cookie: this.props.cookie
        },
        document
      );
    }
  }

  insertSDKScript(document: HTMLDocument) {
    const fbScriptTag = document.createElement("script");
    fbScriptTag.id = this.SCRIPT_ID;
    fbScriptTag.src = this.SDK_URL;
    const scriptNode = document.getElementsByTagName("script")![0];
    scriptNode &&
      scriptNode.parentNode &&
      scriptNode.parentNode.insertBefore(fbScriptTag, scriptNode);
  }

  checkIsExistsSDKScript() {
    return !!document.getElementById(this.SCRIPT_ID);
  }

  initFbSDK(config: objectType, document: HTMLDocument) {
    const _window = window as any;
    const _this = this;
    _window.fbAsyncInit = function () {
      _window.FB.init({ ...config });
      _this.setState({
        isSdkLoaded: true
      });
      let fbRoot = document.getElementById("fb-root");
      if (!fbRoot) {
        fbRoot = document.createElement("div");
        fbRoot.id = "fb-root";
        document.body.appendChild(fbRoot);
      }
    };
  }

  getMe(authResponse: objectType) {
    (window as any).FB.api(
      "/me",
      { locale: this.props.language, fields: this.props.fieldsProfile },
      (me: any) => {
        this.props
          .onResolve({
            provider: "facebook",
            data: { ...authResponse, ...me }
          })
          .then(() => {
            this.setState({
              isProgressing: false
            });
          });
      }
    );
  }

  handleResponse(response: objectType) {
    if (response.authResponse) {
      console.log("login success: ", response);
      this.getMe(response.authResponse);
    } else {
      this.setState({
        isProgressing: false
      });
      this.props.onReject(response);
      console.log("login failure: ", response);
    }
  }

  loginFB() {
    if (this.state.isProgressing || !this.state.isSdkLoaded) return;
    this.setState({
      isProgressing: true
    });
    const _window = window as any;
    // only case mobile (redirect to fb)
    // window.location.href = `https://www.facebook.com/dialog/oauth${getParamsFromObject(params)}`;
    if (!_window.FB) {
      console.log("Fb API not loaded!");
      this.setState({
        isProgressing: false
      });
      this.props.onReject("Fb isn't loaded!");
    } else {
      _window.FB.login(this.handleResponse, {
        scope: this.props.scope,
        return_scopes: this.props.return_scopes,
        auth_type: this.props.auth_type
      });
    }
  }

  render() {
    return (
      <button
        disabled={this.props.isDisabled || this.state.isProgressing}
        onClick={this.loginFB}
        className={[this.props.className, "loginBtn loginBtn--facebook"].join(" ")}>
        {this.props.children}
      </button>
    );
  }
}

export default FacebookSSO;
