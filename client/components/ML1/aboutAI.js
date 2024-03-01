import Image from "next/image";
import python from "/public/img/py.png"
import flask from "/public/img/flask.png"
import diag1 from "/public/arch.jpg"
import Link from "next/link";


export default function AboutAI(){

  return(
    <div className="my-56 text-gray-50 w-full font-thin text-center overflow-y-clip">
      <div className="text-5xl my-3">The Avalanche Pups</div>
      
      <DevelopedBy></DevelopedBy>
      <div className="flex flex-row items-center justify-center">

          {/* <div className="mx-auto w-1/3  flex flex-row items-center justify-center mt-20 space-x-2">
            <Image src={python} className="invert" alt="Python" width={100} height={100}></Image>
            <Image src={flask} className="invert" alt="Python" width={150} height={150}></Image>
            <Image src={nextjs} className="irt" alt="Python" width={150} height={150}></Image>
          </div> */}

          <div className="w-2/3 mb-20">
            <div className="w-full mx-auto">        <Image src={diag1} className="rounded-3xl mt-5" alt="Python" ></Image></div>
          </div>

      </div>
          

          {/* <div  className="w-full grid grid-cols-3 mb-20">
            <div className="w-full">
              <div className="text-2xl">Javascript-NextJS/ReactJS</div>
              <div>FrontEnd</div>
            </div>
            
            
            <div className="w-full">
              <div className="text-2xl">Python-Flask</div>
              <div>FrontEnd-API-Backend</div>
            </div>

            <div className="w-full">
              <div className="text-2xl">OLS-Model</div>
              <div>Ordinary Least Squares</div>
            </div>

            <div className="w-full " >
  <div className="px-32  tracking-wider mt-5 text-center">Designed to get <strong>Boot Size</strong> and <strong>Harness Size</strong> from Customer. <br></br></div>
    
            </div>

            <div className="w-full pr-10">
                    <div className="px- text-justify tracking-wider mt-5 text-c">Used to listen on <strong>API End-points</strong> so that Frontend can request backend Python which then uses Machine Learning Model to Calculates whether the customer has chosen a pair of doggy boots that 
    are a sensible size. This works by estimating the dog&quot;s actual boot 
    size from their harness size. This returns a message for the customer that should be shown before
    they complete their payment 

<br></br></div>
            </div>

            <div className="w-full">
              <div className="px- text-justify tracking-wider mt-5 text-c">

              The ordinary least squares (OLS) method is a linear regression technique that is used to estimate the unknown parameters in a model. The method relies on minimizing the sum of squared residuals between the actual and predicted values.
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center my-10 ">
            <div className="w-1/2 flex flex-row items-center justify-center text-5xl">Step 1</div>
            <div className="w-1/2 capitalize text-2xl">Train Model and Save it on disk</div>
          </div>

          <div className="flex flex-row items-center justify-center my-10">
            <div className="w-1/2 flex flex-row items-center justify-center text-5xl">Step 2</div>
            <div className="w-1/2  capitalize text-2xl">Create API endpoint accessible to Client, on each call Use model for prediction</div>
          </div>

          <div className="flex flex-row items-center justify-center my-10">
            <div className="w-1/2 flex flex-row items-center justify-center text-5xl">Step 3</div>
            <div className="w-1/2  capitalize text-2xl">Create Client used &quot;GET&quot; method to call API endpoint and Show Prediction</div>
          </div> */}

    </div>
  );
}

function FrontEnd(){
  return(
    <div className="">
      
    </div>
  );
}

function Flask(){
  return(
    <div>
      

    
    </div>
  );
}


function Model(){
  return(
    <div>
      
    </div>
  );
}

function DevelopedBy(){
  return(
    <Link href="https://www.linkedin.com/in/terrankartiktellus/" target="_blank" className='text-gray-50  font-thin ml-5  hover:underline rounded-3xl block'>
      Developed By TKT
    </Link>
  );
}