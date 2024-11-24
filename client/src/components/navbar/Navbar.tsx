import * as React from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const [cookies, setCookie, removeCookie] = useCookies();
	const navigation = useNavigate();
	const [searchString, setSearchString] = useState('');
	function logOut() {
		removeCookie('user_name');
		removeCookie('is_admin');
		navigation('/');
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<a className='navbar-brand' href='/'>
				ShareSpace
			</a>
			<div className='ml-auto'>
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<a className='nav-link' href='/signup'>
							Sign up
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/login'>
							Login
						</a>
					</li>
				</ul>
			</div>
			
		</nav>
	);
};
export default Navbar;
