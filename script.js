function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = ''; 

    checkboxes.forEach(checkbox => {
        const quantityInput = checkbox.parentElement.querySelector('.item-quantity');
        if (checkbox.checked) {
            quantityInput.disabled = false;
            const quantity = parseInt(quantityInput.value, 10);
            const price = parseFloat(checkbox.getAttribute('data-price'));
            const name = checkbox.getAttribute('data-name');

            total += price * quantity;

            const item = document.createElement('div');
            item.textContent = `${name} x${quantity} - R$${(price * quantity).toFixed(2)}`;
            cartItems.appendChild(item);
        } else {
            quantityInput.disabled = true;
        }
    });

    cartTotal.textContent = `Total: R$${total.toFixed(2)}`;
}

document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCart);
});

document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('input', updateCart);
});

function finalizeOrder() {
    updateCart();
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';

    const summary = document.getElementById('order-summary');
    summary.innerHTML = '';
    const cartItems = document.querySelectorAll('#cart-items div');
    cartItems.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.textContent = item.textContent;
        summary.appendChild(summaryItem);
    });
}
    {
    const totalElement = document.createElement('div');
    totalElement.textContent = document.getElementById('cart-total').textContent;
    summary.appendChild(totalElement);



    const catchupChoice = document.querySelector('input[name="catchup"]:checked').value;
    const catchupElement = document.createElement('div');
    catchupElement.textContent = 'Catchup: ${catchupChoice}';
    sumary.appendChild(catchupElement);
}

function submitOrder(event) {
    event.preventDefault();
    const form = document.getElementById('checkout-form');
    const name = form.name.value;
    const address = form.address.value;
    const payment = form.payment.value;
    const orderSummary = document.getElementById('order-summary').innerHTML;
    
    alert(`Pedido confirmado!\n\nNome: ${name}\nEndereço: ${address}\nPagamento: ${payment}\n\nResumo do Pedido:\n${orderSummary}`);
}

function cancelOrder() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('cart').style.display = 'block';
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('cart-total').textContent = 'Total: R$0,00';
    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.value = 1;
        input.disabled = true;
    });
}


updateCart();