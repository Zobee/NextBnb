import { sanityClient } from '../sanity'
const Home = ({locations}) => {
  console.log(locations)
  return (
    <>
      Porn
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "location"]'
  const locations = await sanityClient.fetch(query)

  if (!locations.length) {
    return {
      props: {
        locations: []
      }
    }
  } else {
    return {
      props: {
        locations
      }
    }
  }
}

export default Home