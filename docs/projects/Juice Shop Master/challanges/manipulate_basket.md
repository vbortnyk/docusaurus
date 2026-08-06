# Manipulate Basket

## Objective

Demonstrate a **`Broken Access Control`** vulnerability by manipulating a request so that a product is added to a basket that does not belong to the currently authenticated user.

## Table of Contents
- [Quickstart](#quickstart)
- [Solution](#solution)
- [Security Impact](#security-impact)
- [Conclusion](#conclusion)

## Quickstart
* Configure the OWASP Juice Shop and start it locally (see [OWASP Juice Shop Setup](../OWASP_juice_shop_setup.md))
* Configure Burp Suite as the interception proxy (see [Burp Suite setup](https://portswigger.net/burp/documentation/desktop/tools/proxy))

## Solution

### Prepare Two User Accounts

* Create two user accounts in OWASP Juice Shop.
* Log in as User A (target) in a regular browser session.
* Log in as User B (attacker) in a separate incognito/private session.

This allowed both users to stay logged in simultaneously.


## Identify Target Basket
* Add a product to the basket while logged in as User A
* Capture the legitimate request in Burp Suite

Example request:

![request](/img/juice-shop-add-product-request.png)
* The basket ID belonging to User A was identified (See the red error on the picture above).
* Disable interception in Burp Suite so that subsequent requests are processed without interruption.

## Add a product to the basket of an attacker (User B) and manipulate the Request
* Capture the legitimate request in Burp Suite
* Add another field to the JSON payload. This field must contain the basket ID of the target user. Keep the basket ID of the currently authenticated user unchanged.
* Disable interception in Burp Suite so that subsequent requests are processed without interruption.

Example manipulated payload:
![request](/img/juice-shop-manipulate-basket-id.png)

The intercepted request was modified before forwarding it to the server.


### Verify the Result
Navigate to User A's account and check his basket.

* User A's basket contains the product even though User A never added it.
* The action was performed without proper authorization checks.
* The application accepted a request that affected another user's basket.


## Security Impact
An attacker could:

* Add products to another user's basket.
* Modify another user's shopping experience.
* Potentially interfere with purchases or business processes.
* Exploit weak authorization controls to access or modify resources belonging to other users.

## Conclusion

The vulnerability exists because the application does not properly enforce ownership validation for basket operations. By tampering with request parameters, it was possible to modify resources belonging to another user.

This test demonstrates a Broken Access Control vulnerability in which insufficient server-side authorization checks allow attackers to manipulate resources belonging to other users.