// ProfileDetailsUtils.js
export const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const validateForm = (profile) => {
  const errors = {};

  if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(profile.email)) {
    errors.email = 'Invalid email address';
  }

  if (!/^\d{10}$/.test(profile.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  if (!/^\d{6}$/.test(profile.zip_code)) {
    errors.zip_code = 'Zip code must be 6 digits';
  }

  return errors;
};
