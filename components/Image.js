import { urlFor } from "../sanity"
const Image = ({id, img}) => {
  return (
    <div className={id === 'main' ? 'main-img' : 'sub-img'}>
      <img src={urlFor(img).auto('format')} />
    </div>
  )
}

export default Image
