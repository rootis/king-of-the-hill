export default class Constants {

    static SERVER_PORT: number = 8000;
    static PUBLIC_DIR: string = '../public';
    static REST_API_URL_PREFIX: string = '/api';

    static MONGODB_URL = 'mongodb://db:27017/quiz_db';
    static QUIZ_COLLECTION: string = 'quiz';
    static PARTICIPANT_COLLECTION: string = 'quiz_participant';

    static VALIDATION_ERRORS_PROPERTY: string = 'validationErrors';

}
