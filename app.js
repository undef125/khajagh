const renderTo = document.querySelector(".item-list-holder");
const renderTo2 = document.querySelector(".orders-to");
const makeOrderBtn =document.getElementById("final-order-btn")
const clearOrderBtn =document.getElementById("clear-order-btn")

class ToOrder {
    constructor(finalOrder) {
        this.finalOrder = finalOrder;
        this.render();
    }

    render() {
        const finalOrderBtn = document.querySelectorAll(".buttons > button");
        finalOrderBtn.forEach(btn => btn.classList.remove("invisible"));
        const orderHolder = document.createElement("div");
        orderHolder.className = "order-holder";
        renderTo2.innerHTML = "";
        for (const item of this.finalOrder) {
            const divEl = document.createElement("div");
            divEl.className = "items-order";
            divEl.innerHTML = `
                    <p>${item.name}</p>
                    <p>Quantity: ${item.quantity} </p>
                    <p>Rs. ${item.totalPrice}</p>                
                `;
            orderHolder.appendChild(divEl);
        }
        renderTo2.append(orderHolder);
        makeOrderBtn.addEventListener('click', () => {
            let totalBillAmount = this.finalOrder.reduce((acc, curValue) => {
                return acc + curValue.totalPrice;
            },0)
            alert(`Your Order Has Been Successfully Placed\n Bill Amount: ${totalBillAmount}`);
            window.location.reload();
        })
    }
}

class Product {
    ordered = [];

    getDataFromServer() {
        this.items = [
            {
                imgUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=386&q=80",
                name: "Xola Bhatora",
                price: 60,
            },
            {
                imgUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=386&q=80",
                name: "Chicken Chowmin",
                price: 70,
            },
        ];
        this.render();
    }

    render() {
        for (const item of this.items) {
            const divEl = document.createElement("div");
            divEl.className = "items";
            divEl.innerHTML = `
                <div class="img">
                    <img
                        src="${item.imgUrl}"
                        alt="${item.name}"
                    />
                </div>
                <div class="name">
                    <p>${item.name}</p>
                    <p>Rs. ${item.price}</p>
                </div>
                <div class="input">
                    <input type="number" name="number" value="0" id="quantity">
                </div>
                <div class="order">
                    <button id="order-btn">CheckOut</button>
                </div>
                `;
            renderTo.appendChild(divEl);
            const orderBtn = divEl.querySelector("#order-btn");
            const quantity = divEl.querySelector("#quantity");
            orderBtn.removeEventListener("click", () => {});
            orderBtn.addEventListener("click", () => {
                if (parseInt(quantity.value) > 0) {
                    this.ordered.push({
                        name: item.name,
                        quantity: parseInt(quantity.value),
                        totalPrice: item.price * parseInt(quantity.value),
                    });
                } else {
                    alert("invalid quantity");
                    return;
                }
                const too = new ToOrder(this.ordered);
            });
        }
        clearOrderBtn.addEventListener("click", () => {
            this.ordered = [];
            const too = new ToOrder(this.ordered);
        })
    }
}

const prod = new Product();
prod.getDataFromServer();


