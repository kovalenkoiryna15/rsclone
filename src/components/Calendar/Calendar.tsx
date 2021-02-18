import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import Datetime from 'react-datetime';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';

interface ICalendarProps {
  // eslint-disable-next-line react/require-default-props
  dueDate?: number;
  isVisible: boolean;
  onChangeDueDate: (selectedDate?: number) => void;
  onShow: () => void;
}

const Calendar = ({
  dueDate,
  isVisible,
  onChangeDueDate: handleChangeDueDate,
  onShow: handleShow,
}: ICalendarProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedDate(dueDate ? new Date(dueDate) : new Date());
  }, [dueDate]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleChangeDueDate(moment(selectedDate).valueOf());
    handleShow();
  };

  const handleToday = () => {
    handleChangeDueDate(Date.now());
    handleShow();
  };

  const handleClearDate = () => {
    handleChangeDueDate();
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
        <Button className={buttonClasses} onClick={handleToday} variant="link">
          Today
        </Button>
        <Button className={buttonClasses} onClick={handleClearDate} variant="link">
          Clear Date
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Datetime
          ref={refDatePicker}
          initialViewMode="days"
          input={false}
          onChange={(newDate) => {
            setSelectedDate(moment(newDate).toDate());
          }}
          open
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
