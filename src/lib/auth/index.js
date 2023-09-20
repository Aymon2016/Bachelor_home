

const { memberExist, createMember, findMemberByEmail } = require('../members/index')
const { badRequest } = require('../../utilis/error')
const { generateHash, hashMatched } = require('../../utilis/hashing');


const register = async ({ name, email, password }) => {

    const hasUser = await memberExist(email);

    if (hasUser) {
        throw badRequest('User already exist');
    }

    password = await generateHash(password);



    const member = await createMember({ name, email, password, role: 'Member' });

    return member;
};

const login = async ({ email, password }) => {

    const member = await findMemberByEmail(email);
    if (!member) {
        throw badRequest('Invalid Credentials');
    }

    const matched = await hashMatched(password, member.password);
    if (!matched) {
        throw badRequest('Invalid Credentials');
    }

    return member;
};

module.exports = {
    register,
    login,
}