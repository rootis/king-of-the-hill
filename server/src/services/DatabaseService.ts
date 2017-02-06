'use strict';

import {Cursor, Db, FindAndModifyWriteOpResultObject, InsertOneWriteOpResult, MongoClient, ObjectID} from "mongodb";
import {AbstractEntity} from "../model/entities/AbstractEntity";
import Constants from "../common/Constants";

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
        return new Promise(function (resolve: (value: Db) => void, reject: (value: any) => void) {
            mongoClient.connect(Constants.MONGODB_URL, function (err: any, db: Db) {
                if (err) {
                    reject(err);
                }
                DatabaseService.db = db;
                resolve(DatabaseService.db);
            });
        });
    }

    static insert<T>(collection: string, entity: T): Promise<T> {
        return new Promise(function (resolve: (value: T) => void, reject: (value: any) => void) {
            DatabaseService.getInstance().then((db: Db) => {
                db.collection(collection).insertOne(entity, {w: 1}, function (err: any, result: InsertOneWriteOpResult) {
                    if (err || !result || !result.ops || result.ops.length == 0) {
                        reject(err);
                    }
                    resolve(result.ops[0]);
                });
            }).catch((err: any) => reject(err));
        });
    }

    static updateById(collection: string, entity: AbstractEntity): Promise<AbstractEntity> {
        return new Promise(function (resolve: (value: AbstractEntity) => void, reject: (value: any) => void) {
            DatabaseService.getInstance().then((db: Db) => {
                let searchBy: any = {_id: new mongo.ObjectID(entity._id)};
                delete entity._id;
                db.collection(collection).findOneAndUpdate(searchBy, {$set: entity}, function (err: any, result: FindAndModifyWriteOpResultObject) {
                    if (result && result.value) {
                        entity._id = result.value._id;
                        resolve(entity);
                    } else {
                        console.log('Update error: ', err);
                        reject({'error': 'unable to update'});
                    }
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
            }).catch((err) => reject(err));
        });
    }

    static findByObjectId(collection: string, id: string): Promise<any[]> {
        let objectId: ObjectID = new mongo.ObjectID(id);

        return DatabaseService.find(collection, {_id: objectId});
    }

}