import React from 'react'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Button2 from '@/components/Button2';
export default function Signin() {
    return (
        <div className='absolute top-[5%] left-[50%] text-center translate-x-[-50%]  w-[80%] md:w-[40%]'>
            <img src={logo} alt="" />
            <h3 className='mb-4 text-3xl'>Hello!</h3>
            <Link to={'/signin2'}><Button title={'sign in'} /></Link>
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Link to={'/'}><Button2 title={'Continue as guest'} /></Link>
        </div>
    )
}
