import ROUTERS from './Routers';

const NAV_FOOTER_LINKS = [
  {
    value: ROUTERS.CONTACT_US,
    label: 'Contact Us',
  },
  {
    value: ROUTERS.BLOGS,
    label: 'Blog',
  },
  {
    value: ROUTERS.CAREER,
    label: 'Careers',
  },
  {
    value: ROUTERS.CRISIS_HELPLINE,
    label: 'Crisis helpline',
  },
  {
    value: ROUTERS.PRICING_AND_REFUND,
    label: 'Pricing & Refund',
  },
  {
    value: ROUTERS.USER_TERMS_AND_CONDITIONS,
    label: 'Terms & conditions',
  },
  {
    value: ROUTERS.PRIVACY_TERMS,
    label: 'Privacy policy',
  },
];

const TOPIC_LINKS = [
  {
    value: 'anxiety',
    label: 'Anxiety',
  },
  {
    value: 'depression',
    label: 'Depression',
  },
  {
    value: 'mentalHealth',
    label: 'Mental health',
  },
  {
    value: 'Sleep',
    label: 'Sleep',
  },
  {
    value: 'Stress',
    label: 'Stress',
  },
  {
    value: 'Addiction',
    label: 'Addiction',
  },
  {
    value: 'Self care',
    label: 'Self care',
  },
  {
    value: 'Abuse',
    label: 'Abuse',
  },
  {
    value: 'Work life balance',
    label: 'Work life balance',
  },
];

const ASSESSMENT_LINKS = [
  {
    value: 'Depression assessment',
    label: 'Depression assessment',
  },
  {
    value: 'Stress assessment',
    label: 'Stress assessment',
  },
  {
    value: 'Anxiety assessment',
    label: 'Anxiety assessment',
  },
  {
    value: 'Relationship issues assessment',
    label: 'Relationship issues assessment',
  },
  {
    value: 'Work issues assessment',
    label: 'Work issues assessment',
  },
  {
    value: 'Parenting assessment',
    label: 'Parenting assessment',
  },
  {
    value: 'Self improvement assessment',
    label: 'Self improvement assessment',
  },
  {
    value: 'Family conflict assessment',
    label: 'Family conflict assessment',
  },
  {
    value: 'Anger issues assessment',
    label: 'Anger issues assessment',
  },
  {
    value: 'Loneliness assessment',
    label: 'Loneliness assessment',
  },
];

export default { TOPIC_LINKS, NAV_FOOTER_LINKS, ASSESSMENT_LINKS };
