export const displayTemporaryMessage = (message, setMessage) => {
  setMessage(message);
  setTimeout(() => {
    setMessage('');
  }, 3000);
};