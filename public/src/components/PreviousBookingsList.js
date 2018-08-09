import {filter, slice, toLower} from 'Lodash';
import React from 'react';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { render } from 'react-dom';

import Item from './previousBookings/Item';

export default class PreviousBookingsList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      currentPageIndex: 1,
      maxItemsPerPage: 10,
    }

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  handlePaginationClick(i) {
    this.setState({
      currentPageIndex: i
    });
  }

  onChangeSearch(event) {
    this.setState({
      searchString: event.target.value
    });
  }

  render() {
    const { previousBookings } = this.props;
    const { searchString, currentPageIndex, maxItemsPerPage } = this.state;

    const filteredPreviousBookings = filter(previousBookings, function(bookingItem) {
      return toLower(bookingItem.description).includes(toLower(searchString));
    });

    const currentPageLastIndex = currentPageIndex * maxItemsPerPage;
    const currentPageFirstIndex = currentPageLastIndex - maxItemsPerPage;
    const totalPages = filteredPreviousBookings.length / maxItemsPerPage;

    const leftPaginationButton = currentPageIndex > 1 ? true : false;
    const rightPaginationButton = currentPageIndex <= totalPages ? true : false;
    const offset = leftPaginationButton ? false : true;

    const currentIndexPreviousBookings = slice(filteredPreviousBookings, currentPageFirstIndex, currentPageLastIndex);

    return (
      <div className="row">
        <div className="container media text-muted pt-3">
            <h5 className="text-center media-body pb-3 mb-0 lh-125 border-gray">
              <strong className="d-block text-gray-dark">All previous bookings</strong>
            </h5>
        </div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
          <Input placeholder="Enter string to search within description..." name="search" onChange={this.onChangeSearch} />
        </InputGroup>

        {
          currentIndexPreviousBookings.map(function(item, index) {
            return <Item key={index} item={item} />
          })
        }

        {
          leftPaginationButton &&
          <div className="col-1 offset-3"><Button color="secondary" onClick={() => {this.handlePaginationClick(currentPageIndex-1)}}>&lt;</Button></div>
        }
        {offset && <div className="col-4"></div>}
        {
          rightPaginationButton &&
          <div className="col-1 offset-4"><Button color="secondary" onClick={() => {this.handlePaginationClick(currentPageIndex+1)}}>&gt;</Button></div>
        }
      </div>

    );
  }
}
