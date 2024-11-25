import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const CreateListingPage = () => {
    const oneMegabyteAsBits = 1048576
    const fiveMegabytesAsBits = oneMegabyteAsBits * 5
    const navigation = useNavigate()
    const [cookies, setCookies] = useCookies()
    const [title, setTitle] = useState('')
    const [userInfo, setUserInfo] = useState({ email: "test", phone_number: "555-555-0123", first_name: "John", last_name: "Doe" })
    const [numberOfRoomsAvailable, setNumberOfRoomsAvailable] = useState(0)
    const [address, setAddress] = useState('')
    const [pricePerMonth, setPricePerMonth] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    
    async function createNewListing() {
        const contactInfo = {
            email: userInfo.email,
            phone_number: userInfo.phone_number,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name
        }

        const task = {
            associated_user: cookies.user_name,
            number_of_rooms_available: numberOfRoomsAvailable,
            address: address,
            contact_info: contactInfo,
            tags: tags,
            description: description,
            price_per_month: pricePerMonth,
            title: title,
            image: image,
        }

        if (
            task.associated_user &&
            task.number_of_rooms_available &&
            task.address &&
            task.contact_info &&
            task.tags &&
            task.description &&
            task.price_per_month &&
            task.title &&
            task.image
        ) {
            axios.post('/listings', task)
                .then((res) => {
                    if(res.data) {
                        console.log("Listing creation successful")
                        navigation('/create-listing-success')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    async function getUserInfo() {
        const response = await axios.get(`/users/${cookies.user_name}`)

        if(!response.data) {
            //TODO: Change this to update something on the screen
            window.alert("Error while getting listings")
            return
        }
      
        const newUserInfo = {
            email: response.data.email,
            phone_number: response.data.phone_no,
            first_name: response.data.first_name,
            last_name: response.data.last_name
        }

        setUserInfo(newUserInfo)
    }

    const convertImageToBase64 = (file) => {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result.toString())
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    function addTag() {
        if(currentTag.length > 0) {
            let currentTags = tags
            currentTags.push(currentTag)
            setTags(currentTags)

            setCurrentTag('')
        }
    }

    async function imageUpload(e) {
        const file = e.target.files[0];
        if(file.size > fiveMegabytesAsBits) {
            window.alert("Chosen file is greater than 5MB please upload file of smaller size")
            return
        }
        const imgAsBase64 = await convertImageToBase64(file)
        setImage(imgAsBase64)
    }

    useEffect(() => {
        if(!cookies.user_name) {
            console.log("The user isn't signed in, and a listing cannot be created anonymously")
            navigation('/')
            return
        }

        getUserInfo()
        return
    }, [])

    return (
        
        <main className='form-match-profile'>
            <h1>Create your listing</h1>
			<form>
				<div className='form-floating'>
					<input
						type='file'
						className='form-control'
						id='listing_image'
						onChange={(e) => imageUpload(e)}
					/>
                    <img src={image} alt="Your image here!" />
					<label htmlFor='listing_image'>Upload an image of your space (5 mb or less):</label>
				</div>
				<div className='form-floating'>
					<input
						type='text'
						className='form-control'
						id='title'
						placeholder='Name your place'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label htmlFor='title'>Title</label>
				</div>
                <div className='form-floating'>
					<input
						type='text'
						className='form-control'
						id='description'
						placeholder='Some more info on my place...'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label htmlFor='description'>Description</label>
				</div>
                <div className='form-floating'>
					<input
						type='number'
						className='form-control'
						id='pricePerMonth'
						value={pricePerMonth}
						onChange={(e) => setPricePerMonth(+e.target.value)}
					/>
					<label htmlFor='pricePerMonth'>Cost per month:</label>
				</div>
                <div className='form-floating'>
					<input
						type='number'
						className='form-control'
						id='numberOfRooms'
						value={numberOfRoomsAvailable}
						onChange={(e) => setNumberOfRoomsAvailable(+e.target.value)}
					/>
					<label htmlFor='numberOfRooms'># of rooms available</label>
				</div>
                <div className='form-floating'>
					<input
						type='text'
						className='form-control'
						id='address'
						placeholder='The chores I like are...'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<label htmlFor='address'>Address</label>
				</div>
                <div className='form-floating'>
					<input
						type='text'
						className='form-control'
						id='tags'
						placeholder='fresh, funky, fun'
						value={currentTag}
						onChange={(e) => setCurrentTag(e.target.value)}
					/>
					<label htmlFor='address'>Add some tags, separate each with a comma</label>
                    <button className='btn btn-lg'
                        type='button'
                        onClick={addTag}>Add tag</button>
                    {tags && tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span className="badge bg-secondary text-light"
                                key={index}>
                            {tag}
                            </span>
                        ))
                    ) : null}
				</div>
				<button
					className='w-100 btn btn-lg btn-primary'
					type='button'
					onClick={createNewListing}
					data-testid='submit-listing-btn'
				>
					Submit
				</button>
			</form>
		</main>
    )
}

export default CreateListingPage