const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const SHOPIFY_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch({ query, variables = {} }) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn('Shopify credentials not configured. Using mock data.');
    return { data: null, errors: [{ message: 'Not configured' }] };
  }

  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`);
  }

  return res.json();
}

// Get all products with pagination
export async function getProducts({ first = 24, after = null, query = '' } = {}) {
  const { data } = await shopifyFetch({
    query: `
      query GetProducts($first: Int!, $after: String, $query: String) {
        products(first: $first, after: $after, query: $query) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              handle
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
                    url
                    altText
                  }
                }
              }
              collections(first: 3) {
                edges {
                  node {
                    handle
                    title
                  }
                }
              }
              tags
              vendor
            }
          }
        }
      }
    `,
    variables: { first, after, query: query || null },
  });

  if (!data?.products) return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };

  return {
    products: data.products.edges.map(({ node }) => node),
    pageInfo: data.products.pageInfo,
  };
}

// Get single product by handle
export async function getProduct(handle) {
  const { data } = await shopifyFetch({
    query: `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    `,
    variables: { handle },
  });

  if (!data?.product) return null;
  return data.product;
}

// Get all collections
export async function getCollections() {
  const { data } = await shopifyFetch({
    query: `
      query GetCollections {
        collections(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                url
                altText
              }
            }
          }
        }
      }
    `,
  });

  if (!data?.collections) return [];
  return data.collections.edges.map(({ node }) => node);
}

// Get products by collection
export async function getCollectionProducts({ handle, first = 24, after = null } = {}) {
  const { data } = await shopifyFetch({
    query: `
      query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
        collection(handle: $handle) {
          id
          title
          description
          image {
            url
            altText
          }
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                handle
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
                      url
                      altText
                    }
                  }
                }
                tags
                vendor
              }
            }
          }
        }
      }
    `,
    variables: { handle, first, after },
  });

  if (!data?.collection) return { collection: null, products: [], pageInfo: {} };

  return {
    collection: data.collection,
    products: data.collection.products.edges.map(({ node }) => node),
    pageInfo: data.collection.products.pageInfo,
  };
}

// Create cart
export async function createCart() {
  const { data } = await shopifyFetch({
    query: `
      mutation CreateCart {
        cartCreate {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
  });

  return data?.cartCreate?.cart;
}

// Add to cart
export async function addToCart(cartId, variantId, quantity = 1) {
  const { data } = await shopifyFetch({
    query: `
      mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  return data?.cartLinesAdd?.cart;
}

// Update cart line
export async function updateCartLine(cartId, lineId, quantity) {
  const { data } = await shopifyFetch({
    query: `
      mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  return data?.cartLinesUpdate?.cart;
}

// Remove from cart
export async function removeFromCart(cartId, lineIds) {
  const { data } = await shopifyFetch({
    query: `
      mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    variables: { cartId, lineIds },
  });

  return data?.cartLinesRemove?.cart;
}

export function formatPrice(amount, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}
