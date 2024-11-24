import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const MatchProfileCreator = () => {
    const navigation = useNavigate()
    const [cookies, _] = useCookies()
    const [cleanlinessLevel, setCleanlinessLevel] = useState(0)
    const [schedule, setSchedule] = useState('')
    const [budget, setBudget] = useState(0)
    const [preferredChores, setPreferredChores] = useState('')
    const [socializingLevel, setSocializingLevel] = useState(0)
    
    async function createNewMatchProfile() {
        const task = {
            cleanliness_level: cleanlinessLevel,
            schedule: schedule,
            budget: budget,
            preferred_chores: preferredChores,
            socializing_level: socializingLevel,
            user_name: cookies.user_name
        }

        console.log("Current user: " + task.user_name)

        if (
            task.cleanliness_level &&
            task.schedule &&
            task.budget &&
            task.preferred_chores &&
            task.socializing_level &&
            task.user_name
        ) {
            axios.post('/match-profile', task)
                .then((res) => {
                    if(res.data) {
                        console.log("Match profile creation successful")
                        navigation('/profile-created')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        if(!cookies.user_name) {
            console.log("The user isn't signed in, and a profile cannot be created anonymously")
            navigation('/')
        }
    })

    return (
        
        <main className='form-match-profile'>
            <h1>Before we show you listings...</h1>
			<form>
				<h1 className='h3 mb-3 fw-normal'>Tell us about yourself</h1>
                <div className="form-floating">
                    <h2>How often do you like to clean?</h2>
                    <ul className="linkert list-group list-group-horizontal">
                        <li>On a schedule</li>
                        <li><input type="radio" className="list-group-item linkert" name="cleanliness" value="1" onClick={(e) => setCleanlinessLevel(1)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="cleanliness" value="2" onClick={(e) => setCleanlinessLevel(2)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="cleanliness" value="3" onClick={(e) => setCleanlinessLevel(3)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="cleanliness" value="4" onClick={(e) => setCleanlinessLevel(4)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="cleanliness" value="5" onClick={(e) => setCleanlinessLevel(5)}/></li>
                        <li>Every day</li>
                    </ul>
                </div>
                <div className="form-floating">
                    <h2>How social are you?</h2>
                    <ul className="linkert list-group list-group list-group-horizontal">
                        <li>I like to keep to myself</li>
                        <li><input type="radio" className="list-group-item linkert" name="socialness" value="1" onClick={(e) => setSocializingLevel(1)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="socialness" value="2" onClick={(e) => setSocializingLevel(2)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="socialness" value="3" onClick={(e) => setSocializingLevel(3)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="socialness" value="4" onClick={(e) => setSocializingLevel(4)}/></li>
                        <li><input type="radio" className="list-group-item linkert" name="socialness" value="5" onClick={(e) => setSocializingLevel(5)}/></li>
                        <li>I like to spend time with others</li>
                    </ul>
                </div>
				<div className='form-floating'>
					<input
						type='number'
						className='form-control'
						id='floatingBudget'
						placeholder='800'
						value={budget}
						onChange={(e) => setBudget(+e.target.value)}
						data-testid='budget-form-field'
					/>
					<label htmlFor='floatingBudget' data-testid='budget-form-label'>Max budget</label>
				</div>
				<div className='form-floating'>
					<input
						type='text'
						className='form-control'
						id='floatingSchedule'
						placeholder='My schedule is...'
						value={schedule}
						onChange={(e) => setSchedule(e.target.value)}
						data-testid='schedule-form-field'
					/>
					<label htmlFor='floatingSchedule' data-testid='password-form-label'>Schedule</label>
				</div>
                <div className='form-floating'>
					<input
						type='text'
						className='form-control'
						id='floatingPreferredChores'
						placeholder='The chores I like are...'
						value={preferredChores}
						onChange={(e) => setPreferredChores(e.target.value)}
						data-testid='preferred-chores-form-field'
					/>
					<label htmlFor='floatingPreferredChores' data-testid='preferred-chores-form-label'>Preferred chores</label>
				</div>
				<button
					className='w-100 btn btn-lg btn-primary'
					type='button'
					onClick={createNewMatchProfile}
					data-testid='submit-profile-btn'
				>
					Submit
				</button>
			</form>
		</main>
    )
}

export default MatchProfileCreator