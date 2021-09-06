import { urlFor } from "../sanity"
const Review = ({rating, guest}) => {
  const {name, image} = guest
  return (
    <div className='review-box'>
      <h1>{rating}</h1>
      <h2>{name}</h2>
      <img src={urlFor(image).width(50).height(50).crop('focalpoint')} />
    </div>
  )
}

export default Review
