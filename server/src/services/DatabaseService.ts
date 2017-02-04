'use strict';

import {Cursor, Db, InsertOneWriteOpResult, MongoClient, ObjectID} from "mongodb";

const mongo = require('mongodb');
const mongoClient: MongoClient = mongo.MongoClient;

export default class DatabaseService {

    private static db: Db;

    private static getInstance(): Promise<Db> {
        if (!DatabaseService.db) {
            return DatabaseService.initClient();
        }
        return Promise.resolve(DatabaseService.db);
    }

    private static initClient(): Promise<Db> {
        return new Promise(function (resolve, reject) {
            mongoClient.connect('mongodb://db:27017/quiz_db', function (err: any, db: Db) {
                if (err) {
                    reject(err);
                }
                DatabaseService.db = db;
                resolve(DatabaseService.db);
            });
        });
    }

    static insert<T>(collection: string, entity: T): Promise<T> {
        return new Promise(function (resolve, reject) {
            DatabaseService.getInstance().then((db: Db) => {
                db.collection(collection).insertOne(entity, function (err: any, result: InsertOneWriteOpResult) {
                    if (err || !result || !result.ops || result.ops.length == 0) {
                        reject(err);
                    }
                    resolve(result.ops[0]);
                });
            }).catch((err: any) => reject(err));
        });
    }

    static find(collection: string, searchFields: any): Promise<any[]> {
        return new Promise(function (resolve, reject) {
            DatabaseService.getInstance().then((db: Db) => {
                let result: any[] = [];
                let cursor: Cursor = db.collection(collection).find(searchFields);
                cursor.forEach((doc: any) => result.push(doc), () => resolve(result));
            })
        });
    }

    static findByObjectId(collection: string, id: string): Promise<any[]> {
        let objectId: ObjectID = new mongo.ObjectID(id);
        return DatabaseService.find(collection, {_id: objectId});
    }

}