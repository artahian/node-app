const Meteor = {
  absoluteUrl: () => 'http://localhost:3000',
  uuid: () => {
    const HEX_DIGITS = '0123456789abcdef';
    let s = [];
    for (let i = 0; i < 36; i++) {
      s[i] = HEX_DIGITS[Math.floor(Math.random() * HEX_DIGITS.length)];
    }
    s[14] = '4';
    s[19] = HEX_DIGITS.substr((parseInt(s[19], 16) & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';

    let uuid = s.join('');
    return uuid;
  },
  setTimeout: setTimeout,
  userId: () => null
};

export {Meteor};
