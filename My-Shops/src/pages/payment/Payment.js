import React from "react";
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
const __DEV__ = document.domain === 'localhost'
async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
        t.json()
    )

    console.log(data)

    const options = {
        key: __DEV__ ? 'rzp_test_aZGqU7AmLFbQJg' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Book Your Items',
        description: 'By Just Giving',
        
        handler: function (response) {
  alert("Payment Success")
    window.location.reload()
 
        },
        prefill: {
            name:'',
            email: '',
            phone_number: ''
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}

export default class Payment extends React.Component{
    constructor(){
        var data=window.location.pathname.slice(9,12);
        //console.log(data)
        super();
        this.state={
            totalprice:data
        }
    }

    render(){
        return(
            <>
           
          
         <div class="d-grid gap-2 col-6 mx-auto" style={{textAlign:"center",paddingTop:"5%" }}>
             <button onClick={displayRazorpay} class="btn btn-outline-success"
              type="button" style={{marginBottom:"8%" }}><b style={{color:"black"}}>************** ARE YOU CONFIRM **************</b>{this.state.totalprice}</button>
             
         </div>

            </>
        )
    }
}


