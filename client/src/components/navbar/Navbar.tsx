import * as React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const [cookies, setCookie, removeCookie] = useCookies();
	const navigation = useNavigate();
	function logOut() {
		removeCookie('user_name');
		navigation('/');
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<a className='navbar-brand' href='/'>
				ShareSpace
			</a>
			<ul className='navbar-nav ml-auto'>
				{!cookies.user_name ? (
					<React.Fragment>
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
					</React.Fragment>
				) : (
					<React.Fragment>
						<li className='nav-item'>
							{/* TODO: Change this to a picture and a dropdown. Also, move it to the right side (for both) */}
							<p>Logged in as: {cookies.user_name}</p>
						</li>
						<li className='nav-item'>
							<button className='btn' type='button' onClick={logOut}>
								Logout
							</button>
						</li>
					</React.Fragment>
				)}
			</ul>			
		</nav>
	);
};
export default Navbar;
