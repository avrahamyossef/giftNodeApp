export const CONSTANTS = {
  currencySymbol: '₪',
  LINKS: {
    REGULATIONS: 'https://hazihinamstrgtest01.blob.core.windows.net/miscellaneous/regulations/regulations.html',
    YOUTUBE: 'https://www.youtube.com/channel/UCDBRkqiVt9JwEeJjevYlSZA',
    INSTAGRAM: 'https://www.instagram.com/hazihinam',
    FACEBOOK: 'https://www.facebook.com/hazihinam'
  },
  DEFAULTS: {
    GRANT_TYPE_PASSWORD: 'password',
    VERIFICATION_TYPE: 1,
    REGISTER_VERIFICATION_TYPE: 0,
    CLIENT_ID_FOR_DEV: 1
  },
  PARAMETERS: {
    SHOPPING_LISTS_TO_DISPLAY: 2,
    MAX_HOT_DEALS_TO_DISPLAY: 8,
    MESSAGE_DURATION_SECONDS: 3000
  },
  SCREEN: {
    LARGE_SCREEN: 1280,
    NUM_OF_PRODUCTS_IN_ROW_LARGE: 6,
    NUM_OF_PRODUCTS_IN_ROW_MEDIUM: 5,
    NUM_OF_PRODUCTS_IN_ROW_SMALL: 4,
  },
  OVERLAY_SEARCH: {
    ITEM_GROUPING: 0,
    PAGE: 1,
    PAGE_SIZE: 20,
    NUM_OF_PRODUCT_BIG: 9,
    NUM_OF_PRODUCT_SMALL: 5
  },
  VIEW_MODE: {
    GRID: 1,
    STRIP: 2
  },
  PAGE_SOURCE: {
    CART: 'cart page',
    QUICK_CART: 'quick cart popup',
    QUICK_BUY: 'quickBuy page',
    ORDERS: 'last orders page',
    FAVORITES: 'favorites page',
    TAGMUL_POPUP: 'tagmul popup',
    SEARCH_RESULTS: 'search results page',
    SHOPPING_LISTS: 'shopping lists page',
    SEARCH_OVERLAY: 'header search overlay',
    CATEGORY_SEARCH: 'search by category page',
    SHOPPING_LIST_FAVORITES: 'shopping list favorites',
    SHOPPING_LIST_PERSONAL: 'shopping list personal',
    SHOPPING_LIST_ORDERS: 'shopping list orders',
    HEADER_CART_VIEW: 'header cart view',
    CHECKOUT_CART: 'checkout cart',
    STATE: {
      ONLY_ICON: 1,
      DISPLAY_SELECTED: 2,
      CHANGE_ICON: 3,
      ALL_INCLUDED: 4
    },
    HOMEPAGE: 'homepage'
  },
  SEARCH_RESULTS: {
    ITEM_GROUPING: 1,
    NUM_OF_PRODUCTS_IN_ROW_LARGE: 5,
    NUM_OF_PRODUCTS_IN_ROW_MEDIUM: 5,
    NUM_OF_PRODUCTS_IN_ROW_SMALL: 3,
  },
  CATALOG: {
    MIVZA_CUBE: {
      STR_LENGTH_LIMIT: 6,
      FONT_SIZE_PX: 12,
    },
    MIVZA_CARD: {
      STR_LENGTH_LIMIT: 10,
      FONT_SIZE_PX: 18,
    },
    MIVZA_STRIP: {
      STR_LENGTH_LIMIT: 10,
      FONT_SIZE_PX: 10,
      STR_LENGTH_LIMIT_SMALL: 7,
      FONT_SIZE_PX_SMALL: 11,
    },
    VIEW_MODE: {
      VIEW_1: 'category_targeting',
      VIEW_2: 'campaign',
      VIEW_3: 'user_action'
    },
    NUM_OF_PRODUCTS_IN_PAGE: 50
  },
  ACCOUNT: {
    MAX_ADDRESSES: 4,
    ADDRESS_STRUCTURE_CONDO: 1,
    ADDRESS_STRUCTURE_PRIVATE_HOME: 2
  },
  REGEX_CUSTOM_VALIDATORS: {
    NAME: /(^[\u0590-\u05FF-' \(\)\""]*$)/,
    ADDRESS_ENTRANCE: /^[ A-Za-z\u0590-\u05FF0-9'",./@-]*$/,
    NAME_V2: /(^[0-9a-zA-Z\u0590-\u05FF-' \(\)\",.\/@]*$)/,
    PHONE: /^(?!.*-.*-)(?=(?:\d{9,10}$)|(?:(?=.{10,11}$)[^-]*-[^-]*$))[\d-]+$/,
    PHONE_SUFFIX: /^[1-9][0-9]{6}$/,
    EMAIL: /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
  },
  REGEX_PATTERN_VALIDATORS: {
    CITY: '^[0-9 \u0590-\u05fe\'\"\-]+$',
    STREET: '^[0-9 \u0590-\u05fe\/\\\\]+$',
    ID_NUMBER: '^[0-9]+$',
    PASSWORD: /^[a-z\u0590-\u05fe0-9]+$/i
  },
  LOGIN: {
    MIN_PASS_LENGTH: 6,
    MIN_OTP_LENGTH: 4
  },
  DELIVERY: 'משלוח',
  SHOPPING_LISTS: {
    PERSONAL: {
      MAX_INPUT_LENGTH: 30
    }
  },
  HH_DATA: {
    PHONE_NUMBER: "9097*",
    FAX: "03-6991852",
    EMAIL: "hazi-hinam.co.il"
  },
  CHECKOUT: {
    SUGGESTED_MAX_ITEMS: 10,
    SUGGESTION_ITEM_WIDTH: 210,
    DIRECCTION: {
      RIGHT: 'RIGHT',
      LEFT: 'LEFT'
    },
    DELETE_POPUP_ID: 'cart-checkout-list',
    SOURCE: 'checkout'
  },
  ELLIPSIS_TEXT: {
    CARD: {
      LARGE: 60,
      MEDIUM: 55,
      SMALL: 55,
    },
    CUBE: {
      LARGE: 55,
      MEDIUM: 45,
      SMALL: 45,
    },
    STRIP: {
      LARGE: 60,
      MEDIUM: 55,
      SMALL: 55,
    }
  }
};
