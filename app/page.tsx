import Head from "next/head"
import Discount from "../components/discount"
import MainSection from "../components/main"
import ProductSection from "../components/product-section"
import DeliveryServices from "../components/DeliveryServices"

export default function Main (){
  return (
    <>
      <MainSection />
      <ProductSection />
      <Discount />
      <DeliveryServices />
    </>
  )
}