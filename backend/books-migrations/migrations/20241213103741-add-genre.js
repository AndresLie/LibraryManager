module.exports = {
  async up(db) {
    await db
      .collection("books")
      .updateMany(
        { genre: { $exists: false } },
        { $set: { genre: "unknown" } }
      );
  },
  async down(db) {
    await db.collection("books").updateMany({}, { $unset: { genre: "" } });
  },
};
