const db = {
  collection: () => new Error('Connection to the database is not established')
};

export default db;
