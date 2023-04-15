const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  //метод для создания таблицы Квадрат Виженера
  encrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");
    message = message.toUpperCase();
    key = key.toUpperCase();
    let result = "";
    let keyIndex = 0;
    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        let shift = this.alphabet.indexOf(key[keyIndex]);
        let index =
          (this.alphabet.indexOf(message[i]) + shift) % this.alphabet.length;
        result += this.alphabet[index];
        keyIndex = (keyIndex + 1) % key.length;
      } else {
        result += message[i];
      }
    }
    return this.direct ? result : result.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error("Incorrect arguments!");
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    let result = "";
    let keyIndex = 0;
    for (let i = 0; i < encryptedMessage.length; i++) {
      if (this.alphabet.includes(encryptedMessage[i])) {
        let shift = this.alphabet.indexOf(key[keyIndex]);
        let index =
          (this.alphabet.indexOf(encryptedMessage[i]) -
            shift +
            this.alphabet.length) %
          this.alphabet.length;
        result += this.alphabet[index];
        keyIndex = (keyIndex + 1) % key.length;
      } else {
        result += encryptedMessage[i];
      }
    }
    return this.direct ? result : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
