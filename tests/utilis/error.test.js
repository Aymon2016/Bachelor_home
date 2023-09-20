
const { badRequest, resourceConflict, serverError, authorizationError, authenticationError } = require('../../src/utilis/error');

describe('badRequest', () => {
    it('should create a 400 Bad Request error with a default message', () => {
        const error = badRequest();

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(400);
        expect(error.message).toBe('Bad Request');
    })
    it('should create a 400 Bad Request error with a custom message', () => {
        const customMessage = 'Custom Bad Request Message';
        const error = badRequest(customMessage);

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(400);
        expect(error.message).toBe(customMessage);
    });

})

describe('resourceConflic', () => {
    it('should create 409 resource conflict erro with default message', () => {
        const error = resourceConflict();

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(429);
        expect(error.message).toBe('Resource Conflict');
    })
    it('should create a 429 resources conflict error with a custom message', () => {
        const customMessage = 'Resource conflict bcs already exists';
        const error = resourceConflict(customMessage);

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(429);
        expect(error.message).toBe(customMessage);
    });
})
describe('serverError', () => {
    it('should create 500 serverErrort erro with default message', () => {
        const error = serverError();

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(500);
        expect(error.message).toBe('Internal Server Error');
    })
    it('should create a 500 serverErrort error with a custom message', () => {
        const customMessage = 'Internal Server Erro';
        const error = serverError(customMessage);

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(500);
        expect(error.message).toBe(customMessage);
    });
})
describe('authorizationError', () => {
    it('should create 403 authorizationError with default message', () => {
        const error = authorizationError();

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(403);
        expect(error.message).toBe('Permission Denied');
    })
    it('should create a 403 authorizationError with a custom message', () => {
        const customMessage = 'Internal Server Error';
        const error = authorizationError(customMessage);

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(403);
        expect(error.message).toBe(customMessage);
    });
})


describe('authenticationError', () => {
    it('should create 401 authenticationError with default message', () => {
        const error = authenticationError();

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(401);
        expect(error.message).toBe('Authentication Failed');
    })
    it('should create a 401 authenticationError with a custom message', () => {
        const customMessage = 'Authentication Failed boss';
        const error = authenticationError(customMessage);

        expect(error instanceof Error).toBe(true);
        expect(error.status).toBe(401);
        expect(error.message).toBe(customMessage);
    });
})