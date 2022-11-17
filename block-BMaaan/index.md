writeCode

Q1. Design database model using mongoose to replicate data structure of `STACK OVERFLOW` and add appropriate indexes to support the queries.

Stack Overflow consists of

- Users
- Questions
- Answers
- REPLY'S on Question/Answers
- Up/Down vote on Questions/Answers/Replies
- Tags on Questions
- Views on Questions
- Reputation for each user based on questions asked, answers given, upvotes

Design models for storing these data and associate them accordingly to fetch related data together.

Use indexes to support queries related to questions, tags etc..

Q2. Use aggregation framework to

- Get array of all the tags used in the questions

db.questions.aggregate([ { $unwind: '$tags' }, { $group: { _id: '$tags' } }])

- Get total questions count
  db.questions.aggregate([{$group: {_id:null, count: {$sum:1}}}])

- Total answers count overall and question specific as well

Total answers count:
db.answers.aggregate([{$group: {_id:null, count: {$sum:1}}}])

Question specific answer count:
db.questions.aggregate([{ $unwind: '$answers' },{$group: {_id:'$title', count: {$sum:1}}}])

- Count total reputation of a user
  db.users.aggregate([{$group: {_id:null, count: {$sum: '$reputation'}}}])

- total views on a particular day
  db.questions.aggregate([
  {$match: {createdAt: {$eq: ISODate("2022-03-09T11:16:38.000Z")}}},
  {$group: {
  _id: null,
  count: {$sum: '$views'}
  }}
  ]);

- Count total answer by a particular user
  db.users.aggregate([
  {$match: {username: 'sample'}},
  {$unwind: '$answers'},
  {$group: {
  _id: null,
  count: { $sum: 1}
  }}
  ])
