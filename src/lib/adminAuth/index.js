
const { anyMemberExist, memberExist, createMember } = require('../members/index')
const { resourceConflict, badRequest } = require('../../utilis/error')
const { generateHash } = require('../../utilis/hashing');


const register = async ({ name, email, password }) => {


    const hasAnyMember = await anyMemberExist()

    if (hasAnyMember) {
        throw resourceConflict('Admin already registered')
    }

    const hasUser = await memberExist(email);

    if (hasUser) {
        throw badRequest('User already exist');
    }

    password = await generateHash(password);

    const member = await createMember({ name, email, password, role: 'Admin' });

    return member;
};

module.exports = {
    register,
}