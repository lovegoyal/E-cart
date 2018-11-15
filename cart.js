var cartList=[];
var divList=document.getElementById("divList");

showCartList();

function showCartList()
{
	cartList=localStorage.getItem("listCart");
	cartList=JSON.parse(cartList);
	addToCartDOM();
}

function addToCartDOM()
{
	var subTotal=0;
	cartId=JSON.parse(localStorage.listCart).length;
	for(var i=0;i<cartId;i++)
	{
		var divProduct = document.createElement("div");
		divProduct.setAttribute("id", i);
	
		//create a anchor for product name
		var labelName = document.createElement("label");
		labelName.innerHTML = cartList[i].Name;
		divProduct.appendChild(labelName);
	
		insertBlankLine(divProduct);
	
	 	
	    var lblPrice = document.createElement("label");
		lblPrice.innerHTML = "Rs."+cartList[i].Price;
    	divProduct.appendChild(lblPrice);
		subTotal+=parseInt(cartList[i].Price);

    	insertBlankLine(divProduct);
   	 	insertBlankLine(divProduct);

		divList.appendChild(divProduct);
	
    	insertBlankLine(divProduct);
    	insertBlankLine(divProduct);
	}
	var divTotal=document.createElement("div");
	divTotal.setAttribute("id", cartId);

	var labelTotal=document.createElement("label");
	labelTotal.innerHTML="TOTAL=Rs."+subTotal;
	divTotal.appendChild(labelTotal);
    
	divList.appendChild(divTotal);

	var checkOut = document.createElement("button");
	checkOut.setAttribute("id","checkOut");
	checkOut.innerHTML = "Check Out";
	divTotal.appendChild(checkOut);		
		
    checkOut.addEventListener("click", function(event)
											{
												alert("THANKYOU FOR SHOPPING");
												localStorage.removeItem("listCart");
												window.location.href="product.html";
											}
								 );	
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}