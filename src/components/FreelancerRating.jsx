import MyButton from './buttons/MyButton';
import { useState, useContext } from 'react';
import { UserContext } from './UserProvider';
import Fetcher from "../fetcher";

const RateFreelancer = ({freelancerId}) => {
  const [checked, setChecked] = useState(false)
  const [rating, setRating] = useState()
  const { user } = useContext(UserContext);
  const fetcher = new Fetcher("api");
  const checkedOption = (event) => {
    setChecked(!checked);
  }

  const handleRating = (rating) => {
    console.log(rating)
    const reviewData = {
      freelancerId,
      clientId: user?.id,
      star_review: rating
    }
    fetcher.route('/reviews').post(reviewData)

  }

  const rates = [1, 2, 3, 4, 5]

  return (
    <div className="card p-1 m-1" style={{ backgroundColor: "var(--littleBoyBlue)" }} >
      {rates.map((selectedRate) => {
        return (
          <MyButton text={`${selectedRate}⭐`} onClick={() => { handleRating(selectedRate) }}
            cssType={"submit"} cssSpacing={''} value={selectedRate} />
        )
      })}
    </div>

  )
}

export default RateFreelancer

{/* <div className='justify-center' >
<form >
  <div className='flex flex-row'>
    <div className="radio">
      <label>
        <input type="radio" name= "rating" value="1" onChange={checkedOption} />
        1⭐
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" name= "rating" value="2" onChange={checkedOption} />
        2⭐
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" name= "rating" value="3" onChange={checkedOption} />
        3⭐
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" name= "rating" value="4" onChange={checkedOption} />
        4⭐
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" name= "rating" value="5" onChange={checkedOption} />
        5⭐
      </label>
    </div>
  </div>
<MyButton text ={'Rate Freelancer'} onSubmit={handleRating}/>
</form>
</div> */}

//<MyButton text={`1⭐`} onSubmit={handleRating} onChange={checkedOption} cssType={"submit"} cssSpacing={''} value = "1"/>
//<MyButton text={'2⭐'} onSubmit={handleRating} onChange={checkedOption} cssType={"submit"} cssSpacing={''} value = "2"/>
//<MyButton text={'3⭐'} onSubmit={handleRating} onChange={checkedOption} cssType={"submit"} cssSpacing={''} value = "3"/>
//<MyButton text={'4⭐'} onSubmit={handleRating} onChange={checkedOption} cssType={"submit"} cssSpacing={''} value = "4"/>
//<MyButton text={'5⭐'} onSubmit={handleRating} onChange={checkedOption} cssType={"submit"} cssSpacing={''} value = "5"/>