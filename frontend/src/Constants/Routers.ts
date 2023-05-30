const USER_ROUTER_ROOT = '/';

const USER_ROUTERS = {
  NOT_FOUND: '*',
  HOME: USER_ROUTER_ROOT,
  ABOUT_US: `${USER_ROUTER_ROOT}about_us`,
  COMPANY: `${USER_ROUTER_ROOT}company`,
  BLOGS: `${USER_ROUTER_ROOT}blogs`,
  PRIVACY: `${USER_ROUTER_ROOT}privacy`,
  TERMS: `${USER_ROUTER_ROOT}terms`,
  FAQS: `${USER_ROUTER_ROOT}faqs`,
  CRISIS_HELPLINE: `${USER_ROUTER_ROOT}crisis_helpline`,
  JOIN_US: `${USER_ROUTER_ROOT}join_us`,
  CAREER: `${USER_ROUTER_ROOT}career`,
  CONTACT_US: `${USER_ROUTER_ROOT}contact_us`,
  RESOURCES: `${USER_ROUTER_ROOT}resources`,
  PRIVACY_TERMS: `${USER_ROUTER_ROOT}privacy-terms`,
  USER_TERMS_AND_CONDITIONS: `${USER_ROUTER_ROOT}user-terms-and-conditions`,
  PRICING_AND_REFUND: `${USER_ROUTER_ROOT}pricing-and-refund`,
  ASSESSMENTS: `${USER_ROUTER_ROOT}assessments`,
  POSTS: `${USER_ROUTER_ROOT}posts`,
  POSTS_DETAILS: `${USER_ROUTER_ROOT}posts/:slug`,
  CATEGORY: `${USER_ROUTER_ROOT}category`,
  CATEGORY_DETAILS: `${USER_ROUTER_ROOT}category/:slug`,
  ASSESSMENTS_SPECIFIC: `${USER_ROUTER_ROOT}assessments/:slug`,
  AUTHOR: `${USER_ROUTER_ROOT}author`,
  AUTHOR_DETAILS: `${USER_ROUTER_ROOT}author/:slug`,
};

export { USER_ROUTERS };

export default {
  ...USER_ROUTERS,
};
