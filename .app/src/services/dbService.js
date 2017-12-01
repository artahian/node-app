import mongodb from 'mongodb';

import db from '../db';

class DbService {

  connect(url) {
    return mongodb.MongoClient.connect(url).then((mainDb) => {
      db.collection = (...args) => mainDb.db('meteor').collection(...args);
    });
  }

}

export default new DbService();
