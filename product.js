var products=[];
var cartList=[];
var cartId=0;
var productId=0;
var divListProducts = document.getElementById("divListProducts");



    addFromLocal();
				
function addFromLocal()
{
	localProduct=localStorage.getItem("productList");
	localProduct=JSON.parse(localProduct);
	n=JSON.parse(localStorage.productList).length;
	for(var i=0;i<n;i++)
	{
		var objProduct = new Object();
	
		objProduct.Id = productId;
 		objProduct.Name = localProduct[i].Name;
    	objProduct.Desc = localProduct[i].Desc;
		objProduct.Price = localProduct[i].Price;
		objProduct.Quantity = localProduct[i].Quantity;
	
    	products.push(objProduct);
      
		addProducttoDOM(objProduct);
    	productId++;
	}
}

function addProducttoDOM(objProduct)
{  	
	//create a new DIV for this product 
	var divProduct = document.createElement("div");
	divProduct.setAttribute("id", productId);
	
	//create a anchor for product name
	var labelProductName = document.createElement("label");
	labelProductName.innerHTML = "<h3>"+objProduct.Name+"<h3>";
	divProduct.appendChild(labelProductName);
	
	//insertBlankLine(divProduct);
	
	//create a label for product description
	var lblProductDesc = document.createElement("label");
	lblProductDesc.innerHTML = "("+objProduct.Desc+")";
    divProduct.appendChild(lblProductDesc);
	
    insertBlankLine(divProduct);

    var lblProductPrice = document.createElement("label");
	lblProductPrice.innerHTML = "Rs."+objProduct.Price;
    divProduct.appendChild(lblProductPrice);
		
    insertBlankLine(divProduct);

	if(objProduct.Quantity>0)
	{
    	var btnAddToCart = document.createElement("button");
		btnAddToCart.setAttribute("id","btnAddToCart");
		btnAddToCart.innerHTML = "Add To Cart";
		divProduct.appendChild(btnAddToCart);		
		
   		 btnAddToCart.addEventListener("click", function(event)
											{
												addProductToCart();
											}
								 );	


    }
    else
    {
    	var lblUnavail = document.createElement("label");
		lblUnavail.innerHTML = "OUT OF STOCK";
   	    divProduct.appendChild(lblUnavail);
    }

    insertBlankLine(divProduct);

	divListProducts.appendChild(divProduct);
	
    insertBlankLine(divProduct);
    insertBlankLine(divProduct);

}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function addProductToCart()
{
	var targetParent = event.target.parentNode;
	var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
	var newQuantity=parseInt(products[selectedProductIndex].Quantity);
	if(newQuantity==0)
	{
		alert("THIS ITEM IS CURRENTLY OUT OF STOCK");
		return;
	}
	products[selectedProductIndex].Quantity=newQuantity-1;
	localStorage.setItem("productList",JSON.stringify(products));
	alert("Added Sucessfully To Cart");

	var objList = new Object();
	
		objList.Id = cartId;
 		objList.Name = products[selectedProductIndex].Name;
    	objList.Desc = products[selectedProductIndex].Desc;
		objList.Price = products[selectedProductIndex].Price;
		
	   	cartList.push(objList);
	   	localStorage.setItem("listCart",JSON.stringify(cartList));
	   	cartId++;
}

function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id) 
			return i;
    }
}