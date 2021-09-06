import { sanityClient } from "../../sanity";
import { pluralize } from "../../helpers";
import Image from "../../components/Image";
import Review from "../../components/Review";
const Location = ({title,
  location,
  locationType,
  mainImg,
  imgs,
  costPerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews}) => {
  return (
    <div className='container'>
      <h1>{title}</h1>
      <p>{reviews.length} Review{pluralize(reviews.length)}</p>
      <section className='img-section'>
        <Image id={'main'} img={mainImg} />
        <section className='sub-img-section'>
          {imgs.map((img, ind) => <Image key={ind} id={""} img={img} />)}
        </section>
      </section>

      <section className='info-section'>
        <div className='info-container'>
          <h2>{locationType} hosted by {host?.name}</h2>
          <h4>{bedrooms} bedroom{pluralize(bedrooms)} * {beds} bed{pluralize(beds)}</h4>
        </div>
        <div className='price-box'>
          <h2>${costPerNight}</h2>
          <h4>{reviews.length} Review{pluralize(reviews.length)}</h4>
          <div className="btn" onClick={() => {}}>Change Dates</div>
        </div>
      </section>
      <hr />
      <h4>{description}</h4>
      <hr />
      <h2>{reviews.length} Review{pluralize(reviews.length)}</h2>
      {reviews.length && reviews.map(review => <Review {...review}/>)}
    </div> 
  )
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[ _type == "location" && slug.current == $pageSlug][0]{
    title,
    location,
    locationType,
    mainImg,
    imgs,
    costPerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      image,
      slug
    },
    reviews[]{
      ...,
      guest->{
        _id,
        name,
        image,
        slug
      }
    }
  }`

  const location = await sanityClient.fetch(query, {pageSlug})
  if(!location){
    return {
      props: null,
      notFound: true
    }
  } else {
    return {
      props: {...location}
    }
  }
}

export default Location
