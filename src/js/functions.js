function appendProducts(data) {
    data.map(product => {
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

$(function () {
    fetch('http://localhost:3000/api/product')
        .then(response => response.json())
        .then(data => {
            console.log(data.length);
            appendProducts(data);
        });
});

$(document).on("click", "#page_number", function () {
});


$('a').click(function () {
    var pageNumber = $(this).text() ? $(this).text() : '1';

    fetch('http://localhost:3000/api/product', {
        method 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.length);
        appendProducts(data);
    });
});