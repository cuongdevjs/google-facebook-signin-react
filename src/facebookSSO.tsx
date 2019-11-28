import * as React from 'react'
import { objectType } from "./types";

interface IProps {
  appId: string,
  onResolve: Function,
  onReject: Function,
  scope?: string,
  redirect_uri?: string,
  state?: string,
  auth_type?: string,
  response_type?: string,
  return_scopes?: boolean,
  enable_profile_selector?: boolean,
  profile_selector_id?: boolean,
  language?: string,
  isDisabled?: boolean,
  fieldsProfile?: string,
  xfbml?: boolean,
  version?: string,
  cookie?: boolean,
  className?: string,
  chidren?: any
}

interface IStates {
  isSdkLoaded: boolean,
  isProgressing: boolean
}

class FacebookSSO extends React.PureComponent<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSdkLoaded: false,
      isProgressing: false
    };
    this.loginFB = this.loginFB.bind(this);
    this.getMe = this.getMe.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.initFbSDK = this.initFbSDK.bind(this);
  }

  private SDK_URL: string = "https://connect.facebook.net/vi_VI/sdk.js";
  private SCRIPT_ID: string = "facebook-jssdk";
  private _window = window as any;

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
    appId: "2086263614924092",
    xfbml: true,
    version: "v5.0",
    cookie: true,
    isDisabled: false,
    className: "",
    children: "Login Facebook"
  };

  componentDidMount(): void {
    if (this.checkIsExistsSDKScript()) {
      this.setState({
        isSdkLoaded: true
      });
      return;
    } else {
      this.insertSDKScript(document, () => {
        this.initFbSDK(
          {
            appId: this.props.appId,
            xfbml: this.props.xfbml,
            version: this.props.version,
            cookie: this.props.cookie
          },
          document
        );
      });
    }
  }

  insertSDKScript(document: HTMLDocument, cb: () => void) {
    const fbScriptTag = document.createElement("script");
    fbScriptTag.id = this.SCRIPT_ID;
    fbScriptTag.src = this.SDK_URL;
    const scriptNode = document.getElementsByTagName("script")![0];
    scriptNode &&
      scriptNode.parentNode &&
      scriptNode.parentNode.insertBefore(fbScriptTag, scriptNode);
    cb();
  }

  checkIsExistsSDKScript() {
    return !!document.getElementById(this.SCRIPT_ID);
  }

  initFbSDK(config: objectType, document: HTMLDocument) {
    this._window.fbAsyncInit = function () {
      this._window.FB && this._window.FB.init({ ...config });
      this.setState({
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
    this._window.FB.api(
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
      this.getMe(response.authResponse);
    } else {
      this.setState({
        isProgressing: false
      });
      this.props.onReject(response);
    }
  }

  loginFB() {
    if (this.state.isProgressing || !this.state.isSdkLoaded) return;
    this.setState({
      isProgressing: true
    });
    // only case mobile (redirect to fb)
    // window.location.href = `https://www.facebook.com/dialog/oauth${getParamsFromObject(params)}`;
    if (!this._window.FB) {
      this.setState({
        isProgressing: false
      });
      this.insertSDKScript(document, () => {
        this.initFbSDK(
          {
            appId: this.props.appId,
            xfbml: this.props.xfbml,
            version: this.props.version,
            cookie: this.props.cookie
          },
          document
        );
      });
      this.props.onReject("Fb isn't loaded!");
    } else {
      this._window.FB.login(this.handleResponse, {
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
