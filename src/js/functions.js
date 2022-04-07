var acutalCategory = 'bebida energetica';

function appendProducts(data) {
    var products = data.products;
    products.map(product => {
        let apply_discount = product.price - (product.price * product.discount / 100);
        $("#products").append(
            `
            <div class="product">
                <div class="product-name">
                    `+ product.name + `
                </div>
                <div class="product-image">
                    <img src=" `+ product.url_image + `" alt="image_alt"/>
                </div>

                <div class="product-details">
                    <div class="product-details-discount">
                        <p id="price">$`+ product.price + ` &nbsp;</p> 
                        <p id="new_price">$`+ apply_discount + ` &nbsp;</p>
                        <p id="discount">`+ product.discount + `% descuento</p>
                    </div>
                    <button type="button" class="btn btn-primary">Añadir al carrito</button>
                </div>
            </div>
            `
        );
    });
}

function appendPages(numberOfPages){
    console.log(numberOfPages);
    for(let i = 1; i <= numberOfPages; i++){
        $("#pagination").append(
            `
                <li class="page-item"><a class="page-link" href="#" id="page-link" onClick="changePage(`+i+`)">`+i+`</a></li>
            `
        );
    }
}

$(function () {
    fetch('http://localhost:3000/api/product')
        .then(response => response.json())
        .then(data => {
            appendProducts(data);
            appendPages(data.numberOfPages);
        });
});

function changePage(page){
    var pageNumber = page;

    var url = 'http://localhost:3000/api/product/?category='+acutalCategory+'&page=' + pageNumber + '';


    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.length);
            $("#products").empty();
            
            appendProducts(data);
            
        });
}

$('#pagination > #page-link').click(function () {
    
});

$('#nav > #nav-link').click(function () {
    acutalCategory = $(this).text();
    var pageNumber = 1;

    var url = 'http://localhost:3000/api/product/?category='+acutalCategory+'&page=' + pageNumber + '';


    fetch(url)
        .then(response => response.json())
        .then(data => {
            $("#products").empty();
            $("#pagination").empty();

            appendProducts(data);
            appendPages(data.numberOfPages);
        });


});