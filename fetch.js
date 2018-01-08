var data = 
//JSON START
{
"date": "2018-01-01",
"serverName": "TestServer",
"itemsNbr": 6,
"items": [
{
  "id": 1,
  "title": "Essential cotton-blend",
  "description": "Lorem ipsum dolor",
  "img": "images/shirt6.jpg",
  "price": 200.00,
  "cur": "$",
  "onSale": true,
  "oldPrice": 100,
  "sizes": [
	"S",
	"M",
	"L",
	"XL"
  ],
  "Qty": 120
},
{
  "id": 2,
  "title": "Essential cotton-summer",
  "description": "Lorem ipsum dolor",
  "img": "images/shirt9.jpg",
  "price": 200.00,
  "cur": "$",
  "onSale": false,
  "sizes": [
	"S",
	"M"
  ],
  "Qty": 120
},
{
  "id": 3,
  "title": "Essential cotton-summer",
  "description": "Lorem ipsum dolor",
  "img": "images/shirt8.jpg",
  "price": 200.00,
  "cur": "$",
  "onSale": true,
  "oldPrice": 150,
  "sizes": [
	"S",
	"M"
  ],
  "Qty": 120
},
				{
  "id": 4,
  "title": "Essential cotton-blend",
  "description": "Lorem ipsum dolor",
  "img": "images/shirt5.jpg",
  "price": 200.00,
  "cur": "$",
  "onSale": true,
  "oldPrice": 100,
  "sizes": [
	"S",
	"M",
	"L",
	"XL"
  ],
  "Qty": 120
},
{
  "id": 5,
  "title": "Essential cotton-summer",
  "description": "Lorem ipsum dolor",
  "img": "images/shirt4.jpg",
  "price": 200.00,
  "cur": "$",
  "onSale": false,
  "sizes": [
	"S",
	"M"
  ],
  "Qty": 120
},
{
  "id": 6,
  "title": "Essential cotton-summer",
  "description": "Lorem ipsum dolor",
  "img": "images/shirt1.jpg",
  "price": 200.00,
  "cur": "$",
  "onSale": true,
  "oldPrice": 150,
  "sizes": [
	"S",
	"M"
  ],
  "Qty": 120
}
]
}
//JSON END
;

let template = "<div class=\"col-lg-4 col-sm-6 col-xs-12 prod\"> \
                <div class=\"product text-center\">\
                    <img alt=\"\" height=\"150px\" src=\"{{image}}\">\
                    <p class=\"product-title text-center\">{{product-title}}</p>\
                    <span class=\"{{old-price-class}}\">{{old-price}}</span>\
                    <span class=\"new-price\">{{price}}</span>\
                    <div class=\"container-fluid\">\
                        <div class=\"row\">\
                            <div class=\"col-lg-6 col-sm-6 col-xs-6 product-details\">\
                                <div class=\"counter\">\
                                    <a href=\"#/\">\
                                        <span class=\"minus\" onclick=\"decrease({{item-id}})\">-</span>\
                                    </a>\
                                    <span data-id=\"counter-{{item-id}}\" class=\"count\">01</span>\
                                    <a href=\"#/\">\
                                        <span class=\"plus\" onclick=\"increase({{item-id}})\">+</span>\
                                    </a>\
                                </div>\
                            </div>\
                            <div class=\"col-lg-6 col-sm-6 col-xs-6 product-details\">\
                            <a id=\"{{item-id}}\" href=\"#/\" data-type=\"add\" onclick=\"myclick(this.id, this.dataset.type)\">\
                                <div class=\"add-basket\">Add To Cart</div>\
                            </a>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>";

			
for(i=0; i<data.itemsNbr; i++){
	let filledTemplate = template.replace("{{product-title}}", data.items[i].title)
						.replace("{{image}}", data.items[i].img)
						.replace("{{price}}", data.items[i].cur + data.items[i].price)
						.replace(/{{item-id}}/g, data.items[i].id)
						.replace("{{old-price-class}}", (data.items[i].onSale)? "old-price": "old-price hidden")
						.replace("{{old-price}}", (data.items[i].onSale)? data.items[i].cur + data.items[i].oldPrice : "old-price hidden" )
						;
	

	let itemsContainer = document.querySelector(".product-list");
	itemsContainer.insertAdjacentHTML( 'beforeend', filledTemplate );
	
};



function increase(id) {
    let counter = document.querySelectorAll('[data-id="counter-' + id + '"]')[0];
    let counter_value = parseInt(counter.innerText);
    counter_value++;
    let formatted = ("0" + counter_value).slice(-2);
    counter.innerText = formatted;
}

function decrease(id) {
    let counter = document.querySelectorAll('[data-id="counter-' + id + '"]')[0];
    let counter_value = parseInt(counter.innerText);

    if(counter_value > 1) {
        counter_value--;
    }

    let formatted = ("0" + counter_value).slice(-2);
    counter.innerText = formatted;
}

let myBasket = [];




function myclick(myid, opType) {
    let item_qty = document.querySelectorAll('[data-id="counter-' + myid + '"]');

    let newItem = new Object();
    newItem.qty = parseInt(item_qty[0].innerText);
    newItem.item_id = myid;



    switch(opType) {
        case 'add':

            let exist = false
            myBasket.forEach(function(element) {
                if(element.item_id === newItem.item_id){
                    exist = true
                    ind = myBasket.indexOf(element);
                }
            });

            if(exist){
                myBasket[ind].qty = myBasket[ind].qty + newItem.qty;
            } else {
                myBasket.push(newItem)
            }

            let btn = document.querySelector("[id='" + myid + "']");
            btn.firstElementChild.innerText = "Remove";
            btn.dataset.type = "remove";


            break;


        case 'remove':

            let newexist = false;
            myBasket.forEach(function(element) {
                if(element.item_id === newItem.item_id){
                    newexist = true
                    ind = myBasket.indexOf(element);
                }
            });

            if(newexist){
                myBasket.splice(ind,1);
            }

            let btn1 = document.querySelector("[id='" + myid + "']");
            btn1.firstElementChild.innerText = "Add To Cart";
            btn1.dataset.type = "add";

            break;

    }


    let basketBadge = document.querySelector('.basket-status');
    basketBadge.innerText = myBasket.length;



};




