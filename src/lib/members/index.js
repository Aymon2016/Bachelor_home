
const { serverError, notFound, authenticationError } = require('../../utilis/error')
const defaults = require('../../config/defaults')
const Member = require('../../model/Member');
const { hashMatched, generateHash } = require('../../utilis/hashing')

const findMemberByEmail = async (email) => {
    const member = await Member.findOne({ email });
    return member ? member : false;
};

const memberExist = async (email) => {
    const member = await findMemberByEmail(email);
    return member ? true : false;
};


const anyMemberExist = async () => {
    try {
        const member = await Member.find()

        if (member.length > 0) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        throw serverError()
    }
};

const createMember = async ({ name, email, password, role, }) => {
    const user = new Member({ name, email, password, role, });
    await user.save();
    return user;
};

const count = ({ search = '' }) => {
    const filter = {
        name: { $regex: search, $options: 'i' },
    };

    return Member.count(filter);
};

const findAll = async ({
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search
}) => {
    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
    const filter = {
        name: { $regex: search, $options: 'i' },
    };

    const members = await Member.find(filter)
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);

    return members

};

const findSingle = async (id) => {

    const member = await Member.findById(id)
    return member
};

const update = async (id, updateData) => {

    const member = await findSingle(id)

    if (!member) {
        throw notFound('Member Not Found')
    }

    // only name chage hote parbe so ai bave korer dorker cilo nh.terpor o kore raklam jeno onk properties er hole kaj e dibe.
    const fieldsNotToExclude = ['email', 'password', '_id', 'role'];

    Object.keys(updateData).forEach((key) => {

        if (!fieldsNotToExclude.includes(key)) {
            member[key] = updateData[key];
        }
    });

    await member.save()
    return member
};


const remove = async (id) => {

    const member = await findSingle(id);

    if (!member) {
        throw notFound('Resources Not Found')
    }

    try {
        return Member.findByIdAndDelete(id)

    } catch (error) {
        throw serverError()
    }
};

const changePassword = async (id, email, currentPassword, newPassword) => {

    const members = await Member.find({ member_id: id })

    if (!members) {
        throw notFound('Member not found')
    }
    const member = members[0]

    if (member.email !== email) {
        throw authenticationError()
    }
    const passwordMatch = await hashMatched(currentPassword, member.password)

    if (!passwordMatch) {
        throw notFound('Current password is incorrect')
    }

    const newPasswordHash = await generateHash(newPassword)
    member.password = newPasswordHash;
    await member.save()
    return member;
}

module.exports = {
    findAll,
    memberExist,
    anyMemberExist,
    findMemberByEmail,
    createMember,
    count,
    findSingle,
    update,
    remove,
    changePassword,

};