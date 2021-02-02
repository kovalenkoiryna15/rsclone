import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import Datetime from 'react-datetime';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';

interface ICalendarProps {
  // eslint-disable-next-line react/require-default-props
  dueDate?: number;
  setDueDate: (selectedDate?: number) => void;
  handleShow: () => void;
  isVisible: boolean;
}

const Calendar = ({
  dueDate, setDueDate, handleShow, isVisible,
}: ICalendarProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedDate(dueDate ? new Date(dueDate) : new Date());
  }, [dueDate]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDueDate(moment(selectedDate).valueOf());
    handleShow();
  };

  const handleToday = () => {
    setDueDate(Date.now());
    handleShow();
  };

  const handleClearDate = () => {
    setDueDate();
    handleShow();
  };

  const refDatePicker = useRef(null);

  const buttonClasses = 'text-uppercase font-weight-bold';

  return (
    <Modal
      animation
      className="calendar-modal"
      onHide={handleShow}
      show={isVisible}
    >
      <Modal.Header>
        <Button variant="link" onClick={handleToday} className={buttonClasses}>
          Today
        </Button>
        <Button variant="link" onClick={handleClearDate} className={buttonClasses}>
          Clear Date
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Datetime
          initialViewMode="days"
          input={false}
          onChange={(newDate) => {
            setSelectedDate(moment(newDate).toDate());
          }}
          open
          ref={refDatePicker}
          timeFormat={false}
          value={selectedDate}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className={buttonClasses} onClick={handleShow} variant="link">
          Cancel
        </Button>
        <Button
          className={buttonClasses}
          onClick={(e) => handleSubmit(e)}
          type="submit"
          variant="primary"
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Calendar;
