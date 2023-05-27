// import Image from "next/image"
// import {SearchParamTypes} from "@/types/SearchParamTypes"
// import formatPrice from "@/util/PriceFormat"
// import AddCart from "./AddCart"

// export default async function Product({searchParams}: SearchParamTypes) {
//   return (
//   <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16">
//     <Image
//     src={searchParams.image}
//     alt={searchParams.name}
//     width={600}
//     height={600}
//     className="w-full rounded-lg"
//     />
//     <div className="font-medium">
//       <h2 className="text-2xl py-2">{searchParams.name}</h2>
//       <p className="py-2">{searchParams.description}</p>
//       <p className="py-2">{searchParams.features}</p>
//       <div className="flex gap-2">
//         <p className="font-bold text-primary">
//           {searchParams.unit_amount  && formatPrice(searchParams.unit_amount)}
//         </p>
//       </div>
//       <AddCart {...searchParams}/>
//     </div>
//   </div>
//   )
// }
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import SanityClient from "@/sanity/client";

export default async function ProductDetails({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id,
    name,
    price,
    quantity,
    details,
    type,
    description,
    "imagesURL": images[].asset->url
  }`;

  const product = await SanityClient.fetch(query);
  console.log(product)

  return (
    <div>
      <div key={product._id} className="product-detail-container">
        <div className="product-image">
          <div className="image-container">
            <Image src={product.imagesURL[1]} alt={product.name} width={250} height={250} />
          </div>
          <div className="small-images-container">
            <Image src={product.imagesURL[2]} alt={product.name} width={100} height={100} />
            <Image src={product.imagesURL[3]} alt={product.name} width={100} height={100} />
            <Image src={product.imagesURL[4]} alt={product.name} width={100} height={100} />
          </div>
        </div>

        <div className="product-detail-desc">
          <div className="flex gap-20">
            <h1 className="text-6xl font-dancing_script text-gray-600">{product.name}</h1>
            <div className="reviews">
              <div className="review-stars">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                (20)
              </p>
            </div>
          </div>
          <div className="product-desc">
            <h6 className="text-xl">{product.description}</h6>
          </div>
          <h3>Характеристики</h3>
          <hr />
          <p>{product.details}</p>
          <div className="flex gap-10 mt-5">
            <div className="quantity">
              <p className="quantity-desc">
                <span className="minus"><AiOutlineMinus /></span>
                <span className="num">0</span>
                <span className="plus" ><AiOutlinePlus /></span>
              </p>
            </div>
            <p className="price">{product.price}&#x20B8;</p>
            <p className="price-old">100000&#x20B8;</p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart">В корзину</button>
            <button type="button" className="buy-now">Купить</button>
          </div>
        </div>

      </div>
      {/* <Image src={products[0].imagesURL[0]} alt={products.name} width={400} height={400} /> */}

    </div>


  );
}