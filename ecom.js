var products=[];
var productId=0;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

	//addFromLocal();

aAddProduct.addEventListener("click", function(event)
									  {  
									    createNewProductPanel(); 
									  }
						    );

function addFromLocal()
{
	localProduct=localStorage.getItem("productList");
	localProduct=JSON.parse(localProduct);
	n=JSON.parse(localStorage.productList).length;
	for(i=0;i<n;i++)
	{
		var objProduct = new Object();
	
		objProduct.Id = productId;
 		objProduct.Name = localProduct[i].Name;
    	objProduct.Desc = localProduct[i].Desc;
		objProduct.Price = localProduct[i].Price;
		objProduct.Quantity = localProduct[i].Quantity;
	
    	products.push(objProduct);
    
   		//localStorage.setItem("productList",JSON.stringify(products));
    
		addProducttoDOM(objProduct,0,productId);
    	deleteNewProductPanel();
    	productId++;
		//addProducttoDOM(productId[i],1,productId);
	}
}

function addProducttoArray()
{
	var objProduct = new Object();
	
	objProduct.Id = productId;
 	objProduct.Name = document.getElementById("txtProductName").value;
    objProduct.Desc = document.getElementById("txtProductDesc").value;
	objProduct.Price = document.getElementById("txtProductPrice").value;
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;
	
    products.push(objProduct);
        
	addProducttoDOM(objProduct,0,productId);
    deleteNewProductPanel();
    productId++;
}

function addProducttoDOM(objProduct,status,selectedProductIndex)
{  	
	//create a new DIV for this product 
	if(status==0)
	{
		var divProduct = document.createElement("div");
		divProduct.setAttribute("id", productId);
	}
	if(status==1)
	{
		var divProduct = document.createElement("div");
		divProduct.setAttribute("id", selectedProductIndex);
	}
	localStorage.setItem("productList",JSON.stringify(products));
	//create a anchor for product name
	var aProductName = document.createElement("a");
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = objProduct.Name;
	divProduct.appendChild(aProductName);
	
	insertBlankLine(divProduct);
	
	//create a label for product description
	var lblProductName = document.createElement("label");
	lblProductName.innerHTML = objProduct.Desc;
    divProduct.appendChild(lblProductName);
	
    insertBlankLine(divProduct);
		
	//create a anchor for deleting this product
	var aDelete = document.createElement("a");
	aDelete.setAttribute("href","#");
	aDelete.innerHTML = "Delete";
	divProduct.appendChild(aDelete);

	insertBlankLine(divAddProduct);
	
	//create a anchor for editing this product
	var aEdit = document.createElement("a");
	aEdit.setAttribute("href","#");
	aEdit.innerHTML = "Edit";
	divProduct.appendChild(aEdit);

	aDelete.addEventListener("click",function(event)
									  {
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
										   removeFromProductsArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
										   localStorage.setItem("productList",JSON.stringify(products));
									  }
							);
							

    aProductName.addEventListener("click",function(event)
									  {
										 var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
										 getProductDetails(selectedProductIndex);
									  }
							     );
									 
	divListProducts.appendChild(divProduct);
    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();

	aEdit.addEventListener("click",function(event)
									{

										var targetParent = event.target.parentNode;
										var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
										targetParent.parentNode.removeChild(targetParent);
										editFromProductsArray(selectedProductIndex);
									}

						   );
}

function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id) 
			return i;
    }
}

function getProductDetails(selectedProductIndex)
{
  console.log( "Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc + 
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity);	
}

function removeFromProductsArray(selectedProductIndex)
{
	products.splice(selectedProductIndex,1);
	console.log(products);
}

function editFromProductsArray(selectedProductIndex)
{
	hideAddNewProductLink();
	var lblEditProduct = document.createElement("label");
	lblEditProduct.innerHTML = "Edit Product";
	lblEditProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblEditProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("value", products[selectedProductIndex].Name);	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
	txtProductDesc.innerHTML=products[selectedProductIndex].Desc;
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","number");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("value", products[selectedProductIndex].Price);	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","number");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("value", products[selectedProductIndex].Quantity);	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnEditButton = document.createElement("button");
	btnEditButton.setAttribute("id","btnEditButton");
	btnEditButton.innerHTML = "Edit Product";
	divAddProduct.appendChild(btnEditButton);
	
	var btnCancleButton = document.createElement("button");
	btnCancleButton.setAttribute("id","btnCancleButton");
	btnCancleButton.innerHTML = "Cancle";
	divAddProduct.appendChild(btnCancleButton);		

	btnCancleButton.addEventListener("click", function(event)
											{
												unHideAddNewProductLink();
    											deleteNewProductPanel();
    											addProducttoDOM(products[selectedProductIndex],1,selectedProductIndex)
											}
								 );	
		
    btnEditButton.addEventListener("click", function(event)
											{
												if(txtProductName.value!="")
												{
													products[selectedProductIndex].Name = document.getElementById("txtProductName").value;
												}
												if(txtProductDesc.value!="")
												{
    												products[selectedProductIndex].Desc = document.getElementById("txtProductDesc").value;
												}
												if(txtProductPrice.value!="")
												{
													products[selectedProductIndex].Price = document.getElementById("txtProductPrice").value;
												}
												if(txtProductQuantity.value!="")
												{
													products[selectedProductIndex].Quantity = document.getElementById("txtProductQuantity").value;
												}
												console.log(products);
												unHideAddNewProductLink();
												addProducttoDOM(products[selectedProductIndex],1,selectedProductIndex)
												deleteNewProductPanel();
								     		}
								 );	
}

function deleteNewProductPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function hideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:hidden");
}

function unHideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:visible");
}

function createNewProductPanel()
{
	hideAddNewProductLink();

	/* Label - Product Quantity */ 
	var lblAddProduct = document.createElement("label");
	lblAddProduct.innerHTML = "Add New Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","number");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","number");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnAddButton = document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML = "Add Product";
	divAddProduct.appendChild(btnAddButton);		
		
    btnAddButton.addEventListener("click", function(event)
											{
												if(txtProductName.value=="" || txtProductDesc.value=="" || txtProductPrice.value=="" || txtProductQuantity.value=="")
													window.alert("All felids are mandatory");
												else
													addProducttoArray();
											}
								 );	
}