# Manipulate Basket
:::warning Educational Purpose Only
This content is provided strictly for educational and authorized security testing purposes.
:::

## Objective

Demonstrate a **`Broken Access Control`** vulnerability by manipulating a request to add a product to another user's basket without proper authorization.

## Table of Contents

- [Quickstart](#quickstart)
- [Solution](#solution)
- [Security Impact](#security-impact)
- [Conclusion](#conclusion)

## Quickstart

* Set up OWASP Juice Shop and start it locally (see [OWASP Juice Shop Setup](./owasp-juice-shop-setup))
* Configure Burp Suite as an interception proxy (see [Burp Suite Setup](https://portswigger.net/burp/documentation/desktop/tools/proxy))

## Solution

### Prepare Two User Accounts

* Create two user accounts in OWASP Juice Shop.
* Log in as User A (target) in a regular browser session.
* Log in as User B (attacker) in a separate incognito/private session.

:::note
Using separate browser contexts (e.g. a regular window and an incognito window) keeps both User A and User B authenticated at the same time.
:::

## Identify the Target Basket
* Add a product to the basket while logged in as User A
* Capture the legitimate request in Burp Suite

Example request:

![request](/img/projects/juice-shop/manipulate-basket/juice-shop-add-product-request.png)
* The basket ID belonging to User A was identified (See the highlighted area in the screenshot above).
:::tip
Toggle interception off in Burp Suite once the request is captured, so the rest of the flow isn't blocked waiting on the proxy.
:::

## Manipulate the Request to Modify Another User's Basket
* After identifying User A's basket ID, switch to User B's session and intercept a product addition request.
* Capture the legitimate request in Burp Suite
* Add another `BasketId` field to the JSON payload containing the target user's basket ID. Keep the basket ID of the currently authenticated user unchanged.

:::important
Adding a second `BasketId` field — rather than replacing the original — is what triggers the vulnerability. The server trusts the attacker-supplied ID instead of deriving it from the authenticated session.
:::

Example manipulated payload:
![request](/img/projects/juice-shop/manipulate-basket/juice-shop-manipulate-basket-id.png)

Expected result:
![success](/img/projects/juice-shop/manipulate-basket/juice-shop-manipulatge-basket-success.png)

:::tip
Any endpoint that accepts an object ID from the client without re-verifying ownership server-side is a candidate for this same attack pattern — worth testing on other IDs (orders, documents, profiles) too.
:::

### Verify the Result
Navigate to User A's account and check the basket.

* User A's basket contains the product even though User A never added it.
* The action was performed without proper authorization checks.
* The application accepted a request that affected another user's basket.


## Security Impact
:::warning
This flaw lets any authenticated user tamper with another user's cart data — no privilege escalation required, just a modified request body.
:::
An attacker could:

* Add products to another user's basket.
* Modify another user's shopping experience.
* Potentially interfere with purchases or business processes.
* Exploit weak authorization controls to access or modify resources belonging to other users.

## Conclusion
:::info
The vulnerability exists because the application does not properly enforce ownership validation for basket operations. By tampering with request parameters, it was possible to modify resources belonging to another user.
:::
This test demonstrates a **`Broken Access Control`** vulnerability in which insufficient server-side authorization checks allow attackers to manipulate resources belonging to other users.