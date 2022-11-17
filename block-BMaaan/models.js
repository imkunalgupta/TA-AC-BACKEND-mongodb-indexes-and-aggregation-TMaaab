let userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, minlength: 5, maxlength: 20 },
    reputation: { type: Number, default: 0 },
    questions: { type: [Schema.Types.ObjectId], ref: 'Question' },
    answers: { type: [Schema.Types.ObjectId], ref: 'Answer' },
  },
  {
    timestamps: true,
  }
);

let questionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    askedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    tags: [String],
    views: { type: Number, default: 0 },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },
    answers: { type: [Schema.Types.ObjectId], ref: 'Answer' },
  },
  {
    timestamps: true,
  }
);

let answerSchema = new Schema(
  {
    content: { type: String, required: true },
    answeredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questionAnswered: { type: Schema.Types.ObjectId, ref: 'Question' },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

let commentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    commentedTo: String,
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

questionSchema.index({ title: 'text' });
questionSchema.index({ tags: 1 });
