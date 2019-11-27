/**
 * @class ExampleComponent
 */

import * as React from 'react'

import './styles.css'
import FacebookSSO from "./facebookSSO";
import GoogleSSO from "./googleSSO";

export type Props = { text: string }

export default class ExampleComponent extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <FacebookSSO>
          Login Facebook
        </FacebookSSO>
        <GoogleSSO>
          Login Google
        </GoogleSSO>
      </React.Fragment>
    )
  }
}
