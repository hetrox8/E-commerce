import Image from "next/image"
import delivery from "@/public/delivery.gif"

export default function DeliveryServices() {
  return(
    <section className="w-4/5 mx-auto my-20 flex flex-col md:flex-row max-w-[1000px]">
      <div className="bg-[#d2c6b1a7] md:w-1/2 py-20 text-center">
        <div>
          <h1 className="font-bold delivery-heading text-2xl">Доставка</h1>
          <h2 className="font-bold delivery-heading text-2xl">Услуги</h2>
        </div>
        <div className="m-6">
          <h3 className="font-medium font font-castoro text-2xl"> Мы упрощаем</h3>
          <h3 className="font-medium font font-castoro text-2xl"> Все  </h3>
          <h3 className="font-medium font font-castoro text-2xl"> Для вас  </h3>
        </div>
        <div>
          <h1 className="font-dancing_script font-medium font1 text-xl m-5">Быстро и Безопасно</h1>
          <button className=" font-medium text-white px-4 text-lg text-center  rounded-full btn py-3">Подробнее</button>
        </div>
      </div>

     <div className="md:w-1/2">
      <Image src={delivery} alt="delivery-track"/>
     </div>
    </section>
    )
}