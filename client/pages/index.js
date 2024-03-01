import Image from "next/image"
import snow from "../public/img/snow.jpg"
import logo from "../public/img/logo1.jpg"
import redImg from "../public/img/h_r.png"
import blackImg from "../public/img/h_b.png"
import grayImg from "../public/img/h_w.png"
import AboutAI from "../components/ML1/aboutAI"
import redImgIco from "../public/img/i_r.png"
import blackImgIco from "../public/img/i_b.png"
import grayImgIco from "../public/img/i_w.png"
import toast,{ Toaster } from "react-hot-toast";
import Link from "next/link"
import { useState } from "react"


const redDog = {
   i: redImg,
   name: "Sober Sele",
   description: "A vest harness is a type of harness that fits snugly around the dogs chest and is secured with a buckle. It often has reflective strips or patches for added visibility, making it a good option for dogs that will be walking or running in low light conditions. Vest harnesses can also be equipped with pockets for carrying small items such as treats or waste bags.",
   features: ["Adjustable","Reflective elements","3 Pockets", "Handle", "Breathable","Waterproof","LED light"],
   htype: "Vest"
}
const blackDog = {
   i: blackImg,
   name: "Bods Laottio",
   description: "This type of harness has a simple H-shaped design that fits over the dogs head and rests on their back. It typically has two points of attachment for the leash, one at the front of the chest and one at the back. This type of harness is often used for training and can help prevent pulling on the leash.",
   features: ["Adjustable","Two points of attachment","Reflective elements","Padding","Breathable","Waterproof","LED light"],
   htype: "H-style"
}
const whiteDog = {
   i: grayImg,
   name: "Stirt Shag",
   description: "This type of harness has a simple H-shaped design that fits over the dogs head and rests on their back. It typically has two points of attachment for the leash, one at the front of the chest and one at the back. This type of harness is often used for training and can help prevent pulling on the leash.",
   features: ["Easy on and off","Padding","Adjustable","Breathable","Waterproof","LED light"],
   htype: "Step-in"
}
export default function Home() {
  const [img ,setImg] = useState(redDog);
  const [data,setDate] = useState({b:12, h:32});
  const [toggleOrder,setOrder] = useState({toggle:false, button: "Check Availability"});
  const [orderCount , setOrderCount] = useState(1)

  const [wel,setwel] = useState(0);
async function Submit(e){
  toast.dismiss();
    e.preventDefault();
    let timeElapsed = 0; // Initialize the time elapsed
    let loadingToastShown = false; // Initialize flag to track if loading toast is shown
let cacheToast = true;
let initialMsg = "Waiting for response"
    // Create a function to update the toast message with the current time elapsed
    const updateToastMessage = () => {
        if (!loadingToastShown) {
          toast.dismiss();
toast.loading(`${initialMsg} \n ${timeElapsed} seconds`, { duration: 12000, position: "top-right",style: { width: "700px" ,  textAlign: "center" } });
        }
        timeElapsed++; // Increment the time elapsed

        // If the time elapsed exceeds the threshold and no response is received yet, show "No Cache was found" notification
        if (timeElapsed >= 5 && cacheToast && !loadingToastShown) {
toast.error("No cached data available.", { duration: 3000 });
            cacheToast = false
            initialMsg = "Loading model and predicting        "

          }
        
    };

    // Start updating the toast message
    const interval = setInterval(updateToastMessage, 1000);

    if (!toggleOrder.toggle) {
        try {
            const response = await fetch(`http://localhost:5000/predict?b=${data.b}&h=${data.h}`);

            clearInterval(interval); // Stop updating the toast message

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            loadingToastShown = true; // Set flag to true indicating loading toast is shown

            const result = await response.json();
toast.dismiss();
            if (result.flag == 0) {
                toast.success(result.message, { duration: 10000 , delay: 1000,style: { width: "700px" ,  textAlign: "justify" }});
                setOrder({ toggle: true, button: "Order Now" });
            } else if (result.flag == 1) {
                toast.error(result.message, { duration: 10000,style: { width: "700px" ,  textAlign: "justify" } });
            } else if (result.flag == -1) {
                toast.error(result.message, { duration: 10000,style: { width: "700px" ,  textAlign: "justify" } });
            }
            console.log("res", result);

        } catch (err) {
            console.log(err);
            toast.error("Backend Error", { duration: 3000 });
              toast.dismiss();
        }
    } else {

        toast.success("Order Placed", { duration: 10000 });
      toast.dismiss();
        setOrderCount(1);
        setOrder({ toggle: false, button: "Check Availability" });
        setDate({ b: 0, h: 0 });
        document.getElementById("b").value = "";
        document.getElementById("h").value = "";
    }
}

  return (
   <div style={{
      backgroundImage: `url(${snow.src})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }} className="w-full h-screen">
      <Toaster  gutter={14}      position="bottom-center"      reverseOrder={true} />
   <main className="relative w-full h-full bg-gray-900/40 py-8 flex flex-row item-center justify-center ">
    <div className="bg-black/70 w-11/12 h-full rounded-[50px] relative  overflow-y-scroll">
    {wel != 2 && <DevelopedBy ></DevelopedBy>}
    
    {wel == 2 && <AboutAI></AboutAI>}

    {wel==0 && 
    <div className="flex font-thin flex-col item-center w-full h-full justify-center">
      <LogoBig></LogoBig>
      <div className=" text-3xl w-full text-center">Welcome to <p className="text-6xl">The Avalanche Pups</p></div>
      <div className="text-center tracking-widest mt-3">The ultimate destination for avalanche dogs and their owners</div>
      
      <div className="text-center mx-auto mt-8 grp-3 text-opacity-70 tracking-wide  space-y-1 ">
        {/* <div>⚪ Our Top-Rated Avalanche Dog Harnesses</div>
        <div>⚪ Our Favorite Avalanche Dog Harnesses</div> */}
        {/* <div >Choose Perfect Harnesses<br></br> for you dog with help of our <button onClick={()=>{setwel(2)}} className="bg-transparent font-semibold hover:underline-offset-1 underline">AI Powered Model</button></div> */}
      </div>

      <div className="font-thin text-center w-[430px] mt-10 mx-auto">If you&quot;re not sure which size harness to choose for your dog, don&quot;t worry! Our <button onClick={()=>{setwel(2)}} className="bg-transparent font-semibold hover:underline-offset-1 underline">AI Powered Model</button> can assist you in selecting the right size based on the size of your dog&quot;s boots.</div>
      <div className="w-full bg-re00 mt-10 flex flex-row item-center justify-center">
        <button onClick={()=>{setwel(1)}} className="hover:underline hove text-2xl font-thin tracking-wider bg-gray-50 text-black mx-auto">Get Started</button>
      </div>
    </div>}
    {wel==1 && <div className="overflow-hidden flex flex-row items-center justify-center">

      <div className="w-1/2 h-">
      <ShowImage i={img.i}></ShowImage>
      
      
      </div>
      
      <div className="w-1/2 pl-20 pr-10">
        <div className="text-3xl font-extrabold text-gray-50">{img.name}</div>
        <div className="text-lg font-medium mt-16">{img.htype} Harness Type </div>
        <div className="text-base font-thin mt-4 mb-8">{img.description}</div>
        
        <div className="font-bold my-2">Features</div>
        <div className="font- flex text-xs  text-center mx-3 my-1">{img.features.map((i,index)=>(
          <button key={index} className="p-2 bg-gray-50 hover:bg-gray-50/80 text-black  font-semibold tracking-wider flex flex-col items-center justify-center rounded-l-full mx-1 shadow-md shadow-gray-100/60 rounded-r-full ">{i}</button>
        ))}</div>
        <div className="my-3 flex flex-row items-center justify-between ">

        <div className="w-full bg-400 flex flex-row items-center justify-start space-x-5">
          <div className="flex flex-col items-center justify-start">
            <p className="text-white/80 mb-2 mt-4 text-sm">Boot Size</p>
            <input defaultValue={12} type="number" max={999} onKeyPress={(e) => {
        // Prevent input if it would result in a value greater than 999
        if (e.target.value.length >= 3) {
            e.preventDefault();
        }
    }} id="b" onChange={(e)=>{
            setDate(
              {...data,b:e.target.value}
            )}} placeholder="12" className="ml-7 w-[60px] h-[60px] bg-transparent border-[2px] rounded-2xl border-gray-50/50 outline-none p-2 text-center font-thin" ></input>
          </div>

          <div className="flex flex-col items-center justify-start mr-32">
            <p className="text-white/80 mb-2 mt-4 text-sm">Harness Size</p>
            <input id="h" type="number" defaultValue={32} max={999} onKeyPress={(e) => {
        // Prevent input if it would result in a value greater than 999
        if (e.target.value.length >= 3) {
            e.preventDefault();
        }
    }}  onChange={(e)=>{setDate(
              {...data,h:e.target.value}
            )}} placeholder="32" className="ml-7 w-[60px] h-[60px] bg-transparent border-[2px] rounded-2xl border-gray-50/50 outline-none p-2 text-center font-thin" ></input>
          </div>

        </div>
          {toggleOrder.toggle &&
            <div className="flex flex-row items-center justify-center bg- mt-10 mr-10 space-x-2 w-auto">
            <button className="w-8 h-8 outline-none bg-white rounded-full p-1 flex flex-row items-center justify-center" onClick={()=>{ if(orderCount-1 <9)setOrderCount(orderCount+1) }}><svg className="w-8 h-8 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg></button>
            <div>{orderCount}</div>
            <button className="w-8 h-8 outline-none bg-white rounded-full " onClick={()=>{ if(orderCount-1 >0)setOrderCount(orderCount-1) }}><svg className="w-8 h-8 none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm4.253 9.25h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" fill-rule="nonzero"/></svg></button>
          </div>}
          <button onClick={Submit} className="bg-gray-50  text-black font-thin w-full mt-10 rounded-2xl h-[60px] hover:bg-opacity-95 ">{toggleOrder.button}</button>
          {/* <div className="w-1/6">
            <button className="bg-gray-50 text-black font-thin w-[60px] mt-4 h-[60px]">Check</button>
          </div> */}
        </div>
        <div className="text-transparent h-[1px] w-6/6 bg-gray-50/30 mt-16 mb-16">.</div>
        <div className="text-lg font-semibold tracking-wider mb-4">Select Color</div>
        <div className="font-thin tracking-wider mx-2 space-x-4 ">
          <button onClick={()=>{
            setImg(redDog)
          }}>
            <div className="group">
              <div><Image alt={'img'} src={redImgIco} width={60} height={60} className="rounded-lg mb-2 group-hover:border-[2px] group-hover:border-white"></Image></div>
              <div>Red</div>
            </div>
          </button>
          <button onClick={()=>{
            setImg(blackDog)
          }}>
            <div className="group">
              <div><Image  alt={'img'} src={blackImgIco} width={60} height={60} className="rounded-lg mb-2 group-hover:border-[2px] group-hover:border-white"></Image></div>
              <div>Black</div>
            </div>
          </button>
          <button onClick={()=>{
            setImg(whiteDog)
          }}>
            <div className="group">
              <div><Image alt={'img'}  src={grayImgIco} width={60} height={60} className="rounded-lg mb-2 group-hover:border-[2px] group-hover:border-white"></Image></div>
              <div>White</div>
            </div>
          </button>
          
        </div>
      </div>
     

    </div>}
   {wel != 0 && wel != 2 && <Logo></Logo>}
   
   { wel != 0 && 
   <button onClick={()=>setwel(0)} className="fixed top-7 left-7 rounded-3xl group group-hover:block transition-transform duration-500 ease-in-out"> 
      <p className="absolute w-[100px] top-5 -left-20 hidden group-hover:block transition-transform duration-500 ease-in-out translate-x-9 group-hover:translate-x-12 group-hover:translate-y-5 font-thin ">back</p>
      <svg className="w-10 h-10 fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
    </button>}
    </div>      
   </main>
   </div>
  )
}

function Logo(){
  return(
    <div className="absolute bottom-5 right-5 rounded-3xl group group-hover:block transition-transform duration-500 ease-in-out">
    
      <Link href="/" className="absolute w-[100px] top-5 -left-20 hidden group-hover:block transition-transform duration-500 ease-in-out translate-x-9 group-hover:translate-x-0 font-thin ">Woo Fogs</Link>
    
      
      <Image src={logo} alt="logo" width={60} className="rounded-3xl" height={60}></Image>
    </div>
  );
}

function LogoBig(){
  return(
    <div className="mb-6 rounded-3xl mx-auto group group-hover:block transition-transform duration-500 ease-in-out">
    
      
      <Image src={logo} alt="logo" width={160} className="rounded-3xl" height={160}></Image>
    </div>
  );
}
function DevelopedBy(){
  return(
    <Link href="https://www.linkedin.com/in/terrankartiktellus/" rel="noreferrer" target="_blank" className="text-gray-50 absolute bottom-5 left font-thin ml-5  hover:underline rounded-3xl block">
      Developed By TKT
    </Link>
  );
}

function ShowImage({i}){
  return(
    <div className="w-full h-full ">
      <Image alt={"Show"} src={i} className="h-[full] rounded-l-[50px]" ></Image>
    </div>
  );
}

