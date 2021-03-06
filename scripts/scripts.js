let prcTotal;

function queueOrder(btnPress) {
    let orderType = btnPress.parentElement;
    let hasOrder = orderType.querySelector(".selected");
    if (hasOrder !== null) {
        btnPress.classList.add("selected");
        btnPress.querySelector("ion-icon").classList.add("selected-icon");

        hasOrder.classList.remove("selected");
        hasOrder.querySelector(".selected-icon").classList.remove("selected-icon");
    } else {
        btnPress.classList.add("selected");
        btnPress.querySelector("ion-icon").classList.add("selected-icon");
    }
    countOrders();
}

function countOrders() {
    const rdyButton = document.querySelector(".order-button");
    const newLabel = document.querySelector(".order-context");
    let orders = document.querySelectorAll(".selected");
    const reqOrders = 3;
    if (orders.length === reqOrders) {
        newLabel.innerHTML = "Fechar pedido";
        rdyButton.classList.add("order-ready");
        rdyButton.disabled = false;
    } else {
        rdyButton.disabled = true;
        let curOrders = Number(reqOrders - orders.length);
        if (curOrders === 1) {
            newLabel.innerHTML = `Selecione ${curOrders} item para fechar o pedido`;
        } else
            newLabel.innerHTML = `Selecione os ${curOrders} itens para fechar o pedido`;
        rdyButton.classList.remove("order-ready");
    }
}

function paymentMenu() {
    document.querySelector(".order-ready").disabled = true;
    document.querySelector(".order-ready").classList.remove("order-ready");
    document.querySelector(".checkout-menu").classList.remove("hidden");
    document.querySelector(".content").classList.add("no-scroll");


    const lstOrders = document.querySelectorAll(".selected");
    const prcTable = document.querySelectorAll(".partial")
    const lstSize = lstOrders.length;

    prcTotal = 0;
    let itemName;
    let priceStr;
    let priceInt;

    for (let i = 0; i < lstSize; i++) {
        itemName = lstOrders[i].querySelector(".item-name").innerHTML;
        priceStr = lstOrders[i].querySelector(".item-price").innerHTML;
        prcTable[i].querySelector(".co-name").innerHTML = itemName;
        prcTable[i].querySelector(".co-price").innerHTML = priceStr;
        priceInt = adjustFormat(lstOrders[i].querySelector(".item-price").innerHTML)
        prcTotal += priceInt;
    }
    document.querySelector(".co-total").innerHTML = prcTotal.toFixed(2).toString();
}

function adjustFormat(strToInt) {
    return Number(strToInt.replace("," , "."))
}

function cancelOrder() {
    document.querySelector(".content").classList.remove("no-scroll");
    document.querySelector(".checkout-menu").classList.add("hidden");
    countOrders();
}

function requestOrder() {
    const URL = "https://wa.me/"
    const STORE_NUM = "5555991449791";
    const frstOrder = document.querySelector(".first-order").querySelector(".selected").querySelector(".item-name").innerHTML
    const scndOrder = document.querySelector(".second-order").querySelector(".selected").querySelector(".item-name").innerHTML
    const thrdOrder = document.querySelector(".third-order").querySelector(".selected").querySelector(".item-name").innerHTML

    const txtPrice = prcTotal.toFixed(2).toString().replace(".", ",");

    const info = requestInfo();

    const txtTemplate = `Ol??, gostaria de fazer o pedido:\n
- Prato: ${frstOrder}\n- Bebida: ${scndOrder}\n- Sobremesa: ${thrdOrder}\nTotal: R$ ${txtPrice}
\nNome: ${info.name}\nEndere??o: ${info.address}`

    const encodedTxt = encodeURIComponent(txtTemplate);
    let uriRequest = `${URL}${STORE_NUM}?text=${encodedTxt}`

    console.log(`${txtTemplate}\n${uriRequest}`)

    window.open(uriRequest)
}

function requestInfo() {
    let infoData = {
        name: null,
        address: null
    };

    infoData.name = prompt("Insira o nome do destinat??rio:");
    infoData.address = prompt("Insira o endere??o de entrega do pedido");
    return infoData;
}