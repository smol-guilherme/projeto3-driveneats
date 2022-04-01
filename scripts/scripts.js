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

}

function cancelOrder() {
    document.querySelector(".checkout-menu").classList.add("hidden");
}