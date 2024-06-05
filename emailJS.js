import emailjs from '@emailjs/browser';

export const serviceID = 'krx3z65';
export const templateID = 's79774p';
export const autoReply = 'template_8tpyqja';
const publicKey = 'PR3ArNr0_tK99xmju';

emailjs.init(publicKey);

export const sendEmail = (form) => {
  const templateParams = {
    to_email: form.email.value,
    from_name: form.fullName.value,
    message: form.message.value,
  };

  return emailjs.send(serviceID, templateID, templateParams).then(() => {
    return emailjs.send(serviceID, autoReply, templateParams);
  });
};



