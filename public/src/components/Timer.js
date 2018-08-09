import React from 'react';
import { Button } from 'reactstrap';
import { render } from 'react-dom';

export default class Timer extends React.Component {
  constructor() {
      super();

  }

  componentDidMount() {
  }

  render() {
    const { hours, minutes, seconds } = this.props.timer;

    return (
      <div className="clock">
        {hours + ":" + minutes + ":" + seconds}
      </div>
    );
  }
}
