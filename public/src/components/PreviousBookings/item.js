import React from 'react';
import { render } from 'react-dom';

export default class PreviousBookingsList extends React.Component {
  constructor() {
      super();
  }

  render() {
    const { item } = this.props;

    return (
      <div className="container media text-muted pt-3">
        <p className="media-body pb-3 mb-0 lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">{item.time}</strong>{item.description}
        </p>
      </div>
    );
  }
}
