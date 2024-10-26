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

createCheckout(variantId: string, quantity: number): Observable<any> {
  const mutation = `
  mutation {
    checkoutCreate(input: {
      lineItems: [
        {
          variantId: "${variantId}"
          quantity: ${quantity}
        }
      ]
    }) {
      checkout {
        id
        webUrl
      }
      userErrors {
        field
        message
      }
    }
  }
  `;
  return this.query(mutation);
}
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

}
