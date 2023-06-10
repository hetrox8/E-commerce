import Image from 'next/image'
import SanityClient from '@/sanity/client';

export default async function Discount (){
  const query = `*[_type == "product" && defined(discount)]
                {
                  _id,
                  name,
                  price,
                  quantity,
                  details,
                  type,
                  description,
                  discount,
                  "imagesURL": images[].asset->url
                }[0...20]`;
  const products = await SanityClient.fetch(query);
  
  return (
    <> 
      <section className='discount-section'>
        <h1 className='text-3xl md:text-4xl font-roboto font-medium text-green-950-700 opacity-50 ml-[2rem] md:ml-[10rem]'>Товары со скидкой</h1>
        <hr className='my-2 h-3 mb-[1rem] text-gray-900 mx-[2rem] md:mx-[10rem]' />
        <div className="marquee">
          <div className='justify-center relative ml-10 maylike-products-container track flex flex-row gap-4'>
            {products.map((product: any) => (
              <>
                <div className='flex flex-col'>
                  <div className='relative img-size'>
                    <div className="discount1 absolute right-4 top-4">
                      <p className="pl-1 pt-2">-{product.discount}%</p>
                    </div>
                    <Image 
                      className=' m-2 rounded-md max-h-full img-discount' 
                      src={product.imagesURL[1]} 
                      width={200} height={250} 
                      alt={product.name} />
                    <div className='flex flex-row bottom-[2rem] absolute bg-slate-500 bg-opacity-50 w-full rounded-md gap-8 py-3 justify-center'>
                      <h1 className='text-start ml-4 font-castoro text-xl text-white'>{product.name}</h1>
                      <h3 className='text-white '>{product.price}&#x20B8;</h3>
                    </div>
                  </div>
                </div>
              </>
            ))}

          </div>
        </div>

    </section>
    
    </>
  )
}
