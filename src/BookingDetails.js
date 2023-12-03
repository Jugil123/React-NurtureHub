// BookingDetails.js
import React from 'react';

const BookingDetails = ({ booking }) => {
  console.log('Booking Details:', booking);

  if (!booking) {
    return <p>No booking details available.</p>;
  }

  // Check if recipient is available
  if (!booking.recipient) {
    return <p>No recipient details available.</p>;
  }

  const { recipient, start_date, end_date } = booking;

  return (
    <div>
      <h2>Booking Details</h2>
      <div>
        <p>{`Recipient: ${recipient.firstname} ${recipient.lastname}`}</p>
        {/* Add more recipient details as needed */}
      </div>
      <p>{`Start Date: ${start_date}`}</p>
      <p>{`End Date: ${end_date}`}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookingDetails;
