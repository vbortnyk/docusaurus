# Payback Time

## Objective

Demonstrate an **`Improper Input Validation`** vulnerability by placing an order that results in a negative total price.

## Table of Contents

* [Quickstart](#quickstart)
* [Solution](#solution)
* [Security Impact](#security-impact)
* [Conclusion](#conclusion)

## Quickstart
* Configure the OWASP Juice Shop and start it locally (see [OWASP Juice Shop Setup](../OWASP_juice_shop_setup.md))
* Configure Burp Suite as the interception proxy (see [Burp Suite setup](https://portswigger.net/burp/documentation/desktop/tools/proxy))

## Solution

### Add a product to a basket
* Create a user account and login
* Turn **Intercept** on in Burp Suite.
* Add any product to the basket.
* Switch to Burp Suite and click **Forward** until you reach the following request:

```text
POST /api/BasketItems/ HTTP/1.1
```

* Inspect the JSON payload.
  * It contains the following information:
  * Product ID
  * Basket ID
  * The quantity of broducts being added

### Manipulate the request payload
* Change the value of the **quantity** field to a large negative number.

Example Request:
![request](/img/juice-shop-manipulate-products-quantity.png)

* Turn **Intercept** off so that the subsequent requests are processed without interruption.

### Verify the Basket

* Return to the application and open the basket.
The product quantity is now displayed as a negative value and the total price to pay is also negative.

Example Basket:
![request](/img/juice-shop-negative-total-order-price.png)
* Add additional products to the basket.



### Complete the Order

* Proceed to checkout.

* Provide the required delivery and payment information.

* Continue until the final payment page.

* The total price is displayed as a negative value, meaning the application allows the order to be completed without charging for the selected products.

Example:
![request](/img/juice-shop-negative-payment.png)

## Security Impact

Improper validation of user input allows an attacker to submit negative values where only positive quantities should be accepted.

This could allow an attacker to:

* Manipulate product quantities
* Reduce the total order price
* Purchase products without payment
* Cause financial losses for the business

## Conclusion

The application does not properly validate the **quantity** parameter supplied by the client. By submitting a negative value, it is possible to manipulate the basket contents and produce a negative order total.

This demonstrates an **Improper Input Validation** vulnerability, where the server trusts client-supplied input without enforcing appropriate validation rules.
