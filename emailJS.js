import emailjs from '@emailjs/browser';

export const serviceID = 'krx3z65';
export const templateID = 's79774p';
export const autoReply = 'template_8tpyqja';
const publicKey = 'PR3ArNr0_tK99xmju';

emailjs.init(publicKey);

export const sendEmail = (freelancerName, form) => {
  emailjs.sendForm(serviceID, templateID, form, publicKey, {
    freelancer_name: freelancerName,
  }).then(() => {
    emailjs.sendForm(serviceID, autoReply, form, publicKey);
  });
};
