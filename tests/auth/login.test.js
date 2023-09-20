
const { findMemberByEmail } = require('../../src/lib/members/index')
const { hashMatched } = require('../../src/utilis/hashing')
const { login } = require('../../src/lib/auth/index')
const { badRequest } = require('../../src/utilis/error')
jest.mock('../../src/lib/members/index')
jest.mock('../../src/utilis/hashing')

describe('Login funtion ', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return a member if the member exist and password match ", async () => {

        const email = "mdaiman2016@gmail.com";
        const password = 'password';

        findMemberByEmail.mockResolvedValue({
            id: "abefono49830vnoer",
            name: "aymon",
            email: "mdaiman2016@gmail.com",
            role: "Member"
        })
        hashMatched.mockResolvedValue(true)

        const mockedMember = {
            id: "abefono49830vnoer",
            name: "aymon",
            email: "mdaiman2016@gmail.com",
            role: "Member"
        };
        const result = await login(email, password)
        expect(result).toEqual(mockedMember)

    })
    it("should return a error if the member not exist ", async () => {

        const email = "mdaiman201123@gmail.com";
        const password = 'password';

        findMemberByEmail.mockResolvedValue(null)
        hashMatched: jest.fn()

        try {
            await login(email, password);
        } catch (error) {
            expect(error).toEqual(badRequest('Invalid Credentials'));
        }

    })
    it("should return a error if the password not matched ", async () => {

        const email = "mdaiman201123@gmail.com";
        const password = 'password';

        findMemberByEmail.mockResolvedValue({
            id: "abefono49830vnoer",
            name: "aymon",
            email: "mdaiman2016@gmail.com",
            role: "Member"
        })
        hashMatched.mockResolvedValue(false)

        try {
            await login(email, password);
        } catch (error) {
            expect(error).toEqual(badRequest('Invalid Credentials'));
        }

    })
})