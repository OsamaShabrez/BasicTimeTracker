import _ from 'Lodash';
import axios from 'axios';
import React from 'react';
import update from 'immutability-helper';
import { render } from 'react-dom';
import $ from 'jquery';

import NewBooking from './NewBooking';
import PreviousBookingsList from './PreviousBookingsList';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      previousBookings: [],
    }
  }

  componentDidMount() {
    // fetch all previous bookings
    axios.get('/fetch-all')
      .then((response) => {
        const newState = update(this.state, {
          previousBookings: { $set: response.data }
        });
        this.setState(newState);
      })
      .catch((error) => {
        console.log(error);
      });

    // activate button to top script and fire any tooltips
    $(document).ready(function() {
      let btn = $('#button-to-top');
      $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
          btn.addClass('show');
        } else {
          btn.removeClass('show');
        }
      });
      btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, '300');
      });
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      })
    });
  }

  // receives a timer object with {time, description} and sends it to the API for persistent save
  saveRecord(timerObj) {
    axios.post('/create', {
        timer: timerObj
      })
      .then((response) => {
        this.setState({
          previousBookings: _.concat(timerObj, this.state.previousBookings)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { previousBookings } = this.state;

    return (
      <div className="container">
        <a id="button-to-top"><i className="arrow-up"></i></a>
        <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-blue rounded box-shadow">
            <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Remote Assignment - Time Tracker in React.JS</h6>
            </div>
        </div>
        <NewBooking
          saveRecord={this.saveRecord.bind(this)}
        />
        <PreviousBookingsList
          previousBookings={previousBookings}
        />
      </div>
    );
  }
}
