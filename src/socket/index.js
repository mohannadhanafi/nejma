import socketIOClient from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../_constants';
import { addNotification } from '../store/actions/notifications';
import { selectUser } from 'store/selectors';

const RealTime = () => {
  const user = useSelector(selectUser);
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = socketIOClient(BASE_URL, { transports: ['websocket'] });
    socket.on('new_notification', (data) => {
      dispatch(addNotification(data));
    });
    if (user.id) {
      socket.emit('user', { user_id: user.user_id })
    }
    if (user.id && user.role === 'customer') {
      socket.emit('join', 'customer')
    }
  }, []);

  return null;
};

export default RealTime;