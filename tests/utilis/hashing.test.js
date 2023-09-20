
const bcrypt = require('bcryptjs');
const { generateHash, hashMatched } = require('../../src/utilis/hashing');

describe('generateHash', () => {
    it('should generate a hash for a given payload', async () => {
        const payload = 'myPassword123';
        const hasingPass = await generateHash(payload);
        const ismatch = await bcrypt.compare(payload, hasingPass);
        expect(ismatch).not.toBeFalsy();

    });

});


describe('mathcingHash', () => {
    it('should verify hashing for a given payload', async () => {
        const payload = 'myPassword123';
        const hasingPass = await generateHash(payload);
        const ismatch = await hashMatched(payload, hasingPass);
        expect(ismatch).not.toBeFalsy();

    });

});
