import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  private apiUrl = 'https://2bef72-db.myshopify.com/api/2023-07/graphql.json'; // Update with your store URL
  private storefrontAccessToken = '10e37673bbc15bcdc69d8c8e1686f214'; // Replace with your token

  constructor(private http: HttpClient,private apollo: Apollo) {}

  // Method to perform GraphQL queries
  query(gQuery: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken
    });

    const body = {
      query: gQuery
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  // Add this method to ShopifyService
getProducts(): Observable<any> {
  const productsQuery = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
        }
      }
    }
  }
  `;
  return this.query(productsQuery);
}
getProductByHandles(handle: string): Observable<any> {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      description
      variants(first: 5) {
        edges {
          node {
            id
            title
            price
          }
        }
      }
      images(first: 3) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
    }
  }
  `;
  return this.query(query);
}

// createCheckout(variantId: string, quantity: number): Observable<any> {
//   const mutation = `
//   mutation {
//     checkoutCreate(input: {
//       lineItems: [
//         {
//           variantId: "${variantId}"
//           quantity: ${quantity}
//         }
//       ]
//     }) {
//       checkout {
//         id
//         webUrl
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
//   `;
//   return this.query(mutation);
// }
  // Query to get products by collection
  getProductsByCollection(collectionHandle: string): Observable<any> {
    const GET_PRODUCTS_BY_COLLECTION = gql`
      query getProductsByCollection($collectionHandle: String!) {
        collectionByHandle(handle: $collectionHandle) {
          id
          title
          products(first: 10) {
            edges {
              node {
                id
                title
                description
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    return this.apollo.query({
      query: GET_PRODUCTS_BY_COLLECTION,
      variables: { collectionHandle }
    });
  }

  // Query to get individual product by handle
  getProductByHandle(productHandle: string): Observable<any> {
    const GET_PRODUCT_BY_HANDLE = gql`
      query getProductByHandle($productHandle: String!) {
        productByHandle(handle: $productHandle) {
          id
          title
          description
          handle
          variants(first: 5) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
        }
      }
    `;

    return this.apollo.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { productHandle }
    });
  }

  // Query to get all products
  getAllProducts(): Observable<any> {
    const GET_ALL_PRODUCTS = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }  
    `;
    return this.apollo.query({
      query: GET_ALL_PRODUCTS,
    });
  }
  // Mutation to create a new customer
  createCustomer(input: any): Observable<any> {
    const CREATE_CUSTOMER = gql`
      mutation createCustomer($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            firstName
            lastName
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: CREATE_CUSTOMER,
      variables: { input }
    });
  }

  // Mutation to log in a customer
  customerLogin(email: string, password: string): Observable<any> {
    const CUSTOMER_LOGIN = gql`
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
            
        }
      }
    `;

    const variables = {
      input: {
        email,
        password
      }
    };

    return this.apollo.mutate({
      mutation: CUSTOMER_LOGIN,
      variables
    });
  }

  // Fetch customer account data
  getCustomerData(customerAccessToken: string): Observable<any> {
    const GET_CUSTOMER_DATA = gql`
      query getCustomerData($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
          orders(first: 5) {
            edges {
              node {
                orderNumber
                totalPriceV2 {
                  amount
                  currencyCode
                }
                processedAt
              }
            }
          }
        }
      }
    `;

    return this.apollo.query({
      query: GET_CUSTOMER_DATA,
      variables: { customerAccessToken }
    });
  }

   // Method to update customer details
   updateCustomer(customerAccessToken: string, customerData: any): Observable<any> {
    const CUSTOMER_UPDATE = gql`
      mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            firstName
            lastName
            email
            phone
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: CUSTOMER_UPDATE,
      variables: {
        customerAccessToken: customerAccessToken,
        customer: customerData
      }
    });

    /**
     * 
     * {
      "customerAccessToken": "your-customer-access-token",
      "customer": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "newemail@example.com",
        "phone": "+11234567890"
                  }
        }

        Explanation:
        customerAccessToken: Token generated after customer login, used to authenticate the customer.
        customer: The new values for the fields you want to update (e.g., firstName, lastName, email, phone).
        The response contains the updated customer details or errors if any occur.
     */
  }

  recoverCustomerPassword(email: string): Observable<any> {
    const CUSTOMER_RECOVER = gql`
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            field
            message
          }
        }
      }
    `;
  
    return this.apollo.mutate({
      mutation: CUSTOMER_RECOVER,
      variables: { email }
    });
  }
  
  getCustomerOrders(customerAccessToken: string): Observable<any> {
    const GET_CUSTOMER_ORDERS = gql`
      query getCustomerOrders($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: 10) {
            edges {
              node {
                id
                orderNumber
                totalPriceV2 {
                  amount
                  currencyCode
                }
                processedAt
                lineItems(first: 5) {
                  edges {
                    node {
                      title
                      quantity
                      originalUnitPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    return this.apollo.query({
      query: GET_CUSTOMER_ORDERS,
      variables: { customerAccessToken: customerAccessToken }
    });

    /** 
    {
      "customerAccessToken": "your-customer-access-token"
    }

    Explanation:
    This query fetches the first 10 orders placed by the authenticated customer.
    Each order includes details like orderNumber, 
    totalPrice, processedAt (order date), and lineItems (the products in the order).
    */
  }

  
  createCheckout(lineItems: any[]): Observable<any> {
  const CHECKOUT_CREATE = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  return this.apollo.mutate({
    mutation: CHECKOUT_CREATE,
    variables: {
      input: {
        lineItems: lineItems
      }
    }
  });

  /*
  {
  "input": {
    "lineItems": [
      {
        "variantId": "product_variant_id",
        "quantity": 2
      }
    ]
  }
}

Explanation:
lineItems: The products added to the cart, specified by variantId and quantity.
The response includes the checkout id, webUrl (to complete the purchase), 
and the line items added to the checkout.
  */
}

addLineItemsToCheckout(checkoutId: string, lineItems: any[]): Observable<any> {
  const CHECKOUT_LINE_ITEMS_ADD = gql`
    mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  return this.apollo.mutate({
    mutation: CHECKOUT_LINE_ITEMS_ADD,
    variables: { checkoutId, lineItems }
  });

  /*
  {
  "checkoutId": "existing_checkout_id",
  "lineItems": [
    {
      "variantId": "product_variant_id",
      "quantity": 1
    }
  ]
}

  */
}

updateLineItemsInCheckout(checkoutId: string, lineItems: any[]): Observable<any> {
  const CHECKOUT_LINE_ITEMS_UPDATE = gql`
    mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
      checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  return this.apollo.mutate({
    mutation: CHECKOUT_LINE_ITEMS_UPDATE,
    variables: { checkoutId, lineItems }
  });

  /* 
  {
  "checkoutId": "existing_checkout_id",
  "lineItems": [
    {
      "id": "line_item_id",
      "quantity": 3
    }
  ]
}

  */
}


removeLineItemsFromCheckout(checkoutId: string, lineItemIds: string[]): Observable<any> {
  const CHECKOUT_LINE_ITEMS_REMOVE = gql`
    mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
      checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
        checkout {
          id
          lineItems(first: 5) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  return this.apollo.mutate({
    mutation: CHECKOUT_LINE_ITEMS_REMOVE,
    variables: { checkoutId, lineItemIds }
  });
  /*
  {
    "checkoutId": "existing_checkout_id",
    "lineItemIds": ["line_item_id"]
  }
  
  Explanation:
  lineItemIds: The IDs of the line items to be removed from the checkout.
  */
}

}
