import React from 'react';
import { Customer, Guest } from 'pages';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/selectors';
import { Redirect } from 'react-router-dom';

const { EditProfile, Profile, Booking } = Customer;
const { TalentProfile } = Guest;
export default function CustomerRoute(props) {
  const user = useSelector(selectUser);
  const routes = [
    {
      path: '/profile',
      component: (props) => <Profile {...props} />,
      exact: true,
    },
    { path: '/profile/edit', component: EditProfile, exact: true },
    { 
      path: '/booking/:talent/:id',
      component: () => (
      user.email_verified ? <Booking /> : <Redirect to="/aws/verify-email" />
    ),
    exact: true
  },
  ];
  return user.role === 'customer' ? routes : [];
}
