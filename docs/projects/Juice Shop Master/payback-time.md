# Payback Time

## Objective
:::note
This is a classic Improper Input Validation flaw — the server accepts a negative `quantity` value instead of enforcing a minimum bound, letting the client dictate values that should only ever be positive.
:::
## Table of Contents

* [Quickstart](#quickstart)
* [Solution](#solution)
* [Security Impact](#security-impact)
* [Conclusion](#conclusion)

## Quickstart

* Set up OWASP Juice Shop and start it locally (see [OWASP Juice Shop Setup](../OWASP%20Juice%20Shop%20Setup/OWASP_juice_shop_setup))
* Configure Burp Suite as an interception proxy (see [Burp Suite Setup](https://portswigger.net/burp/documentation/desktop/tools/proxy))

## Solution

### Add a Product to the Basket

* Create a user account and log in
* Turn **Intercept** on in Burp Suite.
* Add any product to the basket.
* Switch to Burp Suite and click **Forward** until you reach the following request:

```text
POST /api/BasketItems/ HTTP/1.1
```

* Inspect the JSON payload.
  
  It contains the following information:

    * Product ID
    * Basket ID
    * The quantity of products being added

:::tip
Note the JSON structure here — Product ID, Basket ID, and quantity — before moving to the next step, since only the quantity field needs to change to trigger the vulnerability.
:::

### Manipulate the Request Payload

* Change the value of the **quantity** field to a large negative number.

Example manipulated payload:

![example manipulated payload](/img/projects/juice-shop/payback-time/juice-shop-manipulate-products-quantity.png)

* Turn **Intercept** off so that the subsequent requests are processed without interruption.

:::important
Using a large negative number (rather than just `-1`) makes the resulting price swing more dramatic and easier to verify visually in the basket and checkout total.
:::

### Verify the Basket

* Return to the application and open the basket.

The product quantity is now displayed as a negative value, and the total price is also negative.

Example basket:
![negative price](/img/projects/juice-shop/payback-time/juice-shop-negative-total-order-price.png)

* Add more products to see how the total price changes.

### Complete the Order

* Proceed to checkout.

* Provide the required delivery and payment information.

* Continue until the final payment page.

* The total price is displayed as a negative value, meaning the application allows the order to be completed without charging for the selected products.

Example payment page:
![negative payment](/img/projects/juice-shop/payback-time/juice-shop-negative-payment.png)
* Click "Place your order and pay"

Expected result:

![success](/img/projects/juice-shop/payback-time/juice-shop-negative-payment-success.png)

## Security Impact
:::warning
This flaw allows an attacker to complete a real checkout flow while paying nothing — or even receiving a negative charge — with no need to bypass authentication or escalate privileges.
:::
Improper validation of user input allows an attacker to submit negative values where only positive quantities should be accepted.

This could allow an attacker to:

* Manipulate product quantities
* Reduce the total order price
* Purchase products without payment
* Cause financial losses for the business

## Conclusion
:::info
The application does not properly validate the **quantity** parameter supplied by the client. By submitting a negative value, it is possible to manipulate the basket contents and produce a negative order total.
:::
This demonstrates an **Improper Input Validation** vulnerability, where the server trusts client-supplied input without enforcing appropriate validation rules.
