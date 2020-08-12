import React from 'react';
import {Auth, Talent, Customer} from 'pages';
import {useSelector} from "react-redux";
import {selectUser} from "store/selectors";

const {Login, ForgetPassword} = Auth;


export default function GuestRoute(props) {
    const user = useSelector(selectUser);
    const routes = [
        {path: '/register/talent', component: Talent.Register, exact: true},
        {path: '/register/customer', component: Customer.Register, exact: true},
        {path: '/login', component: Login, exact: true},
        {path: '/forget-password', component: ForgetPassword, exact: true}
    ]

    return !user.id ? routes : [];
}
