import React from 'react';
import update from 'immutability-helper';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { render } from 'react-dom';

import Timer from './Timer';

export default class NewBooking extends React.Component {
  constructor() {
      super();
      this.state = {
        isTimerRunning: false,
        modalVisible: false,
        timer: {
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        timerInterval: '',
      }

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleModalSubmit = this.handleModalSubmit.bind(this);
      this.modalToggle = this.modalToggle.bind(this);
      this.toogleTimer = this.toogleTimer.bind(this);
  }

  // check if timer function should be registered or unregistered based on state
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTimerRunning != this.state.isTimerRunning) {
      if (this.state.isTimerRunning) {
        let tInterval = setInterval(this.runTimer.bind(this), 1000);
        const newState = update(this.state, {
          timerInterval: { $set: tInterval }
        });
        this.setState(newState);
      } else {
        this.stopTimer();
      }
    }
  }

  handleFormSubmit(event) {
    this.stopTimer();
    this.processEventForSaving(event);
    this._description.value = '';
    this.clearTimer();
  }

  handleModalSubmit(event) {
    this.processEventForSaving(event);
    this.modalToggle();
  }

  modalToggle() {
    const newState = update(this.state, {
      modalVisible: { $set: !this.state.modalVisible }
    });
    this.setState(newState);
  }

  // process the form to save record
  processEventForSaving(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const timer = {
      time: data.get('time'),
      description: data.get('description')
    };
    this.props.saveRecord(timer);
  }

  clearTimer() {
    const newState = update(this.state, {
      timer: {
        hours:   {$set: '00'},
        minutes: {$set: '00'},
        seconds: {$set: '00'}
      }
    });
    this.setState(newState);
  }

  runTimer() {
    let timer = this.state.timer;
    timer.seconds++;
    if (timer.seconds == 60) {
      timer.minutes++;
      timer.seconds = 0;
    }
    if (timer.minutes == 60) {
      timer.hours++;
      timer.minutes = 0;
    }
    timer.hours = _.padStart(timer.hours, 2, '00');
    timer.minutes = _.padStart(timer.minutes, 2, '00');
    timer.seconds = _.padStart(timer.seconds, 2, '00');
    const newState = update(this.state, {
      timer: {$set: timer}
    });
    this.setState(newState);
  }

  stopTimer() {
    clearInterval(this.state.timerInterval);
    const newState = update(this.state, {
      isTimerRunning: {$set: false}
    });
    this.setState(newState);
  }

  toogleTimer(event) {
    const newState = update(this.state, {
      isTimerRunning: {$set: !this.state.isTimerRunning}
    });
    this.setState(newState);
  }

  render() {
    const { isTimerRunning, modalVisible, timer } = this.state;
    const buttonValue = isTimerRunning ? "Pause" : "Start";
    const disableStopButton = timer.seconds == '00' ? true : false;

    return (
      <div className="row">
        <div className="col-md-4">
          <Timer timer={timer} />
          <button type="button" className="btn btn-primary btn-block mt-32" onClick={this.toogleTimer}>{buttonValue}</button>
        </div>


        <div className="col-md-8">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
                <label className="text-muted" htmlFor="task-description">Task description:</label>
                <textarea className="form-control rounded-0" id="task-description" name="description" ref={desc => this._description = desc} rows="5" required={true} />
                <input type="hidden" name="time" value={timer.hours + ":" + timer.minutes + ":" + timer.seconds} />
            </div>
            <div className="form-group row">
                <div className="col-md-6 text-muted description">
                  <em>Note: Please enter description before stopping the timer.</em>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <button type="button" className="form-group btn btn-primary btn-block" onClick={this.modalToggle}>Manual Booking</button>
                    </div>
                    <div className="col-md-6">
                      <input type="submit" className="form-group btn btn-primary btn-block" disabled={disableStopButton} value="Stop" />
                    </div>
                  </div>
                </div>
            </div>
          </form>
        </div>

        <Modal isOpen={modalVisible} toggle={this.modalToggle} className={"AddModal"} backdrop={true} >
          <form onSubmit={this.handleModalSubmit}>
              <ModalHeader toggle={this.modalToggle}>Add Time Tracking Entry Manually</ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input type="text" className="form-control" id="time" name="time" required={true}
                    pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}"/>
                  <small className="form-text text-muted">Accepted format: hh:mm:ss</small>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control rounded-0" id="description" rows="5" name="description" required={true} />
                  <small className="form-text text-muted">Should not be empty.</small>
                </div>
              </ModalBody>
              <ModalFooter>
                <Input type="submit" color="primary" />
                <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
              </ModalFooter>
            </form>
        </Modal>
      </div>
    );
  }
}
